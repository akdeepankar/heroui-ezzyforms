"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip as RechartsTooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip as HeroTooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import {
  BarChart as HBarChart,
  Bar as HBar,
  XAxis as HXAxis,
  YAxis as HYAxis,
  Tooltip as HTooltip,
  ResponsiveContainer as HResponsiveContainer,
  Cell as HCell,
} from "recharts";

// Dynamically import Leaflet map to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

// Data for charts
const submissionSources = [
  { name: "Website", value: 520 },
  { name: "Email", value: 310 },
  { name: "Social", value: 180 },
  { name: "Direct Link", value: 140 },
];

const deviceDistribution = [
  { name: "Mobile", value: 640 },
  { name: "Desktop", value: 320 },
  { name: "Tablet", value: 120 },
];

const allForms = [
  "All Forms",
  "Feedback",
  "Survey",
  "Registration",
  "Application",
  "Signup",
];

const formRevenueData = {
  "All Forms": [
    { name: "Week 1", revenue: 18500 },
    { name: "Week 2", revenue: 24600 },
    { name: "Week 3", revenue: 19800 },
    { name: "Week 4", revenue: 26500 },
  ],
  Feedback: [
    { name: "Week 1", revenue: 4200 },
    { name: "Week 2", revenue: 5200 },
    { name: "Week 3", revenue: 4800 },
    { name: "Week 4", revenue: 5300 },
  ],
  Survey: [
    { name: "Week 1", revenue: 3200 },
    { name: "Week 2", revenue: 4100 },
    { name: "Week 3", revenue: 3800 },
    { name: "Week 4", revenue: 4500 },
  ],
  Registration: [
    { name: "Week 1", revenue: 2500 },
    { name: "Week 2", revenue: 3100 },
    { name: "Week 3", revenue: 2800 },
    { name: "Week 4", revenue: 3500 },
  ],
  Application: [
    { name: "Week 1", revenue: 2100 },
    { name: "Week 2", revenue: 2600 },
    { name: "Week 3", revenue: 2300 },
    { name: "Week 4", revenue: 3000 },
  ],
  Signup: [
    { name: "Week 1", revenue: 1500 },
    { name: "Week 2", revenue: 1600 },
    { name: "Week 3", revenue: 1100 },
    { name: "Week 4", revenue: 1200 },
  ],
};

const submissionsTrendData = {
  "All Forms": [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 140 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 160 },
    { name: "Fri", value: 200 },
    { name: "Sat", value: 170 },
    { name: "Sun", value: 150 },
  ],
  Feedback: [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 40 },
    { name: "Wed", value: 50 },
    { name: "Thu", value: 45 },
    { name: "Fri", value: 60 },
    { name: "Sat", value: 55 },
    { name: "Sun", value: 40 },
  ],
  Survey: [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 40 },
    { name: "Thu", value: 35 },
    { name: "Fri", value: 50 },
    { name: "Sat", value: 45 },
    { name: "Sun", value: 30 },
  ],
  Registration: [
    { name: "Mon", value: 15 },
    { name: "Tue", value: 20 },
    { name: "Wed", value: 25 },
    { name: "Thu", value: 22 },
    { name: "Fri", value: 30 },
    { name: "Sat", value: 28 },
    { name: "Sun", value: 20 },
  ],
  Application: [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 20 },
    { name: "Thu", value: 18 },
    { name: "Fri", value: 25 },
    { name: "Sat", value: 22 },
    { name: "Sun", value: 15 },
  ],
  Signup: [
    { name: "Mon", value: 8 },
    { name: "Tue", value: 10 },
    { name: "Wed", value: 12 },
    { name: "Thu", value: 11 },
    { name: "Fri", value: 15 },
    { name: "Sat", value: 13 },
    { name: "Sun", value: 10 },
  ],
};

const responseRateData = {
  "All Forms": [
    { name: "Jan", rate: 0.82 },
    { name: "Feb", rate: 0.85 },
    { name: "Mar", rate: 0.88 },
    { name: "Apr", rate: 0.91 },
    { name: "May", rate: 0.89 },
    { name: "Jun", rate: 0.93 },
  ],
  Feedback: [
    { name: "Jan", rate: 0.8 },
    { name: "Feb", rate: 0.83 },
    { name: "Mar", rate: 0.86 },
    { name: "Apr", rate: 0.89 },
    { name: "May", rate: 0.87 },
    { name: "Jun", rate: 0.91 },
  ],
  Survey: [
    { name: "Jan", rate: 0.78 },
    { name: "Feb", rate: 0.81 },
    { name: "Mar", rate: 0.84 },
    { name: "Apr", rate: 0.87 },
    { name: "May", rate: 0.85 },
    { name: "Jun", rate: 0.89 },
  ],
  Registration: [
    { name: "Jan", rate: 0.75 },
    { name: "Feb", rate: 0.78 },
    { name: "Mar", rate: 0.81 },
    { name: "Apr", rate: 0.84 },
    { name: "May", rate: 0.82 },
    { name: "Jun", rate: 0.87 },
  ],
  Application: [
    { name: "Jan", rate: 0.72 },
    { name: "Feb", rate: 0.75 },
    { name: "Mar", rate: 0.78 },
    { name: "Apr", rate: 0.81 },
    { name: "May", rate: 0.79 },
    { name: "Jun", rate: 0.84 },
  ],
  Signup: [
    { name: "Jan", rate: 0.7 },
    { name: "Feb", rate: 0.73 },
    { name: "Mar", rate: 0.76 },
    { name: "Apr", rate: 0.79 },
    { name: "May", rate: 0.77 },
    { name: "Jun", rate: 0.82 },
  ],
};

const kpiDataMap = {
  "All Forms": [
    {
      name: "Completion Rate",
      value: 86,
      fill: "#22c55e",
      total: 100,
      unit: "%",
      icon: "solar:check-circle-bold-duotone",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Avg. Time (min)",
      value: 2.6,
      fill: "#6366f1",
      total: 10,
      unit: "min",
      icon: "solar:clock-circle-bold-duotone",
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Abandonment Rate",
      value: 14,
      fill: "#ef4444",
      total: 100,
      unit: "%",
      icon: "solar:close-circle-bold-duotone",
      color: "from-rose-400 to-red-500",
    },
  ],
  Feedback: [
    {
      name: "Completion Rate",
      value: 82,
      fill: "#22c55e",
      total: 100,
      unit: "%",
      icon: "solar:check-circle-bold-duotone",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Avg. Time (min)",
      value: 2.2,
      fill: "#6366f1",
      total: 10,
      unit: "min",
      icon: "solar:clock-circle-bold-duotone",
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Abandonment Rate",
      value: 18,
      fill: "#ef4444",
      total: 100,
      unit: "%",
      icon: "solar:close-circle-bold-duotone",
      color: "from-rose-400 to-red-500",
    },
  ],
  Survey: [
    {
      name: "Completion Rate",
      value: 79,
      fill: "#22c55e",
      total: 100,
      unit: "%",
      icon: "solar:check-circle-bold-duotone",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Avg. Time (min)",
      value: 3.1,
      fill: "#6366f1",
      total: 10,
      unit: "min",
      icon: "solar:clock-circle-bold-duotone",
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Abandonment Rate",
      value: 21,
      fill: "#ef4444",
      total: 100,
      unit: "%",
      icon: "solar:close-circle-bold-duotone",
      color: "from-rose-400 to-red-500",
    },
  ],
  Registration: [
    {
      name: "Completion Rate",
      value: 88,
      fill: "#22c55e",
      total: 100,
      unit: "%",
      icon: "solar:check-circle-bold-duotone",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Avg. Time (min)",
      value: 2.0,
      fill: "#6366f1",
      total: 10,
      unit: "min",
      icon: "solar:clock-circle-bold-duotone",
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Abandonment Rate",
      value: 12,
      fill: "#ef4444",
      total: 100,
      unit: "%",
      icon: "solar:close-circle-bold-duotone",
      color: "from-rose-400 to-red-500",
    },
  ],
  Application: [
    {
      name: "Completion Rate",
      value: 84,
      fill: "#22c55e",
      total: 100,
      unit: "%",
      icon: "solar:check-circle-bold-duotone",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Avg. Time (min)",
      value: 2.8,
      fill: "#6366f1",
      total: 10,
      unit: "min",
      icon: "solar:clock-circle-bold-duotone",
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Abandonment Rate",
      value: 16,
      fill: "#ef4444",
      total: 100,
      unit: "%",
      icon: "solar:close-circle-bold-duotone",
      color: "from-rose-400 to-red-500",
    },
  ],
  Signup: [
    {
      name: "Completion Rate",
      value: 90,
      fill: "#22c55e",
      total: 100,
      unit: "%",
      icon: "solar:check-circle-bold-duotone",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Avg. Time (min)",
      value: 1.7,
      fill: "#6366f1",
      total: 10,
      unit: "min",
      icon: "solar:clock-circle-bold-duotone",
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Abandonment Rate",
      value: 10,
      fill: "#ef4444",
      total: 100,
      unit: "%",
      icon: "solar:close-circle-bold-duotone",
      color: "from-rose-400 to-red-500",
    },
  ],
};

const dateRanges = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "3m" },
];

const formatKPI = (value, unit) => {
  if (unit === "%") return `${value}%`;
  if (unit === "min") return `${value} min`;

  return value;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Top cities data for horizontal bar chart and map
const topCities = [
  { name: "New York", value: 256, color: "#4f46e5" },
  { name: "Los Angeles", value: 189, color: "#6366f1" },
  { name: "Chicago", value: 145, color: "#8b5cf6" },
  { name: "Houston", value: 120, color: "#a855f7" },
  { name: "Phoenix", value: 105, color: "#d946ef" },
  { name: "Philadelphia", value: 95, color: "#ec4899" },
  { name: "San Antonio", value: 87, color: "#f43f5e" },
  { name: "San Diego", value: 82, color: "#ef4444" },
  { name: "Dallas", value: 78, color: "#f97316" },
  { name: "San Jose", value: 74, color: "#eab308" },
];

export default function AnalyticsContent() {
  // Filtering state
  const [selectedForm, setSelectedForm] = useState("All Forms");
  const [selectedRange, setSelectedRange] = useState("7d");

  // Filtered data
  const kpis = kpiDataMap[selectedForm];
  const revenue = formRevenueData[selectedForm];
  const trend = submissionsTrendData[selectedForm];
  const response = responseRateData[selectedForm];

  return (
    <div className="space-y-8">
      {/* Enhanced Banner with Stats */}
      <div className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-xl p-6 md:p-8 relative overflow-hidden border border-white/20 text-white">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <Icon
                className="text-white/90"
                icon="solar:graph-new-bold-duotone"
                width={28}
              />
              <h2 className="text-xl font-semibold">
                Form Analytics Dashboard
              </h2>
            </div>
            <p className="text-sm text-white/80">Track and analyze your form performance in real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
              <div className="text-lg font-bold">98%</div>
              <div className="text-xs opacity-80">Accuracy</div>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
              <div className="text-lg font-bold">24/7</div>
              <div className="text-xs opacity-80">Monitoring</div>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
              <div className="text-lg font-bold">1.2s</div>
              <div className="text-xs opacity-80">Update Time</div>
            </div>
            <Button
              className="bg-white text-indigo-600 font-medium border border-white/20"
              startContent={<Icon icon="solar:export-bold" width={18} />}
              variant="flat"
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Submissions", value: "12,458", change: "+12.5%", trend: "up", color: "green" },
          { label: "Active Forms", value: "24", change: "+2", trend: "up", color: "blue" },
          { label: "Avg. Response Time", value: "2.4 min", change: "-0.3 min", trend: "down", color: "green" },
          { label: "Conversion Rate", value: "68.5%", change: "+5.2%", trend: "up", color: "green" }
        ].map((stat, idx) => (
          <Card key={idx} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="mt-2 flex items-center gap-1">
              <Icon 
                icon={stat.trend === 'up' ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'} 
                className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} 
                width={14} 
              />
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4">
        <div className="flex gap-3 items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="min-w-[140px] bg-gray-50 text-gray-700 border border-gray-100"
                variant="flat"
              >
                {dateRanges.find((r) => r.value === selectedRange)?.label}
                <Icon
                  className="ml-2 text-gray-400"
                  icon="solar:alt-arrow-down-linear"
                  width={16}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Time period options"
              selectedKeys={[selectedRange]}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0];
                if (selectedKey) setSelectedRange(selectedKey.toString());
              }}
            >
              {dateRanges.map((range) => (
                <DropdownItem key={range.value}>{range.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="min-w-[140px] bg-gray-50 text-gray-700 border border-gray-100"
                variant="flat"
              >
                {selectedForm}
                <Icon
                  className="ml-2 text-gray-400"
                  icon="solar:alt-arrow-down-linear"
                  width={16}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Form options"
              selectedKeys={[selectedForm]}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0];
                if (selectedKey) setSelectedForm(selectedKey.toString());
              }}
            >
              {allForms.map((form) => (
                <DropdownItem key={form}>{form}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            className="bg-indigo-50 text-indigo-600 border border-indigo-100"
            startContent={<Icon icon="solar:filter-bold" width={16} />}
            variant="flat"
          >
            More Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Last updated: 2 minutes ago</span>
          <Button
            isIconOnly
            variant="light"
            className="text-gray-400"
          >
            <Icon icon="solar:refresh-circle-bold" width={18} />
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pie (Doughnut) Chart: Submission Sources */}
        <HeroTooltip
          content="Distribution of form submissions by source."
          placement="top"
        >
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon
                className="text-indigo-400"
                icon="solar:pie-chart-2-bold-duotone"
                width={18}
              />
              <span className="font-medium text-gray-700 text-sm">
                Submission Sources
              </span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer height={180} width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={submissionSources}
                    dataKey="value"
                    fill="#6366f1"
                    innerRadius={45}
                    nameKey="name"
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {submissionSources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          ["#6366f1", "#06b6d4", "#f59e42", "#3b82f6"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {submissionSources.map((src, i) => (
                  <span
                    key={src.name}
                    className="flex items-center gap-1 text-xs text-gray-500"
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{
                        background: [
                          "#6366f1",
                          "#06b6d4",
                          "#f59e42",
                          "#3b82f6",
                        ][i % 4],
                      }}
                    />
                    {src.name}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Doughnut Chart: Device Distribution */}
        <HeroTooltip
          content="Device types used to submit forms."
          placement="top"
        >
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon
                className="text-cyan-400"
                icon="solar:devices-bold-duotone"
                width={18}
              />
              <span className="font-medium text-gray-700 text-sm">
                Device Distribution
              </span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer height={180} width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={deviceDistribution}
                    dataKey="value"
                    fill="#06b6d4"
                    innerRadius={45}
                    nameKey="name"
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {deviceDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#06b6d4", "#6366f1", "#f59e42"][index % 3]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {deviceDistribution.map((dev, i) => (
                  <span
                    key={dev.name}
                    className="flex items-center gap-1 text-xs text-gray-500"
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{
                        background: ["#06b6d4", "#6366f1", "#f59e42"][i % 3],
                      }}
                    />
                    {dev.name}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Bar Chart: Form Revenue by Week */}
        <HeroTooltip
          content="Weekly revenue generated by forms."
          placement="top"
        >
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon
                className="text-blue-400"
                icon="solar:bar-chart-bold-duotone"
                width={18}
              />
              <span className="font-medium text-gray-700 text-sm">
                Form Revenue by Week
              </span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer height={160} width="100%">
                <BarChart
                  data={revenue}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke="#f3f4f6"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#f3f4f6",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                    formatter={(value) => [formatCurrency(value), "Revenue"]}
                  />
                  <Bar
                    barSize={24}
                    dataKey="revenue"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Line Chart: Submissions Trend */}
        <HeroTooltip content="Daily trend of form submissions." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon
                className="text-purple-400"
                icon="solar:chart-bold-duotone"
                width={18}
              />
              <span className="font-medium text-gray-700 text-sm">
                Submissions Trend
              </span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer height={160} width="100%">
                <LineChart
                  data={trend}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    style={{ fontSize: "12px", color: "#64748b" }}
                    tickLine={false}
                  />
                  <YAxis
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
                    stroke="#a78bfa"
                    strokeWidth={2.5}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Area Chart: Response Rate */}
        <HeroTooltip content="Monthly response rate for forms." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon
                className="text-green-400"
                icon="solar:activity-bold-duotone"
                width={18}
              />
              <span className="font-medium text-gray-700 text-sm">
                Response Rate
              </span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer height={160} width="100%">
                <AreaChart
                  data={response}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    style={{ fontSize: "12px", color: "#64748b" }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    style={{ fontSize: "12px", color: "#64748b" }}
                    tickFormatter={(v) => `${Math.round(v * 100)}%`}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#f3f4f6",
                      borderRadius: "8px",
                    }}
                    formatter={(v) => `${Math.round(v * 100)}%`}
                  />
                  <Area
                    dataKey="rate"
                    fill="#bbf7d0"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    type="monotone"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Horizontal Bar Chart: Top Cities by Submissions */}
        <HeroTooltip
          content="Top cities by number of form submissions."
          placement="top"
        >
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon
                className="text-amber-400"
                icon="solar:city-bold-duotone"
                width={18}
              />
              <span className="font-medium text-gray-700 text-sm">
                Top Cities by Submissions
              </span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <HResponsiveContainer height={180} width="100%">
                <HBarChart
                  data={topCities.slice(0, 7)}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <HYAxis
                    axisLine={false}
                    dataKey="name"
                    style={{ fontSize: "12px", color: "#64748b" }}
                    tickLine={false}
                    type="category"
                    width={80}
                  />
                  <HXAxis
                    axisLine={false}
                    style={{ fontSize: "12px", color: "#64748b" }}
                    tickLine={false}
                    type="number"
                  />
                  <HTooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#f3f4f6",
                      borderRadius: "8px",
                    }}
                    formatter={(v) => `${v} submissions`}
                  />
                  <HBar
                    barSize={16}
                    dataKey="value"
                    fill="#6366f1"
                    radius={[0, 8, 8, 0]}
                  >
                    {topCities.slice(0, 7).map((city, idx) => (
                      <HCell key={city.name} fill={city.color} />
                    ))}
                  </HBar>
                </HBarChart>
              </HResponsiveContainer>
            </CardBody>
          </Card>
        </HeroTooltip>
      </div>

      {/* New Charts Section (replacing Insights and Activity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Engagement Chart */}
        <Card className="bg-white border border-gray-100 rounded-xl p-0">
          <CardHeader className="flex items-center gap-2 px-6 pt-6 pb-2 bg-transparent">
            <Icon
              className="text-emerald-400"
              icon="solar:users-group-rounded-bold"
              width={18}
            />
            <span className="font-medium text-gray-700 text-sm">
              User Engagement
            </span>
          </CardHeader>
          <CardBody className="p-6 pt-2">
            <ResponsiveContainer height={300} width="100%">
              <AreaChart
                data={[
                  { time: "9AM", value: 30 },
                  { time: "10AM", value: 45 },
                  { time: "11AM", value: 60 },
                  { time: "12PM", value: 75 },
                  { time: "1PM", value: 65 },
                  { time: "2PM", value: 85 },
                  { time: "3PM", value: 90 },
                  { time: "4PM", value: 70 },
                  { time: "5PM", value: 50 }
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", color: "#64748b" }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", color: "#64748b" }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#f3f4f6",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Form Performance Metrics */}
        <Card className="bg-white border border-gray-100 rounded-xl p-0">
          <CardHeader className="flex items-center gap-2 px-6 pt-6 pb-2 bg-transparent">
            <Icon
              className="text-violet-400"
              icon="solar:chart-2-bold"
              width={18}
            />
            <span className="font-medium text-gray-700 text-sm">
              Form Performance Metrics
            </span>
          </CardHeader>
          <CardBody className="p-6 pt-2">
            <ResponsiveContainer height={300} width="100%">
              <BarChart
                data={[
                  { name: "Completion", value: 85 },
                  { name: "Response", value: 92 },
                  { name: "Accuracy", value: 88 },
                  { name: "Satisfaction", value: 90 }
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", color: "#64748b" }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", color: "#64748b" }}
                  tickFormatter={(value) => `${value}%`}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#f3f4f6",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Score"]}
                />
                <Bar
                  dataKey="value"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Response Time Distribution */}
        <Card className="bg-white border border-gray-100 rounded-xl p-0">
          <CardHeader className="flex items-center gap-2 px-6 pt-6 pb-2 bg-transparent">
            <Icon
              className="text-rose-400"
              icon="solar:clock-circle-bold"
              width={18}
            />
            <span className="font-medium text-gray-700 text-sm">
              Response Time Distribution
            </span>
          </CardHeader>
          <CardBody className="p-6 pt-2">
            <ResponsiveContainer height={300} width="100%">
              <LineChart
                data={[
                  { time: "Mon", value: 2.1 },
                  { time: "Tue", value: 1.8 },
                  { time: "Wed", value: 2.3 },
                  { time: "Thu", value: 1.9 },
                  { time: "Fri", value: 2.0 },
                  { time: "Sat", value: 2.2 },
                  { time: "Sun", value: 2.4 }
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", color: "#64748b" }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", color: "#64748b" }}
                  tickFormatter={(value) => `${value}m`}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#f3f4f6",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value} min`, "Time"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ fill: "#f43f5e", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#f43f5e" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Form Types Distribution */}
        <Card className="bg-white border border-gray-100 rounded-xl p-0">
          <CardHeader className="flex items-center gap-2 px-6 pt-6 pb-2 bg-transparent">
            <Icon
              className="text-amber-400"
              icon="solar:pie-chart-2-bold"
              width={18}
            />
            <span className="font-medium text-gray-700 text-sm">
              Form Types Distribution
            </span>
          </CardHeader>
          <CardBody className="p-6 pt-2">
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Feedback", value: 35 },
                    { name: "Survey", value: 25 },
                    { name: "Registration", value: 20 },
                    { name: "Application", value: 15 },
                    { name: "Other", value: 5 }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    "#f59e0b",
                    "#8b5cf6",
                    "#ec4899",
                    "#3b82f6",
                    "#10b981"
                  ].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#f3f4f6",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {[
                { name: "Feedback", color: "#f59e0b" },
                { name: "Survey", color: "#8b5cf6" },
                { name: "Registration", color: "#ec4899" },
                { name: "Application", color: "#3b82f6" },
                { name: "Other", color: "#10b981" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Enhanced Map Section */}
      <Card className="bg-white border border-gray-100 rounded-xl p-0">
        <CardHeader className="flex items-center justify-between px-6 pt-6 pb-2 bg-transparent">
          <div className="flex items-center gap-2">
            <Icon
              className="text-blue-400"
              icon="solar:map-bold-duotone"
              width={18}
            />
            <span className="font-medium text-gray-700 text-sm">
              Geographic Distribution
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="flat"
              className="text-gray-600"
              startContent={<Icon icon="solar:download-bold" width={16} />}
            >
              Export Data
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="text-gray-600"
              startContent={<Icon icon="solar:settings-bold" width={16} />}
            >
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-6 pt-2">
          <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-100">
            <MapComponent />
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {topCities.slice(0, 5).map((city, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: city.color }} />
                <span className="text-sm text-gray-600">{city.name}</span>
                <span className="text-sm font-medium text-gray-900">{city.value}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
