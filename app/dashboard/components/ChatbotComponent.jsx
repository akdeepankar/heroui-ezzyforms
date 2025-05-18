"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input, Switch, Divider, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hi there! I'm EzzyBot, your personal assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [chatbotSettings, setChatbotSettings] = useState({
    theme: "light",
    position: "bottom-right",
    showAvatar: true,
    responseSpeed: "normal",
    suggestionMode: "smart",
    voiceEnabled: false,
    notificationsEnabled: true,
    smartReplies: true,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const chatContainerRef = useRef(null);

  // Predefined suggestions
  const suggestions = {
    general: [
      "How do I create a new form?",
      "What templates are available?",
      "How do I share my form?",
      "Can I export responses?",
    ],
    technical: [
      "How do I add conditional logic?",
      "Can I connect my forms to other apps?",
      "How do I add file uploads?",
      "Is there an API available?",
    ],
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Listen for the custom event to open the chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
      setSelectedTopic("chat");
    };

    window.addEventListener("openChatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("openChatbot", handleOpenChatbot);
    };
  }, []);

  // Scroll handler for "scroll to latest" button
  useEffect(() => {
    const chatDiv = chatContainerRef.current;

    if (!chatDiv) return;
    const handleScroll = () => {
      setIsScrolledUp(
        chatDiv.scrollTop + chatDiv.clientHeight < chatDiv.scrollHeight - 40,
      );
    };

    chatDiv.addEventListener("scroll", handleScroll);

    return () => chatDiv.removeEventListener("scroll", handleScroll);
  }, [selectedTopic, settingsOpen]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    const responseTime =
      chatbotSettings.responseSpeed === "fast"
        ? 600
        : chatbotSettings.responseSpeed === "normal"
          ? 1200
          : 2000;

    setTimeout(() => {
      // Add bot response based on user input
      let botResponse;
      const userInput = inputValue.toLowerCase();

      if (userInput.includes("create form") || userInput.includes("new form")) {
        botResponse =
          "To create a new form, click on the 'Create New Form' button on the Forms tab, or use the 'Create Form' option in the Quick Actions menu.";
      } else if (userInput.includes("template")) {
        botResponse =
          "We have over 50 templates available in categories like surveys, feedback, registration, and more. You can browse them in the Templates section.";
      } else if (userInput.includes("share") || userInput.includes("publish")) {
        botResponse =
          "To share your form, open the form editor and click the 'Share' button in the top-right corner. You can share via link, QR code, or embed it on your website.";
      } else if (
        userInput.includes("export") ||
        userInput.includes("download")
      ) {
        botResponse =
          "You can export your form responses by going to the form's responses page and clicking the 'Export' button. We support CSV, Excel, and PDF formats.";
      } else {
        botResponse =
          "I'm not sure I understand. Could you rephrase your question or select from one of the suggestions below?";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botResponse },
      ]);
      setIsTyping(false);
    }, responseTime);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Simulate user clicking send after selecting
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setSelectedTopic(null); // Reset selected topic when opening
    }
  };

  // Update a specific setting
  const updateSetting = (key, value) => {
    setChatbotSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Determine the position class based on settings
  const getPositionClass = () => {
    switch (chatbotSettings.position) {
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  };

  // Copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Regenerate last bot response
  const handleRegenerate = () => {
    if (!messages.length) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");

    if (lastUserMsg) {
      setInputValue(lastUserMsg.content);
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  // Contextual quick actions by topic
  const quickActions = {
    forms: [
      {
        label: "Create New Form",
        icon: "solar:pen-new-square-bold",
        onClick: () => (window.location.href = "/dashboard/create"),
      },
      {
        label: "View All Forms",
        icon: "solar:document-bold",
        onClick: () =>
          window.dispatchEvent(new CustomEvent("setTab", { detail: "forms" })),
      },
    ],
    templates: [
      {
        label: "Browse Templates",
        icon: "solar:template-bold",
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("setTab", { detail: "templates" }),
          ),
      },
      {
        label: "Create Template",
        icon: "solar:add-circle-bold",
        onClick: () => (window.location.href = "/dashboard/create"),
      },
    ],
    sharing: [
      {
        label: "Share a Form",
        icon: "solar:share-bold",
        onClick: () =>
          window.dispatchEvent(new CustomEvent("setTab", { detail: "forms" })),
      },
      { label: "Embed on Website", icon: "solar:code-bold", onClick: () => {} },
    ],
    analytics: [
      {
        label: "View Analytics",
        icon: "solar:chart-bold",
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("setTab", { detail: "analytics" }),
          ),
      },
      { label: "Export Data", icon: "solar:export-bold", onClick: () => {} },
    ],
    account: [
      {
        label: "Account Settings",
        icon: "solar:settings-bold",
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("setTab", { detail: "settings" }),
          ),
      },
      {
        label: "Logout",
        icon: "solar:logout-3-bold",
        onClick: () => (window.location.href = "/"),
      },
    ],
    chat: [],
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className={`fixed z-50 ${getPositionClass()} w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        }`}
        onClick={toggleChatbot}
      >
        <Icon
          className="text-white"
          icon={isOpen ? "solar:close-bold" : "solar:chat-round-dots-bold"}
          width={28}
        />
        {!isOpen && chatbotSettings.notificationsEnabled && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            1
          </span>
        )}
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div
          className={`fixed z-40 ${getPositionClass()} max-w-sm w-full sm:w-[400px] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform resize-y min-h-[400px] max-h-[90vh] flex flex-col bg-white dark:bg-gray-800`}
        >
          {/* Chatbot Header */}
          <div
            className={`p-4 ${
              chatbotSettings.theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {chatbotSettings.showAvatar && (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Icon
                      className="text-white"
                      icon="solar:robot-bold"
                      width={20}
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold">EzzyBot Assistant</h3>
                  <p className="text-xs opacity-80">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-1.5 rounded-full hover:bg-white/20"
                  onClick={() => setSettingsOpen((prev) => !prev)}
                >
                  <Icon
                    className="text-white"
                    icon="solar:settings-bold"
                    width={18}
                  />
                </button>
                <button
                  className="p-1.5 rounded-full hover:bg-white/20"
                  onClick={toggleChatbot}
                >
                  <Icon
                    className="text-white"
                    icon="solar:minus-bold"
                    width={18}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Chatbot Settings Panel (slides in from right) */}
          {settingsOpen && (
            <div
              className={`absolute inset-0 z-10 ${
                chatbotSettings.theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              } transition-transform duration-300`}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Chatbot Settings</h3>
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSettingsOpen(false)}
                  >
                    <Icon icon="solar:close-bold" width={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-auto max-h-[400px]">
                <div className="space-y-6">
                  {/* Theme Setting */}
                  <div>
                    <p className="font-medium mb-2">Theme</p>
                    <div className="flex space-x-2">
                      <Button
                        color={
                          chatbotSettings.theme === "light"
                            ? "primary"
                            : "default"
                        }
                        size="sm"
                        variant={
                          chatbotSettings.theme === "light"
                            ? "solid"
                            : "bordered"
                        }
                        onClick={() => updateSetting("theme", "light")}
                      >
                        Light
                      </Button>
                      <Button
                        color={
                          chatbotSettings.theme === "dark"
                            ? "primary"
                            : "default"
                        }
                        size="sm"
                        variant={
                          chatbotSettings.theme === "dark"
                            ? "solid"
                            : "bordered"
                        }
                        onClick={() => updateSetting("theme", "dark")}
                      >
                        Dark
                      </Button>
                    </div>
                  </div>

                  {/* Position Setting */}
                  <div>
                    <p className="font-medium mb-2">Position</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "bottom-right",
                        "bottom-left",
                        "top-right",
                        "top-left",
                      ].map((pos) => (
                        <Button
                          key={pos}
                          color={
                            chatbotSettings.position === pos
                              ? "primary"
                              : "default"
                          }
                          size="sm"
                          variant={
                            chatbotSettings.position === pos
                              ? "solid"
                              : "bordered"
                          }
                          onClick={() => updateSetting("position", pos)}
                        >
                          {pos
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Response Speed Setting */}
                  <div>
                    <p className="font-medium mb-2">Response Speed</p>
                    <div className="flex space-x-2">
                      {["fast", "normal", "realistic"].map((speed) => (
                        <Button
                          key={speed}
                          color={
                            chatbotSettings.responseSpeed === speed
                              ? "primary"
                              : "default"
                          }
                          size="sm"
                          variant={
                            chatbotSettings.responseSpeed === speed
                              ? "solid"
                              : "bordered"
                          }
                          onClick={() => updateSetting("responseSpeed", speed)}
                        >
                          {speed.charAt(0).toUpperCase() + speed.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Avatar</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Display bot avatar in header
                        </p>
                      </div>
                      <Switch
                        checked={chatbotSettings.showAvatar}
                        onChange={() =>
                          updateSetting(
                            "showAvatar",
                            !chatbotSettings.showAvatar,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Voice Mode</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Enable voice interactions
                        </p>
                      </div>
                      <Switch
                        checked={chatbotSettings.voiceEnabled}
                        onChange={() =>
                          updateSetting(
                            "voiceEnabled",
                            !chatbotSettings.voiceEnabled,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Show notification badge
                        </p>
                      </div>
                      <Switch
                        checked={chatbotSettings.notificationsEnabled}
                        onChange={() =>
                          updateSetting(
                            "notificationsEnabled",
                            !chatbotSettings.notificationsEnabled,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Smart Replies</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Show contextual suggestions
                        </p>
                      </div>
                      <Switch
                        checked={chatbotSettings.smartReplies}
                        onChange={() =>
                          updateSetting(
                            "smartReplies",
                            !chatbotSettings.smartReplies,
                          )
                        }
                      />
                    </div>
                  </div>

                  <Divider />

                  <Button
                    className="w-full"
                    color="danger"
                    variant="flat"
                    onClick={() => {
                      setMessages([
                        {
                          role: "system",
                          content:
                            "Hi there! I'm EzzyBot, your personal assistant. How can I help you today?",
                        },
                      ]);
                    }}
                  >
                    Clear Chat History
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Topic Selection (when no topic is selected) */}
          {!selectedTopic && !settingsOpen && (
            <div className="p-4">
              <h3
                className={`font-medium mb-3 ${chatbotSettings.theme === "dark" ? "text-white" : "text-gray-700"}`}
              >
                How can I help you today?
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  className="justify-start"
                  color="primary"
                  startContent={<Icon icon="solar:document-bold" width={18} />}
                  variant="flat"
                  onClick={() => setSelectedTopic("forms")}
                >
                  Help with forms
                </Button>
                <Button
                  className="justify-start"
                  color="secondary"
                  startContent={
                    <Icon icon="solar:widget-add-bold" width={18} />
                  }
                  variant="flat"
                  onClick={() => setSelectedTopic("templates")}
                >
                  Template assistance
                </Button>
                <Button
                  className="justify-start"
                  color="success"
                  startContent={<Icon icon="solar:share-bold" width={18} />}
                  variant="flat"
                  onClick={() => setSelectedTopic("sharing")}
                >
                  Sharing & publishing
                </Button>
                <Button
                  className="justify-start"
                  color="warning"
                  startContent={<Icon icon="solar:chart-bold" width={18} />}
                  variant="flat"
                  onClick={() => setSelectedTopic("analytics")}
                >
                  Analytics help
                </Button>
                <Button
                  className="justify-start"
                  color="danger"
                  startContent={<Icon icon="solar:settings-bold" width={18} />}
                  variant="flat"
                  onClick={() => setSelectedTopic("account")}
                >
                  Account settings
                </Button>
                <Button
                  className="justify-start"
                  startContent={
                    <Icon icon="solar:chat-round-dots-bold" width={18} />
                  }
                  variant="flat"
                  onClick={() => setSelectedTopic("chat")}
                >
                  Just chat with me
                </Button>
              </div>
            </div>
          )}

          {/* Quick Actions for topic */}
          {selectedTopic &&
            !settingsOpen &&
            quickActions[selectedTopic] &&
            quickActions[selectedTopic].length > 0 && (
              <div className="flex flex-wrap gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
                {quickActions[selectedTopic].map((action, idx) => (
                  <Button
                    key={idx}
                    className="gap-1"
                    size="sm"
                    startContent={<Icon icon={action.icon} width={16} />}
                    variant="flat"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}

          {/* Chat Messages */}
          {selectedTopic && !settingsOpen && (
            <div
              ref={chatContainerRef}
              className={`h-[350px] overflow-y-auto p-4 flex-1 ${
                chatbotSettings.theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-50"
              }`}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === "user" ? "text-right" : ""} group relative`}
                >
                  <div
                    className={`inline-block max-w-[85%] p-3 rounded-2xl shadow-sm ${
                      message.role === "user"
                        ? chatbotSettings.theme === "dark"
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-500 text-white"
                        : chatbotSettings.theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                  {/* Copy button for bot responses */}
                  {message.role === "assistant" && (
                    <Tooltip content="Copy">
                      <button
                        className="absolute top-2 right-[-32px] opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopy(message.content)}
                      >
                        <Icon
                          className="text-gray-400 hover:text-indigo-500"
                          icon="solar:copy-bold"
                          width={16}
                        />
                      </button>
                    </Tooltip>
                  )}
                  {/* Regenerate button for last bot response */}
                  {message.role === "assistant" &&
                    index === messages.length - 1 && (
                      <Tooltip content="Regenerate">
                        <button
                          className="absolute top-10 right-[-32px] opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={handleRegenerate}
                        >
                          <Icon
                            className="text-gray-400 hover:text-indigo-500"
                            icon="solar:refresh-bold"
                            width={16}
                          />
                        </button>
                      </Tooltip>
                    )}
                  <div className="text-xs text-gray-500 mt-1">
                    {message.role === "user" ? "You" : "EzzyBot"} •{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              {/* Improved typing indicator */}
              {isTyping && (
                <div className="mb-4">
                  <div
                    className={`inline-block p-3 rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 animate-pulse shadow-sm`}
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              {/* Scroll to latest button */}
              {isScrolledUp && (
                <button
                  className="fixed bottom-24 right-8 z-50 bg-indigo-500 text-white rounded-full p-2 shadow-lg hover:bg-indigo-600 transition-all"
                  onClick={() => {
                    chatContainerRef.current.scrollTop =
                      chatContainerRef.current.scrollHeight;
                  }}
                >
                  <Icon icon="solar:arrow-down-bold" width={18} />
                </button>
              )}
            </div>
          )}

          {/* Chat Input */}
          {selectedTopic && !settingsOpen && (
            <>
              <div
                className={`p-3 border-t ${
                  chatbotSettings.theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {chatbotSettings.voiceEnabled && (
                    <button
                      className={`p-2 rounded-full ${
                        chatbotSettings.theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={
                          chatbotSettings.theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }
                        icon="solar:microphone-bold"
                        width={20}
                      />
                    </button>
                  )}
                  <Input
                    fullWidth
                    classNames={{
                      input:
                        chatbotSettings.theme === "dark" ? "text-white" : "",
                      inputWrapper:
                        chatbotSettings.theme === "dark"
                          ? "bg-gray-700 border-gray-600"
                          : "",
                    }}
                    endContent={
                      <button
                        className={`p-1 rounded-full ${!inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""} ${
                          chatbotSettings.theme === "dark"
                            ? "text-white"
                            : "text-indigo-600"
                        }`}
                        disabled={!inputValue.trim()}
                        onClick={handleSendMessage}
                      >
                        <Icon icon="solar:arrow-up-bold" width={20} />
                      </button>
                    }
                    placeholder="Type your message..."
                    value={inputValue}
                    variant="bordered"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              {/* Suggestions */}
              {chatbotSettings.smartReplies && (
                <div
                  className={`p-3 border-t overflow-x-auto whitespace-nowrap ${
                    chatbotSettings.theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {suggestions.general.map((suggestion, index) => (
                    <button
                      key={index}
                      className={`mr-2 mb-2 px-3 py-1.5 text-xs rounded-full whitespace-nowrap ${
                        chatbotSettings.theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Powered by footer */}
          <div
            className={`px-3 py-2 text-xs text-center ${
              chatbotSettings.theme === "dark"
                ? "bg-gray-900 text-gray-500"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Powered by EzzyForms AI Assistant
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
