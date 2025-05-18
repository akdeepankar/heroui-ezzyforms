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
    <div className="w-full">
      {/* Banner */}
      <div
        className="relative w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white flex items-center justify-between h-28 mt-2 mb-2 shadow-xl border border-white/20 backdrop-blur-md bg-opacity-80"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-4 pl-8">
          <Icon
            className="opacity-90 animate-spin-slow"
            icon="solar:cpu-bolt-bold-duotone"
            width={40}
          />
          <div>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight font-sans">
              AI-Powered Interfaces
            </h1>
            <p className="text-sm opacity-90 font-medium">
              Supercharge your forms with chatbots, recommendations, and smart
              generators.
            </p>
          </div>
        </div>
        <div className="pr-8 flex items-center gap-2 lg:hidden">
          <Tooltip content="Sidebar" placement="bottom">
            <Button
              isIconOnly
              className="text-white/80 hover:text-white"
              variant="light"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <Icon icon="solar:settings-bold" width={22} />
            </Button>
          </Tooltip>
        </div>
      </div>
      {/* Main content with right sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Main Tabs/Content */}
        <div className="flex-1 min-w-0">
          <Tabs
            className="mb-0 mt-0"
            selectedKey={selectedTab}
            variant="default"
            onSelectionChange={setSelectedTab}
          >
            <Tab
              key="chatbot"
              title={
                <span className="flex items-center gap-1">
                  <Icon
                    className="text-indigo-500"
                    icon="solar:chat-round-dots-bold"
                    width={16}
                  />
                  Chatbot
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90">
                <CardBody className="p-5">
                  <div className="mb-3 text-indigo-700 font-semibold text-base flex items-center gap-2">
                    <Icon icon="solar:chat-round-dots-bold" width={20} />
                    Welcome to your AI Chatbot! Ask anything about forms.
                  </div>
                  <hr className="mb-3 border-indigo-100" />
                  <div className="h-40 overflow-y-auto flex flex-col gap-1 mb-2">
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={
                          msg.from === "bot" ? "text-left" : "text-right"
                        }
                      >
                        <span
                          className={`inline-block px-3 py-1 rounded-xl text-sm ${msg.from === "bot" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {msg.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Ask the chatbot..."
                      size="sm"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    />
                    <Button
                      disabled={!chatInput.trim()}
                      size="sm"
                      onClick={handleChatSend}
                    >
                      Send
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="generator"
              title={
                <span className="flex items-center gap-1">
                  <Icon
                    className="text-blue-500"
                    icon="solar:magic-stick-bold"
                    width={16}
                  />
                  Question Generator
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90">
                <CardBody className="p-5 flex flex-col gap-4">
                  <div className="mb-2 text-blue-700 font-semibold text-base flex items-center gap-2">
                    <Icon icon="solar:magic-stick-bold" width={18} />
                    Instantly generate smart questions for your form.
                  </div>
                  <div className="flex gap-2 mb-2">
                    {["Feedback", "Event", "Survey"].map((ex, idx) => (
                      <Button
                        key={idx}
                        className="text-blue-600 bg-blue-50"
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
                    size="md"
                    value={genInput}
                    onChange={(e) => setGenInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  />
                  <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-700"># Questions</span>
                    <Slider
                      className="w-40"
                      maxValue={5}
                      minValue={1}
                      size="sm"
                      value={numQuestions}
                      onChange={setNumQuestions}
                    />
                    <span className="text-xs text-gray-500">
                      {numQuestions}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-700">Type</span>
                    <Select
                      className="w-32"
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
                  <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-700">Required</span>
                    <Switch
                      isSelected={required}
                      size="sm"
                      onValueChange={setRequired}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="w-full"
                      color="primary"
                      disabled={!genInput.trim()}
                      onClick={handleGenerate}
                    >
                      Generate
                    </Button>
                    <Button size="sm" variant="flat" onClick={handleRegenerate}>
                      Regenerate
                    </Button>
                  </div>
                  {genResult && (
                    <Card className="mt-2 bg-blue-50 border-0">
                      <CardBody>
                        <pre className="text-blue-800 text-sm whitespace-pre-wrap">
                          {genResult}
                        </pre>
                      </CardBody>
                    </Card>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="ideas"
              title={
                <span className="flex items-center gap-1">
                  <Icon
                    className="text-yellow-500"
                    icon="solar:bulb-bold"
                    width={16}
                  />
                  Ideas
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90">
                <CardBody className="p-5 flex flex-col gap-4">
                  <div className="mb-2 text-yellow-700 font-semibold text-base flex items-center gap-2">
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
                        className="text-yellow-700 bg-yellow-50"
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
                    size="md"
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
                <span className="flex items-center gap-1">
                  <Icon
                    className="text-blue-400"
                    icon="solar:users-group-rounded-bold-duotone"
                    width={16}
                  />
                  Audience Insights
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90">
                <CardBody className="p-5 flex flex-col gap-4">
                  <div className="mb-2 text-blue-700 font-semibold text-base flex items-center gap-2">
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
                        className="text-blue-600 bg-blue-50"
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
                    size="md"
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
                <span className="flex items-center gap-1">
                  <Icon
                    className="text-gray-500"
                    icon="solar:settings-bold"
                    width={16}
                  />
                  Settings
                </span>
              }
            >
              <Card className="shadow-sm border-0 bg-white/90">
                <CardBody className="p-5 flex flex-col gap-4">
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
          {/* Q&A Section */}
          <Card className="shadow-md border-0 mt-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-400">
            <CardBody>
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  className="text-indigo-500"
                  icon="solar:chat-round-dots-bold"
                  width={22}
                />
                <h2 className="text-lg font-bold font-sans tracking-tight text-indigo-800">
                  AI Q&A for Forms
                </h2>
              </div>
              <div className="flex flex-col gap-2 mb-2">
                {exampleQuestions.map((q, idx) => (
                  <Button
                    key={idx}
                    className="justify-start text-left"
                    size="sm"
                    variant="flat"
                    onClick={() => setInput(q)}
                  >
                    <Icon
                      className="mr-2 text-amber-400"
                      icon="solar:lightbulb-bold"
                      width={16}
                    />
                    {q}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 mb-2">
                <Input
                  className="flex-1"
                  placeholder="Ask something about your forms..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                />
                <Button
                  color="primary"
                  disabled={!input.trim()}
                  isLoading={loading}
                  onClick={handleAsk}
                >
                  Ask AI
                </Button>
              </div>
              {response && (
                <Textarea
                  readOnly
                  className="mt-2 bg-gray-50 text-gray-700 border-0 shadow-none"
                  minRows={3}
                  value={response}
                />
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantContent;
