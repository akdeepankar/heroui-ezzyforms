"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Tabs,
  Tab,
  Switch,
  Select,
  SelectItem,
  Slider,
  Tooltip,
  Badge,
  Divider,
  Progress,
  Avatar,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const exampleQuestions = [
  "What are some good questions for a customer feedback form?",
  "Suggest questions for an event registration form.",
  "Summarize the responses to my product survey.",
];

const chatbotDemoResponse = (input) => {
  if (!input.trim()) return "Hi! How can I help you with your forms today?";
  if (input.toLowerCase().includes("feedback"))
    return "You can add questions like: 'How satisfied are you?' or 'What can we improve?'";
  if (input.toLowerCase().includes("register"))
    return "For event registration, ask for name, email, and attendance preference.";

  return "I'm here to help with form building, templates, and analytics!";
};

const trendingTemplates = [
  {
    name: "Customer Feedback",
    icon: "solar:star-bold-duotone",
    color: "text-amber-500",
  },
  {
    name: "Event Registration",
    icon: "solar:calendar-bold-duotone",
    color: "text-indigo-500",
  },
  {
    name: "Product Survey",
    icon: "solar:box-bold-duotone",
    color: "text-green-500",
  },
];

const questionTypes = [
  { key: "short", label: "Short Answer" },
  { key: "mcq", label: "Multiple Choice" },
  { key: "rating", label: "Rating" },
];

const AIAssistantContent = () => {
  // Tabs state
  const [selectedTab, setSelectedTab] = useState("chatbot");
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [aiMode, setAiMode] = useState("helpful");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Chatbot demo state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "bot", text: chatbotDemoResponse("") },
  ]);
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: "user", text: chatInput };
    const botMsg = { from: "bot", text: chatbotDemoResponse(chatInput) };

    setChatHistory([...chatHistory, userMsg, botMsg]);
    setChatInput("");
  };

  // Recommendation demo
  const [recInput, setRecInput] = useState("");
  const [recResult, setRecResult] = useState("");
  const handleRecommend = () => {
    setRecResult(
      recInput.toLowerCase().includes("feedback")
        ? "Recommended: Customer Feedback Template"
        : recInput.toLowerCase().includes("event")
          ? "Recommended: Event Registration Template"
          : recInput.toLowerCase().includes("survey")
            ? "Recommended: Product Survey Template"
            : "Try describing your form need (e.g. 'feedback', 'event', 'survey').",
    );
  };
  // Fun trending template
  const trending =
    trendingTemplates[Math.floor(Math.random() * trendingTemplates.length)];
  const randomTip = [
    "Tip: Use required fields for must-have info!",
    "Did you know? You can embed forms anywhere.",
    "Pro: Use analytics to improve your forms!",
  ][Math.floor(Math.random() * 3)];

  // Smart question generator demo (advanced)
  const [genInput, setGenInput] = useState("");
  const [genResult, setGenResult] = useState("");
  const [numQuestions, setNumQuestions] = useState(3);
  const [questionType, setQuestionType] = useState("short");
  const [required, setRequired] = useState(true);
  const handleGenerate = () => {
    let base;

    if (genInput.toLowerCase().includes("feedback")) {
      base = [
        "How satisfied are you?",
        "What can we improve?",
        "Would you recommend us?",
        "How did you hear about us?",
        "Any additional comments?",
      ];
    } else if (genInput.toLowerCase().includes("event")) {
      base = [
        "What is your name?",
        "Will you attend?",
        "Dietary preferences?",
        "How did you hear about the event?",
        "Any accessibility needs?",
      ];
    } else if (genInput.toLowerCase().includes("survey")) {
      base = [
        "How often do you use our product?",
        "What features do you value most?",
        "How likely are you to recommend us?",
        "What can we do better?",
        "Any other feedback?",
      ];
    } else {
      base = ["Try entering a form type (e.g. 'feedback', 'event', 'survey')."];
    }
    const selected = base.slice(0, numQuestions).map((q, idx) => {
      let typeLabel =
        questionTypes.find((t) => t.key === questionType)?.label ||
        "Short Answer";

      return `${idx + 1}. ${q} [${typeLabel}${required ? ", Required" : ""}]`;
    });

    setGenResult(selected.join("\n"));
  };

  // Regenerate button for generator
  const handleRegenerate = () => {
    setGenResult("");
    setTimeout(handleGenerate, 200);
  };

  // AI Q&A
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAsk = () => {
    setLoading(true);
    setTimeout(() => {
      setResponse(
        input.toLowerCase().includes("feedback")
          ? "Here are some suggested questions: 1. How satisfied are you with our service? 2. What can we improve? 3. Would you recommend us?"
          : input.toLowerCase().includes("event")
            ? "Suggested event registration questions: 1. Name 2. Email 3. Will you attend? 4. Dietary preferences?"
            : input.toLowerCase().includes("summarize")
              ? "Summary: Most users are satisfied with the product, but some requested more integrations."
              : "AI suggestion: Please enter a form-related question.",
      );
      setLoading(false);
    }, 1200);
  };

  // New state for temperature and max tokens
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(256);
  const handleResetSettings = () => {
    setDarkMode(false);
    setAiMode("helpful");
    setTemperature(0.7);
    setMaxTokens(256);
  };
  const [preset, setPreset] = useState(null);
  const presets = [
    { name: "Default", aiMode: "helpful", temperature: 0.7, maxTokens: 256 },
    { name: "Creative", aiMode: "creative", temperature: 0.95, maxTokens: 512 },
    { name: "Concise", aiMode: "concise", temperature: 0.4, maxTokens: 128 },
  ];
  const handleLoadPreset = (p) => {
    setAiMode(p.aiMode);
    setTemperature(p.temperature);
    setMaxTokens(p.maxTokens);
    setPreset(p.name);
  };

  // New state for ideas and audience insights
  const [ideasInput, setIdeasInput] = useState("");
  const [ideas, setIdeas] = useState([]);
  const handleGenerateIdeas = () => {
    setIdeas([
      `Add a progress bar for multi-step forms`,
      `Use conditional logic to show relevant questions`,
      `Auto-save responses for long forms`,
      `Personalize questions based on user data`,
      `Offer incentives for completion`,
    ]);
  };
  const [audienceInput, setAudienceInput] = useState("");
  const [audienceInsights, setAudienceInsights] = useState("");
  const handleAudienceInsights = () => {
    setAudienceInsights(
      audienceInput.toLowerCase().includes("feedback")
        ? "Audience: 60% are repeat customers, 30% mention speed, 10% want more features."
        : audienceInput.toLowerCase().includes("event")
          ? "Audience: 70% first-time attendees, 20% request networking, 10% need accessibility."
          : audienceInput.toLowerCase().includes("survey")
            ? "Audience: 50% are power users, 40% are new, 10% are at risk of churn."
            : "Enter a form type for insights (e.g. feedback, event, survey).",
    );
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col relative bg-gradient-to-br from-gray-50 to-white">
      {/* Modern Banner with Glass Effect */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-6 shadow-2xl border border-white/20 backdrop-blur-xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm ring-1 ring-white/20">
          <Icon
                className="opacity-90 animate-pulse"
            icon="solar:cpu-bolt-bold-duotone"
                width={32}
          />
            </div>
          <div>
              <h1 className="text-xl font-extrabold leading-tight tracking-tight font-sans">
                AI-Powered Assistant
            </h1>
              <p className="text-xs opacity-90 font-medium mt-0.5">
                Supercharge your forms with intelligent features
            </p>
          </div>
        </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                <div className="text-lg font-bold">98%</div>
                <div className="text-xs opacity-80">Accuracy</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                <div className="text-lg font-bold">24/7</div>
                <div className="text-xs opacity-80">Available</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                <div className="text-lg font-bold">1.2s</div>
                <div className="text-xs opacity-80">Response</div>
              </div>
            </div>
            <Chip
              color="success"
              variant="flat"
              className="px-2 py-0.5 bg-white"
              startContent={<Icon icon="solar:check-circle-bold" className="mr-1" width={14} />}
            >
              AI Ready
            </Chip>
          </div>
        </div>
      </div>

      {/* Modern Quick Actions Bar */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {[
          { icon: "solar:chat-round-dots-bold", label: "Chat", color: "indigo", gradient: "from-indigo-500 to-blue-500" },
          { icon: "solar:magic-stick-bold", label: "Generate", color: "blue", gradient: "from-blue-500 to-cyan-500" },
          { icon: "solar:lightbulb-bold", label: "Ideas", color: "amber", gradient: "from-amber-500 to-orange-500" },
          { icon: "solar:users-group-rounded-bold", label: "Insights", color: "purple", gradient: "from-purple-500 to-pink-500" },
        ].map((action, idx) => (
          <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-lg`}>
                  <Icon icon={action.icon} width={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{action.label}</h3>
                  <p className="text-xs text-gray-500">Quick access</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main content with right sidebar */}
      <div className="flex flex-1 gap-4 mt-4 min-h-0">
        {/* Main Tabs/Content */}
        <div className="flex-1 min-w-0">
          <Tabs
            className="mb-0 mt-0"
            selectedKey={selectedTab}
            variant="underlined"
            onSelectionChange={setSelectedTab}
          >
            <Tab
              key="chatbot"
              title={
                <span className="flex items-center gap-2">
                  <Icon
                    className="text-indigo-500"
                    icon="solar:chat-round-dots-bold"
                    width={16}
                  />
                  Chatbot
                </span>
              }
            >
              <Card className="shadow-xl border-0 bg-white/90 h-full relative rounded-2xl">
                <CardBody className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar
                        icon={<Icon icon="solar:chat-round-dots-bold" className="text-indigo-500" width={18} />}
                        className="bg-indigo-50"
                      />
                      <h3 className="text-indigo-700 font-semibold text-sm">AI Chat Assistant</h3>
                    </div>
                    <Chip
                      color="primary"
                      variant="flat"
                      size="sm"
                      startContent={<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                    >
                      Online
                    </Chip>
                  </div>
                  <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-3 p-4 bg-gray-50/50 rounded-2xl min-h-[300px]">
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm transition-all duration-200 ${
                            msg.from === "bot"
                              ? "bg-white text-gray-700 shadow-md border border-gray-100 hover:shadow-lg"
                              : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
                {/* Modern Floating Input Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
                  <div className="flex gap-2 bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
                    <Input
                      className="flex-1 border-0 shadow-none"
                      placeholder="Ask the chatbot..."
                      size="sm"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                      startContent={
                        <Icon icon="solar:chat-round-dots-bold" className="text-gray-400" width={18} />
                      }
                    />
                    <Button
                      disabled={!chatInput.trim()}
                      size="sm"
                      color="primary"
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500"
                      onClick={handleChatSend}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            </Tab>

            <Tab
              key="generator"
              title={
                <span className="flex items-center gap-2">
                  <Icon
                    className="text-blue-500"
                    icon="solar:magic-stick-bold"
                    width={16}
                  />
                  Question Generator
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90 h-full">
                <CardBody className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:magic-stick-bold" className="text-blue-500" width={18} />
                      <h3 className="text-blue-700 font-semibold text-sm">Smart Question Generator</h3>
                    </div>
                    <Badge color="success" variant="flat" size="sm">Ready</Badge>
                  </div>
                  <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex gap-2">
                    {["Feedback", "Event", "Survey"].map((ex, idx) => (
                      <Button
                        key={idx}
                          className="text-blue-600 bg-blue-50 hover:bg-blue-100"
                        size="sm"
                        variant="flat"
                        onClick={() => setGenInput(ex)}
                      >
                        {ex}
                      </Button>
                    ))}
                  </div>
                  <Input
                    className="w-full"
                    placeholder="Enter form type (e.g. feedback, event, survey)"
                      size="sm"
                    value={genInput}
                    onChange={(e) => setGenInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  />
                    <Card className="bg-gray-50 border-0">
                      <CardBody className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Number of Questions</span>
                            <Badge color="primary" variant="flat">{numQuestions}</Badge>
                          </div>
                    <Slider
                            className="w-full"
                      maxValue={5}
                      minValue={1}
                      size="sm"
                      value={numQuestions}
                      onChange={setNumQuestions}
                    />
                          <Divider />
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Question Type</span>
                    <Select
                              className="w-40"
                      selectedKeys={[questionType]}
                      size="sm"
                      onSelectionChange={(keys) =>
                        setQuestionType(Array.from(keys)[0])
                      }
                    >
                      {questionTypes.map((t) => (
                        <SelectItem key={t.key}>{t.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                          <Divider />
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Required Fields</span>
                    <Switch
                      isSelected={required}
                      size="sm"
                      onValueChange={setRequired}
                    />
                  </div>
                        </div>
                      </CardBody>
                    </Card>
                  <div className="flex gap-2">
                    <Button
                        className="flex-1"
                      color="primary"
                        size="sm"
                      disabled={!genInput.trim()}
                      onClick={handleGenerate}
                    >
                        Generate Questions
                    </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onClick={handleRegenerate}
                      >
                        <Icon icon="solar:refresh-circle-bold" width={18} />
                    </Button>
                    </div>
                  </div>
                  {genResult && (
                    <Card className="bg-blue-50 border-0">
                      <CardBody className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon icon="solar:document-text-bold" className="text-blue-600" width={18} />
                          <h3 className="font-medium text-blue-800">Generated Questions</h3>
                        </div>
                        <div className="bg-white/50 p-4 rounded-lg">
                        <pre className="text-blue-800 text-sm whitespace-pre-wrap">
                          {genResult}
                        </pre>
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </CardBody>
              </Card>
            </Tab>

            <Tab
              key="ideas"
              title={
                <span className="flex items-center gap-2">
                  <Icon
                    className="text-yellow-500"
                    icon="solar:bulb-bold"
                    width={16}
                  />
                  Ideas
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90 h-full">
                <CardBody className="p-4 flex flex-col h-full">
                  <div className="mb-4 text-yellow-700 font-semibold text-base flex items-center gap-2">
                    <Icon icon="solar:bulb-bold" width={18} />
                    Get creative ideas for your forms and user experience.
                  </div>
                  <div className="flex gap-2 mb-2">
                    {[
                      "Progress Bar",
                      "Conditional Logic",
                      "Personalization",
                    ].map((ex, idx) => (
                      <Button
                        key={idx}
                        className="text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                        size="sm"
                        variant="flat"
                        onClick={() => setIdeasInput(ex)}
                      >
                        {ex}
                      </Button>
                    ))}
                  </div>
                  <Input
                    className="w-full"
                    placeholder="Describe your form or goal (e.g. feedback, registration)"
                    size="sm"
                    value={ideasInput}
                    onChange={(e) => setIdeasInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleGenerateIdeas()
                    }
                  />
                  <Button
                    className="w-full"
                    color="primary"
                    disabled={!ideasInput.trim()}
                    onClick={handleGenerateIdeas}
                  >
                    Get Ideas
                  </Button>
                  {ideas.length > 0 && (
                    <Card className="mt-2 bg-yellow-50 border-0">
                      <CardBody>
                        <ul className="space-y-2 text-yellow-800 text-sm">
                          {ideas.map((idea, idx) => (
                            <li key={idx} className="rounded-lg px-3 py-2">
                              {idea}
                            </li>
                          ))}
                        </ul>
                      </CardBody>
                    </Card>
                  )}
                </CardBody>
              </Card>
            </Tab>

            <Tab
              key="audience"
              title={
                <span className="flex items-center gap-2">
                  <Icon
                    className="text-blue-400"
                    icon="solar:users-group-rounded-bold-duotone"
                    width={16}
                  />
                  Audience Insights
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90 h-full">
                <CardBody className="p-4 flex flex-col h-full">
                  <div className="mb-4 text-blue-700 font-semibold text-base flex items-center gap-2">
                    <Icon
                      icon="solar:users-group-rounded-bold-duotone"
                      width={18}
                    />
                    Analyze your audience for better form targeting.
                  </div>
                  <div className="flex gap-2 mb-2">
                    {["Feedback", "Event", "Survey"].map((ex, idx) => (
                      <Button
                        key={idx}
                        className="text-blue-600 bg-blue-50 hover:bg-blue-100"
                        size="sm"
                        variant="flat"
                        onClick={() => setAudienceInput(ex)}
                      >
                        {ex}
                      </Button>
                    ))}
                  </div>
                  <Input
                    className="w-full"
                    placeholder="Enter form type (e.g. feedback, event, survey)"
                    size="sm"
                    value={audienceInput}
                    onChange={(e) => setAudienceInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleAudienceInsights()
                    }
                  />
                  <Button
                    className="w-full"
                    color="primary"
                    disabled={!audienceInput.trim()}
                    onClick={handleAudienceInsights}
                  >
                    Analyze Audience
                  </Button>
                  {audienceInsights && (
                    <Card className="mt-2 bg-blue-50 border-0">
                      <CardBody>
                        <div className="text-blue-800 text-sm whitespace-pre-wrap">
                          {audienceInsights}
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </CardBody>
              </Card>
            </Tab>

            <Tab
              key="settings"
              title={
                <span className="flex items-center gap-2">
                  <Icon
                    className="text-gray-500"
                    icon="solar:settings-bold"
                    width={16}
                  />
                  Settings
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90 h-full">
                <CardBody className="p-4 flex flex-col h-full">
                  <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Icon icon="solar:settings-bold" width={18} />
                    AI Assistant Settings
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark Mode</span>
                    <Switch isSelected={darkMode} onValueChange={setDarkMode} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Mode</span>
                    <Select
                      className="w-28"
                      selectedKeys={[aiMode]}
                      size="sm"
                      onSelectionChange={(keys) =>
                        setAiMode(Array.from(keys)[0])
                      }
                    >
                      <SelectItem key="helpful">Helpful</SelectItem>
                      <SelectItem key="creative">Creative</SelectItem>
                      <SelectItem key="concise">Concise</SelectItem>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temperature</span>
                    <Slider
                      className="w-40"
                      maxValue={1}
                      minValue={0}
                      size="sm"
                      step={0.01}
                      value={temperature}
                      onChange={setTemperature}
                    />
                    <span className="text-xs text-gray-500">{temperature}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Tokens</span>
                    <Input
                      className="w-24"
                      max={2048}
                      min={32}
                      size="sm"
                      type="number"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(Number(e.target.value))}
                    />
                  </div>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={handleResetSettings}
                  >
                    Reset to Default
                  </Button>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        {/* Modern Right Sidebar */}
        <div className="w-72 space-y-3">
          <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <CardBody className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">AI Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-gray-800 font-medium">1.2s</span>
                  </div>
                  <Progress 
                    value={80} 
                    color="success" 
                    size="sm" 
                    className="transition-all duration-300"
                    classNames={{
                      track: "bg-gray-100",
                      indicator: "bg-gradient-to-r from-green-500 to-emerald-500"
                    }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="text-gray-800 font-medium">98%</span>
                  </div>
                  <Progress 
                    value={98} 
                    color="primary" 
                    size="sm" 
                    className="transition-all duration-300"
                    classNames={{
                      track: "bg-gray-100",
                      indicator: "bg-gradient-to-r from-indigo-500 to-blue-500"
                    }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Uptime</span>
                    <span className="text-gray-800 font-medium">99.9%</span>
                  </div>
                  <Progress 
                    value={99.9} 
                    color="success" 
                    size="sm" 
                    className="transition-all duration-300"
                    classNames={{
                      track: "bg-gray-100",
                      indicator: "bg-gradient-to-r from-green-500 to-emerald-500"
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <CardBody className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {[
                  { icon: "solar:chat-round-dots-bold", text: "Generated 5 questions", time: "2m ago", color: "indigo" },
                  { icon: "solar:magic-stick-bold", text: "Created new form", time: "15m ago", color: "blue" },
                  { icon: "solar:lightbulb-bold", text: "Got 3 new ideas", time: "1h ago", color: "amber" },
                ].map((activity, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 text-white shadow-md group-hover:shadow-lg transition-all duration-200`}>
                      <Icon icon={activity.icon} width={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantContent;
