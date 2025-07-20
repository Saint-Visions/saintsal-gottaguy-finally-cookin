const { exec } = require("child_process");
const fs = require("fs");

// Azure deployment script for SaintVisionAI
console.log("🚀 Deploying SaintVisionAI to Azure App Service...");

// Build the application
exec("npm run build:client", (error, stdout, stderr) => {
  if (error) {
    console.error("❌ Build failed:", error);
    return;
  }

  console.log("✅ Build successful!");
  console.log(stdout);

  // Create web.config for Azure App Service
  const webConfig = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>`;

  fs.writeFileSync("dist/spa/web.config", webConfig);
  console.log("✅ Created web.config for Azure");

  console.log(`
🎯 Ready for Azure deployment!

Your available Azure App Services:
• saintsal-live (Production ready)
• saintvisionai-production (Main production)
• saintsal-final-1752081494 (Latest)

Deploy options:
1. Azure CLI: az webapp deployment source config-zip
2. GitHub Actions (recommended)
3. VS Code Azure extension
4. Azure portal upload

Files ready in: dist/spa/
`);
});
