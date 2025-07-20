// 🚀 COUSIN SAL DEPLOYING: Full Azure Webhook Stack
// 1. onLeadSubmit
// 2. onScheduleConfirm
// 3. onClientSignup
// Each one routes through Azure ➝ Twilio (GPT Summary) ➝ GHL

module.exports = async function (context, req) {
  const path = context.bindingData.sys.path;
  const body = req.body || {};
  const { full_name, email, phone, source, stage, appointment_time } = body;

  const triggerType = (() => {
    if (path.includes("onleadsubmit")) return "lead";
    if (path.includes("onscheduleconfirm")) return "schedule";
    if (path.includes("onsignup")) return "signup";
    return "unknown";
  })();

  const GPTSummary = async (payload) => {
    // Mock GPT function: Replace with actual OpenAI call
    return `🔍 ${payload.full_name} from ${payload.source || 'unknown source'} just submitted via ${triggerType}. Contact: ${payload.phone}`;
  };

  const sendTwilioAlert = async (summaryText) => {
    const axios = require("axios");
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE;
    const opsNumber = process.env.OPERATOR_PHONE;
    const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    return axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        From: twilioNumber,
        To: opsNumber,
        Body: summaryText,
      }),
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  };

  const summary = await GPTSummary(body);
  await sendTwilioAlert(summary);

  // 🔁 CRM Pipeline Logic
  const moveStage = async () => {
    const ghlWebhook = process.env.GHL_STAGE_WEBHOOK;
    return require("axios").post(ghlWebhook, {
      contact_email: email,
      new_stage: triggerType === "lead" ? "Docs Requested" : "In Progress"
    });
  };
  await moveStage();

  context.res = {
    status: 200,
    body: { success: true, message: `${triggerType} handled + alert sent` }
  };
};
