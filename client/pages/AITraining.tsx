import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Brain,
  Zap,
  Database,
  MessageSquare,
  Settings,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Users,
  Bot,
  Mic,
  Eye,
  FileText,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Crown,
  Sparkles,
} from "lucide-react";

interface TrainingSession {
  id: string;
  name: string;
  type: "crm_logic" | "conversation" | "voice_recognition" | "visual_analysis";
  status: "training" | "completed" | "paused" | "failed";
  progress: number;
  model: "gpt-4" | "azure-cognitive" | "custom";
  startTime: string;
  duration: number;
  accuracy: number;
  examples: number;
}

interface AIModel {
  id: string;
  name: string;
  type: string;
  status: "active" | "training" | "updating";
  accuracy: number;
  version: string;
  lastTrained: string;
  examples: number;
  capabilities: string[];
}

export default function AITraining() {
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    {
      id: "1",
      name: "SaintSal CRM Intelligence",
      type: "crm_logic",
      status: "training",
      progress: 78,
      model: "gpt-4",
      startTime: "2024-01-15T10:30:00Z",
      duration: 45,
      accuracy: 94.2,
      examples: 2847,
    },
    {
      id: "2",
      name: "Voice Recognition Training",
      type: "voice_recognition",
      status: "completed",
      progress: 100,
      model: "azure-cognitive",
      startTime: "2024-01-15T09:00:00Z",
      duration: 120,
      accuracy: 97.8,
      examples: 5120,
    },
    {
      id: "3",
      name: "Lead Intent Analysis",
      type: "conversation",
      status: "training",
      progress: 34,
      model: "gpt-4",
      startTime: "2024-01-15T11:15:00Z",
      duration: 30,
      accuracy: 89.1,
      examples: 1456,
    },
  ]);

  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: "saintal-v4",
      name: "SaintSal AI Assistant",
      type: "Conversational AI",
      status: "active",
      accuracy: 96.4,
      version: "4.2.1",
      lastTrained: "2024-01-14T18:30:00Z",
      examples: 12500,
      capabilities: [
        "CRM Management",
        "Lead Qualification",
        "Appointment Booking",
        "Pipeline Updates",
        "Client Communication",
      ],
    },
    {
      id: "supersal-crm",
      name: "Supersal™ CRM Logic",
      type: "Business Intelligence",
      status: "training",
      accuracy: 93.7,
      version: "2.1.0",
      lastTrained: "2024-01-15T10:30:00Z",
      examples: 8900,
      capabilities: [
        "Deal Scoring",
        "Escalation Logic",
        "Workflow Triggers",
        "Data Analysis",
        "Predictive Insights",
      ],
    },
    {
      id: "voice-azure",
      name: "Azure Voice Recognition",
      type: "Speech-to-Text",
      status: "active",
      accuracy: 98.2,
      version: "3.0.5",
      lastTrained: "2024-01-15T09:00:00Z",
      examples: 15600,
      capabilities: [
        "Multi-language Support",
        "Real-time Transcription",
        "Intent Recognition",
        "Emotion Detection",
        "Noise Reduction",
      ],
    },
  ]);

  const [newTrainingData, setNewTrainingData] = useState({
    type: "crm_logic",
    name: "",
    model: "gpt-4",
    examples: "",
  });
  const [isTraining, setIsTraining] = useState(false);

  const handleStartTraining = async () => {
    if (!newTrainingData.name || !newTrainingData.examples) {
      alert("Please fill in all required fields");
      return;
    }

    setIsTraining(true);

    try {
      const response = await fetch("/api/ai-training/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newTrainingData,
          startTime: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Training started:", result);

        // Add new session to list
        const newSession: TrainingSession = {
          id: Date.now().toString(),
          name: newTrainingData.name,
          type: newTrainingData.type as any,
          status: "training",
          progress: 0,
          model: newTrainingData.model as any,
          startTime: new Date().toISOString(),
          duration: 0,
          accuracy: 0,
          examples: parseInt(newTrainingData.examples),
        };

        setTrainingSessions(prev => [newSession, ...prev]);

        // Reset form
        setNewTrainingData({
          type: "crm_logic",
          name: "",
          model: "gpt-4",
          examples: "",
        });
      }
    } catch (error) {
      console.error("Training start error:", error);
      alert("Failed to start training");
    } finally {
      setIsTraining(false);
    }
  };

  const handlePauseTraining = (sessionId: string) => {
    setTrainingSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, status: "paused" as const }
          : session,
      ),
    );
  };

  const handleResumeTraining = (sessionId: string) => {
    setTrainingSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, status: "training" as const }
          : session,
      ),
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "training":
        return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "crm_logic":
        return <Database className="w-5 h-5 text-purple-400" />;
      case "conversation":
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case "voice_recognition":
        return <Mic className="w-5 h-5 text-green-400" />;
      case "visual_analysis":
        return <Eye className="w-5 h-5 text-orange-400" />;
      default:
        return <Brain className="w-5 h-5 text-gray-400" />;
    }
  };

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainingSessions(prev =>
        prev.map(session => {
          if (session.status === "training" && session.progress < 100) {
            const increment = Math.random() * 2;
            const newProgress = Math.min(session.progress + increment, 100);
            return {
              ...session,
              progress: newProgress,
              duration: session.duration + 1,
              accuracy: session.accuracy + Math.random() * 0.1,
              status:
                newProgress >= 100 ? ("completed" as const) : session.status,
            };
          }
          return session;
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold saintvision-gradient-text mb-2">
                AI Training Hub
              </h1>
              <p className="text-white/70">
                Train and manage your AI assistants with OpenAI and Azure
                Cognitive Services
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                OpenAI Connected
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Azure Connected
              </Badge>
            </div>
          </div>
        </div>

        {/* Training Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-morphism p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-300" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Active
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {aiModels.filter(m => m.status === "active").length}
            </h3>
            <p className="text-white/60 text-sm">Active Models</p>
          </div>

          <div className="glass-morphism p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-300" />
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                +2.4%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">96.4%</h3>
            <p className="text-white/60 text-sm">Avg Accuracy</p>
          </div>

          <div className="glass-morphism p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-300" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                +15%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">37K</h3>
            <p className="text-white/60 text-sm">Training Examples</p>
          </div>

          <div className="glass-morphism p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-gold-300" />
              </div>
              <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30">
                Running
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {trainingSessions.filter(s => s.status === "training").length}
            </h3>
            <p className="text-white/60 text-sm">Active Sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Training Session */}
          <div className="lg:col-span-1">
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-gold-300" />
                Start New Training
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Training Name *
                  </label>
                  <Input
                    value={newTrainingData.name}
                    onChange={e =>
                      setNewTrainingData({
                        ...newTrainingData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Lead Qualification AI"
                    className="bg-white/5 border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Training Type
                  </label>
                  <select
                    value={newTrainingData.type}
                    onChange={e =>
                      setNewTrainingData({
                        ...newTrainingData,
                        type: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white"
                  >
                    <option value="crm_logic">CRM Logic & Automation</option>
                    <option value="conversation">Conversation Training</option>
                    <option value="voice_recognition">Voice Recognition</option>
                    <option value="visual_analysis">Visual Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    AI Model
                  </label>
                  <select
                    value={newTrainingData.model}
                    onChange={e =>
                      setNewTrainingData({
                        ...newTrainingData,
                        model: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white"
                  >
                    <option value="gpt-4">OpenAI GPT-4</option>
                    <option value="azure-cognitive">
                      Azure Cognitive Services
                    </option>
                    <option value="custom">Custom Model</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Training Examples Count
                  </label>
                  <Input
                    type="number"
                    value={newTrainingData.examples}
                    onChange={e =>
                      setNewTrainingData({
                        ...newTrainingData,
                        examples: e.target.value,
                      })
                    }
                    placeholder="1000"
                    className="bg-white/5 border-white/20"
                  />
                </div>

                <Button
                  onClick={handleStartTraining}
                  disabled={isTraining}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isTraining ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Starting Training...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Training
                    </>
                  )}
                </Button>
              </div>

              {/* OpenAI/Azure Status */}
              <div className="mt-6 space-y-3">
                <Alert className="border-green-500/30 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <AlertDescription className="text-green-200">
                    <strong>OpenAI GPT-4:</strong> Ready for training with 8K
                    context window
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-500/30 bg-blue-500/10">
                  <CheckCircle className="h-4 w-4 text-blue-300" />
                  <AlertDescription className="text-blue-200">
                    <strong>Azure Cognitive:</strong> Speech & Language services
                    active
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          {/* Active Training Sessions */}
          <div className="lg:col-span-2">
            <div className="glass-morphism rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-300" />
                Active Training Sessions
              </h2>

              <div className="space-y-4">
                {trainingSessions.map(session => (
                  <div
                    key={session.id}
                    className="glass-morphism p-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(session.type)}
                        <div>
                          <h3 className="font-semibold">{session.name}</h3>
                          <p className="text-sm text-white/60">
                            {session.model.toUpperCase()} • {session.examples}{" "}
                            examples
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(session.status)}
                        <Badge
                          className={
                            session.status === "completed"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : session.status === "training"
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-white/60 mb-1">
                        <span>Progress</span>
                        <span>{session.progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${session.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-white/50">Duration</div>
                        <div className="font-medium">
                          {Math.floor(session.duration / 60)}:
                          {(session.duration % 60).toString().padStart(2, "0")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/50">Accuracy</div>
                        <div className="font-medium text-green-300">
                          {session.accuracy.toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/50">Actions</div>
                        <div className="flex justify-center space-x-1">
                          {session.status === "training" ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handlePauseTraining(session.id)}
                              className="h-6 px-2"
                            >
                              <Pause className="w-3 h-3" />
                            </Button>
                          ) : session.status === "paused" ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleResumeTraining(session.id)}
                              className="h-6 px-2"
                            >
                              <Play className="w-3 h-3" />
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Models Status */}
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-purple-300" />
                AI Models Status
              </h2>

              <div className="space-y-4">
                {aiModels.map(model => (
                  <div
                    key={model.id}
                    className="glass-morphism p-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {model.name}
                          {model.id === "saintal-v4" && (
                            <Crown className="w-4 h-4 ml-2 text-gold-300" />
                          )}
                        </h3>
                        <p className="text-sm text-white/60">
                          {model.type} • v{model.version}
                        </p>
                      </div>
                      <Badge
                        className={
                          model.status === "active"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div className="text-center">
                        <div className="text-white/50">Accuracy</div>
                        <div className="font-medium text-green-300">
                          {model.accuracy}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/50">Examples</div>
                        <div className="font-medium">
                          {model.examples.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/50">Last Trained</div>
                        <div className="font-medium">
                          {new Date(model.lastTrained).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((capability, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-white/10 text-white/70"
                        >
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
