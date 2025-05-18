"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";

const DashboardOverview = ({ setActiveTab, setShowPricing }) => {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [upgradeBanner, setUpgradeBanner] = useState(true);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);

  // Add gradient backgrounds to stats
  const stats = [
    {
      title: "Total Forms",
      value: "12",
      icon: "solar:document-bold-duotone",
      change: "+2 this week",
      gradient: "from-blue-500 to-cyan-400",
      textColor: "text-blue-600",
    },
    {
      title: "Total Responses",
      value: "1,243",
      icon: "solar:chat-round-dots-bold-duotone",
      change: "+124 this week",
      gradient: "from-green-500 to-emerald-400",
      textColor: "text-green-600",
    },
    {
      title: "Completion Rate",
      value: "82%",
      icon: "solar:check-circle-bold-duotone",
      change: "+3% this week",
      gradient: "from-purple-500 to-indigo-400",
      textColor: "text-purple-600",
    },
    {
      title: "Active Users",
      value: "354",
      icon: "solar:users-group-rounded-bold-duotone",
      change: "+28 this week",
      gradient: "from-amber-500 to-orange-400",
      textColor: "text-amber-600",
    },
  ];

  // Sample timeline data
  const timelineData = [
    {
      time: "3:42 PM",
      date: "Today",
      icon: "solar:user-check-rounded-bold-duotone",
      color: "bg-blue-500",
      title: "New form submission",
      description: "Customer Feedback Form received a new response",
    },
    {
      time: "11:20 AM",
      date: "Today",
      icon: "solar:pen-bold-duotone",
      color: "bg-purple-500",
      title: "Form updated",
      description: "You made changes to Event Registration form",
    },
    {
      time: "9:15 AM",
      date: "Yesterday",
      icon: "solar:chart-bold-duotone",
      color: "bg-green-500",
      title: "Analytics report ready",
      description: "Your weekly performance report is available",
    },
    {
      time: "2:45 PM",
      date: "Oct 21, 2023",
      icon: "solar:star-bold-duotone",
      color: "bg-amber-500",
      title: "Milestone reached",
      description: "Your forms have collected over 1,000 responses",
    },
  ];

  // Active forms data for preview
  const activeForms = [
    {
      id: 1,
      name: "Customer Feedback",
      responses: 134,
      completionRate: 86,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Event Registration",
      responses: 89,
      completionRate: 92,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      id: 3,
      name: "Product Survey",
      responses: 245,
      completionRate: 74,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
  ];

  // Weekly response data for mini chart
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [18, 25, 32, 22, 36, 12, 28],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { tension: 0.4 },
    },
  };

  // Prepare data for recharts LineChart
  const weeklyChartData = weeklyData.labels.map((label, idx) => ({
    name: label,
    value: weeklyData.datasets[0].data[idx],
  }));

  return (
    <>
      {/* Welcome Banner with more interactive design */}
      {showWelcome && (
        <Card className="mb-8 overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-0 relative">
            {/* Abstract shape decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full" />
              <div className="absolute top-20 right-20 w-20 h-20 bg-white/20 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full" />
            </div>

            {/* Close button */}
            <button
              className="absolute top-5 right-5 text-white/80 hover:text-white z-10"
              onClick={() => setShowWelcome(false)}
            >
              <Icon icon="solar:close-circle-bold" width={24} />
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between p-8 relative z-1">
              <div className="mb-6 md:mb-0 md:max-w-xl">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Welcome to your EzzyForms Dashboard!
                </h2>
                <p className="text-white/90 mb-6 text-lg">
                  Create beautiful, responsive forms that engage your audience
                  and drive results. Get started in just a few minutes.
                </p>

                {/* Action buttons with more interesting design */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-white text-indigo-600 font-medium hover:bg-blue-50 gap-2 h-12 px-6"
                    startContent={
                      <Icon icon="solar:pen-new-square-bold" width={20} />
                    }
                    onClick={() => router.push("/dashboard/create")}
                  >
                    Create First Form
                  </Button>
                  <Button
                    className="bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 gap-2 h-12 px-6"
                    startContent={<Icon icon="solar:play-bold" width={20} />}
                    onClick={() => setShowTourModal(true)}
                  >
                    Watch Tour
                  </Button>
                </div>
              </div>

              {/* 3D Illustration */}
              <div className="hidden md:block md:w-1/4 relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-300/20 rounded-full blur-2xl" />
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 transform rotate-3 hover:rotate-0 transition-transform">
                  <img
                    alt="Dashboard preview"
                    className="w-full h-auto rounded-lg shadow-lg"
                    src="https://placehold.co/400x300/6366f1/white?text=EzzyForms+Dashboard"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Overview with modern design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.gradient}`} />
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.textColor} bg-gray-50`}
                >
                  <Icon icon={stat.icon} width={24} />
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{stat.change}</span>
                  <Icon
                    className="ml-1 text-green-500"
                    icon="solar:arrow-up-bold"
                    width={14}
                  />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-bold">Quick Actions</h3>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 cursor-pointer hover:shadow-md transition-shadow"
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push("/dashboard/create")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      router.push("/dashboard/create");
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-3">
                    <Icon icon="solar:pen-new-square-bold" width={24} />
                  </div>
                  <h4 className="font-bold mb-1">Create Form</h4>
                  <p className="text-xs text-gray-600">
                    Start building your form
                  </p>
                </div>

                <div
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center text-center"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab("templates")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab("templates");
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white mb-3">
                    <Icon
                      icon="solar:clipboard-heart-bold-duotone"
                      width={24}
                    />
                  </div>
                  <h4 className="font-bold mb-1">Templates</h4>
                  <p className="text-xs text-gray-600">Use pre-built designs</p>
                </div>

                <div
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center text-center"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab("analytics")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab("analytics");
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white mb-3">
                    <Icon icon="solar:chart-bold-duotone" width={24} />
                  </div>
                  <h4 className="font-bold mb-1">Analytics</h4>
                  <p className="text-xs text-gray-600">View form performance</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Active Forms - More Compact Design */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center mr-5">
                  <Icon
                    className="text-indigo-500 mr-2"
                    icon="solar:file-check-bold-duotone"
                    width={20}
                  />
                  Active Forms
                </h3>
                <Button
                  className="bg-white/80 hover:bg-white"
                  endContent={
                    <Icon icon="solar:arrow-right-linear" width={14} />
                  }
                  size="sm"
                  variant="flat"
                  onClick={() => setActiveTab("forms")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-4">
              <div className="space-y-3">
                {activeForms.map((form, index) => {
                  // Generate colors based on index
                  const colors = [
                    {
                      icon: "solar:chat-round-dots-bold-duotone",
                      iconColor: "text-blue-500",
                      progress: "bg-blue-500",
                    },
                    {
                      icon: "solar:calendar-mark-bold-duotone",
                      iconColor: "text-purple-500",
                      progress: "bg-purple-500",
                    },
                    {
                      icon: "solar:box-bold-duotone",
                      iconColor: "text-emerald-500",
                      progress: "bg-emerald-500",
                    },
                  ];
                  const color = colors[index % colors.length];

                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors p-3 hover:shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Icon
                            className={color.iconColor}
                            icon={color.icon}
                            width={18}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-900">
                              {form.name}
                            </h4>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Icon
                                  className="text-gray-400"
                                  icon="solar:users-group-rounded-bold"
                                  width={12}
                                />
                                <span className="text-sm font-medium">
                                  {form.responses}
                                </span>
                              </div>
                              <Badge
                                className=""
                                color="success"
                                size="sm"
                                variant="flat"
                              >
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                                Active
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <div className="text-xs text-gray-500 min-w-[60px]">
                              {form.completionRate}% complete
                            </div>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${color.progress}`}
                                style={{ width: `${form.completionRate}%` }}
                              />
                            </div>
                            <div className="flex gap-1">
                              <Button
                                isIconOnly
                                className="min-w-6 w-6 h-6 p-0"
                                size="sm"
                                variant="flat"
                              >
                                <Icon icon="solar:pen-bold" width={12} />
                              </Button>
                              <Button
                                isIconOnly
                                className="min-w-6 w-6 h-6 p-0"
                                color="primary"
                                size="sm"
                                variant="flat"
                              >
                                <Icon icon="solar:eye-bold" width={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Weekly responses mini-chart */}
          <Card className="border-0 shadow-md">
            <CardHeader className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-bold">Responses this week</h3>
              <Badge color="success" variant="flat">
                <Icon className="mr-1" icon="solar:arrow-up-bold" width={14} />
                <span>12% vs last week</span>
              </Badge>
            </CardHeader>
            <CardBody className="p-6">
              <div className="text-3xl font-bold mb-2">173</div>
              <p className="text-gray-500 text-sm mb-4">
                Total responses collected
              </p>
              <div className="h-32">
                <ResponsiveContainer height="100%" width="100%">
                  <LineChart
                    data={weeklyChartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      stroke="#f3f4f6"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      axisLine={false}
                      dataKey="name"
                      style={{ fontSize: "12px", color: "#64748b" }}
                      tickLine={false}
                    />
                    <YAxis
                      hide
                      axisLine={false}
                      style={{ fontSize: "12px", color: "#64748b" }}
                      tickLine={false}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#f3f4f6",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      dataKey="value"
                      dot={false}
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      type="monotone"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          {/* Activity Timeline - New Design from FormsContent */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="border-b bg-gray-50 px-6 py-4">
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Icon
                    className="text-indigo-500 mr-2"
                    icon="solar:clock-circle-bold"
                    width={18}
                  />
                  Recent Activity
                </h3>
                <Button
                  endContent={
                    <Icon icon="solar:arrow-right-linear" width={14} />
                  }
                  size="sm"
                  variant="flat"
                  onClick={() => setShowActivityModal(true)}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="relative pl-8 py-3 pr-6">
                {/* Timeline connector line */}
                <div className="absolute top-0 bottom-0 left-8 w-px bg-gray-200" />

                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                      <Icon
                        className="text-white"
                        icon="solar:user-check-rounded-bold"
                        width={12}
                      />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 ml-4 border border-blue-100">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          New response on &quot;Customer Feedback Form&quot;
                        </p>
                        <Badge color="primary" size="sm" variant="flat">
                          New
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          From: john.doe@example.com
                        </p>
                        <p className="text-xs text-gray-500">10 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                      <Icon
                        className="text-white"
                        icon="solar:chart-bold"
                        width={12}
                      />
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 ml-4 border border-green-100">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Weekly analytics report is ready
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Icon icon="solar:arrow-up-bold" width={12} />
                          12% increase in responses
                        </span>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                      <Icon
                        className="text-white"
                        icon="solar:pen-bold"
                        width={12}
                      />
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 ml-4 border border-purple-100">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        You edited &quot;Event Registration&quot; form
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          5 fields modified
                        </p>
                        <p className="text-xs text-gray-500">
                          Yesterday at 4:30 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                      <Icon
                        className="text-white"
                        icon="solar:add-square-bold"
                        width={12}
                      />
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 ml-4 border border-amber-100">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        New form &quot;Product Survey&quot; created
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          15 questions added
                        </p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Upgrade Banner - Compact */}
      {upgradeBanner && (
        <Card className="mb-6 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
          <CardBody className="p-0 relative">
            {/* Abstract backgrounds */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-white/80 hover:text-white z-10"
              onClick={() => setUpgradeBanner(false)}
            >
              <Icon icon="solar:close-circle-bold" width={20} />
            </button>

            <div className="flex flex-col md:flex-row items-center py-4 px-6 relative z-1">
              <div className="hidden md:flex md:mr-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <Icon
                    className="text-white"
                    icon="solar:crown-bold-duotone"
                    width={24}
                  />
                </div>
              </div>
              <div className="flex-1 md:mb-0 text-center md:text-left">
                <h3 className="text-xl font-bold text-white">Upgrade to Pro</h3>
                <p className="text-white/80 text-sm mb-0">
                  Unlock premium features and remove response limits.
                </p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 font-medium"
                  size="sm"
                  onClick={() => setShowPricing(true)}
                >
                  Upgrade Now
                </Button>
                <Button
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                  size="sm"
                  variant="flat"
                  onClick={() => setShowPricing(true)}
                >
                  Compare Plans
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Recent Activity Modal */}
      <Modal
        isOpen={showActivityModal}
        size="lg"
        onOpenChange={setShowActivityModal}
      >
        <ModalContent>
          <ModalHeader className="border-b">All Recent Activity</ModalHeader>
          <ModalBody className="max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {timelineData.map((item, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute top-1 left-0 w-5 h-5 rounded-full ${item.color} flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white`}
                  >
                    <Icon className="text-white" icon={item.icon} width={12} />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 ml-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <Badge color="primary" size="sm" variant="flat">
                        {item.date}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setShowActivityModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Watch Tour Modal */}
      <Modal isOpen={showTourModal} size="2xl" onOpenChange={setShowTourModal}>
        <ModalContent>
          <ModalHeader className="border-b flex items-center gap-2">
            <Icon
              className="text-blue-500"
              icon="solar:play-circle-bold"
              width={24}
            />
            <span>Watch Dashboard Tour</span>
          </ModalHeader>
          <ModalBody className="p-0">
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Dashboard Tour"
                width="100%"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setShowTourModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DashboardOverview;
