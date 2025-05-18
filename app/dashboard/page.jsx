"use client";

import { useState, useRef } from "react";
import {
  Card,
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Edu_QLD_Beginner } from "next/font/google";

// Import components
import FormsContent from "./components/FormsContent";
import TemplatesContent from "./components/TemplatesContent";
import AnalyticsContent from "./components/AnalyticsContent";
import SettingsContent from "./components/SettingsContent";
import DashboardOverview from "./components/DashboardOverview";
import AIAssistantContent from "./components/AIAssistantContent";

const eduQLD = Edu_QLD_Beginner({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPricing, setShowPricing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const mainContentRef = useRef(null);

  const handleLogout = () => {
    router.push("/");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Scroll main content to top after tab change
    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: "auto" });
      }
    }, 0);
  };

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "forms":
        return <FormsContent />;
      case "templates":
        return <TemplatesContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      case "ai-assistant":
        return <AIAssistantContent />;
      default:
        return (
          <DashboardOverview
            setActiveTab={setActiveTab}
            setShowPricing={setShowPricing}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold mr-2">
              E
            </div>
            <h1
              className={`text-xl font-bold text-gray-900 dark:text-white ${eduQLD.className}`}
            >
              EzzyForms
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <button
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left ${
                  activeTab === "dashboard"
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("dashboard")}
              >
                <Icon icon="solar:home-2-bold" width={20} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left ${
                  activeTab === "forms"
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("forms")}
              >
                <Icon icon="solar:document-bold" width={20} />
                <span>Forms</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left ${
                  activeTab === "templates"
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("templates")}
              >
                <Icon icon="solar:clipboard-heart-bold" width={20} />
                <span>Templates</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left ${
                  activeTab === "analytics"
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("analytics")}
              >
                <Icon icon="solar:chart-bold" width={20} />
                <span>Analytics</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left text-indigo-600 hover:bg-indigo-50"
                onClick={() => handleTabChange("ai-assistant")}
              >
                <Icon icon="solar:chat-round-dots-bold" width={20} />
                <span>AI Assistant</span>
              </button>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">
              Quick Actions
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-100"
                  onClick={() => router.push("/dashboard/create")}
                >
                  <Icon icon="solar:pen-new-square-linear" width={20} />
                  <span>Create Form</span>
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowImportModal(true)}
                >
                  <Icon icon="solar:import-linear" width={20} />
                  <span>Import Data</span>
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                  onClick={() => setShowPricing(true)}
                >
                  <Icon icon="solar:crown-bold-duotone" width={20} />
                  <span>Upgrade Now</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* User section */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left mb-2 ${
              activeTab === "settings"
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleTabChange("settings")}
          >
            <Icon icon="solar:settings-bold" width={20} />
            <span>Settings</span>
          </button>
          <div
            className="px-4 py-3 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => setShowUserModal(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowUserModal(true);
            }}
          >
            <div className="flex items-center gap-3">
              <Avatar size="sm" src="https://i.pravatar.cc/150?img=3" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">
                  john.doe@example.com
                </p>
              </div>
              <Button
                isIconOnly
                className="ml-1"
                color="danger"
                variant="light"
                onClick={handleLogout}
              >
                <Icon icon="solar:logout-3-bold" width={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8" ref={mainContentRef}>
        {activeTab === "dashboard" ? (
          <DashboardOverview
            setActiveTab={setActiveTab}
            setShowPricing={setShowPricing}
          />
        ) : (
          renderContent()
        )}
      </div>

      {/* Pricing Modal (moved from DashboardOverview) */}
      <Modal
        className="backdrop-blur-sm bg-black/40"
        hideCloseButton={false}
        isOpen={showPricing}
        onOpenChange={setShowPricing}
      >
        <ModalContent className="max-w-4xl w-full rounded-3xl shadow-2xl border bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <ModalHeader className="border-b text-2xl font-bold py-6 text-center tracking-tight">
            Pricing Plans
          </ModalHeader>
          <ModalBody className="py-10 px-2 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="border rounded-2xl p-7 bg-white flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow relative">
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                    <Icon
                      className="text-blue-500"
                      icon="solar:star-bold-duotone"
                      width={28}
                    />
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-1">Basic</h4>
                <div className="text-3xl font-bold mb-2">Free</div>
                <ul className="text-sm text-gray-600 mb-7 list-disc list-inside space-y-1 text-center">
                  <li>100 responses/month</li>
                  <li>Basic analytics</li>
                  <li>Email support</li>
                </ul>
                <Button className="w-full" color="primary" size="md">
                  Current Plan
                </Button>
              </div>
              {/* Pro Plan */}
              <div className="border-2 border-amber-400 rounded-2xl p-7 bg-white flex flex-col items-center shadow-xl hover:shadow-2xl transition-shadow scale-105 relative">
                {/* Pro Badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                  Most Popular
                </span>
                <div className="mb-3 mt-3">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                    <Icon
                      className="text-amber-500"
                      icon="solar:crown-bold-duotone"
                      width={28}
                    />
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-1 text-amber-600">Pro</h4>
                <div className="text-3xl font-bold mb-2 text-amber-600">
                  $12<span className="text-base font-normal">/mo</span>
                </div>
                <ul className="text-sm text-gray-600 mb-7 list-disc list-inside space-y-1 text-center">
                  <li>5,000 responses/month</li>
                  <li>Advanced analytics</li>
                  <li>Remove branding</li>
                  <li>Priority support</li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-orange-500 hover:to-amber-500 transition-colors font-semibold shadow-md"
                  size="md"
                >
                  Upgrade
                </Button>
              </div>
              {/* Business Plan */}
              <div className="border rounded-2xl p-7 bg-white flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow relative">
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                    <Icon
                      className="text-purple-500"
                      icon="solar:course-up-bold-duotone"
                      width={28}
                    />
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-1">Business</h4>
                <div className="text-3xl font-bold mb-2">Custom</div>
                <ul className="text-sm text-gray-600 mb-7 list-disc list-inside space-y-1 text-center">
                  <li>Unlimited responses</li>
                  <li>Custom integrations</li>
                  <li>Dedicated support</li>
                </ul>
                <Button
                  className="w-full hover:bg-purple-600 hover:text-white transition-colors font-semibold shadow-md"
                  color="primary"
                  size="md"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="py-4 px-10">
            <Button
              className="w-full"
              variant="flat"
              onClick={() => setShowPricing(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showImportModal}
        size="md"
        onOpenChange={setShowImportModal}
      >
        <ModalContent>
          <ModalHeader className="border-b">Import Data</ModalHeader>
          <ModalBody>
            <Input
              accept=".csv,.xlsx,.json"
              className="w-full"
              label="Upload File"
              type="file"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setShowImportModal(false)}>
              Close
            </Button>
            <Button color="primary">Import</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={showUserModal} size="sm" onOpenChange={setShowUserModal}>
        <ModalContent>
          <ModalHeader className="border-b">User Details</ModalHeader>
          <ModalBody>
            <Card className="border-0 shadow-none flex flex-col items-center p-6">
              <Avatar
                className="mb-3"
                size="lg"
                src="https://i.pravatar.cc/150?img=3"
              />
              <div className="text-lg font-bold mb-1">John Doe</div>
              <div className="text-sm text-gray-500 mb-3">
                john.doe@example.com
              </div>
              <Chip className="mb-2" color="success" variant="flat">
                Subscription: Free Plan
              </Chip>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full"
              variant="flat"
              onClick={() => setShowUserModal(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
