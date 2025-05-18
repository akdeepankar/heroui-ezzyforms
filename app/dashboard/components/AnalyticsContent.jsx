"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip as RechartsTooltip, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, AreaChart, Area, CartesianGrid } from "recharts";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
  Tooltip as HeroTooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { BarChart as HBarChart, Bar as HBar, XAxis as HXAxis, YAxis as HYAxis, Tooltip as HTooltip, ResponsiveContainer as HResponsiveContainer, Cell as HCell } from 'recharts';

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
    { name: "Jan", rate: 0.80 },
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
    { name: "Jan", rate: 0.70 },
    { name: "Feb", rate: 0.73 },
    { name: "Mar", rate: 0.76 },
    { name: "Apr", rate: 0.79 },
    { name: "May", rate: 0.77 },
    { name: "Jun", rate: 0.82 },
  ],
};

const kpiDataMap = {
  "All Forms": [
    { name: "Completion Rate", value: 86, fill: "#22c55e", total: 100, unit: "%", icon: "solar:check-circle-bold-duotone", color: "from-green-400 to-emerald-500" },
    { name: "Avg. Time (min)", value: 2.6, fill: "#6366f1", total: 10, unit: "min", icon: "solar:clock-circle-bold-duotone", color: "from-indigo-400 to-blue-500" },
    { name: "Abandonment Rate", value: 14, fill: "#ef4444", total: 100, unit: "%", icon: "solar:close-circle-bold-duotone", color: "from-rose-400 to-red-500" },
  ],
  Feedback: [
    { name: "Completion Rate", value: 82, fill: "#22c55e", total: 100, unit: "%", icon: "solar:check-circle-bold-duotone", color: "from-green-400 to-emerald-500" },
    { name: "Avg. Time (min)", value: 2.2, fill: "#6366f1", total: 10, unit: "min", icon: "solar:clock-circle-bold-duotone", color: "from-indigo-400 to-blue-500" },
    { name: "Abandonment Rate", value: 18, fill: "#ef4444", total: 100, unit: "%", icon: "solar:close-circle-bold-duotone", color: "from-rose-400 to-red-500" },
  ],
  Survey: [
    { name: "Completion Rate", value: 79, fill: "#22c55e", total: 100, unit: "%", icon: "solar:check-circle-bold-duotone", color: "from-green-400 to-emerald-500" },
    { name: "Avg. Time (min)", value: 3.1, fill: "#6366f1", total: 10, unit: "min", icon: "solar:clock-circle-bold-duotone", color: "from-indigo-400 to-blue-500" },
    { name: "Abandonment Rate", value: 21, fill: "#ef4444", total: 100, unit: "%", icon: "solar:close-circle-bold-duotone", color: "from-rose-400 to-red-500" },
  ],
  Registration: [
    { name: "Completion Rate", value: 88, fill: "#22c55e", total: 100, unit: "%", icon: "solar:check-circle-bold-duotone", color: "from-green-400 to-emerald-500" },
    { name: "Avg. Time (min)", value: 2.0, fill: "#6366f1", total: 10, unit: "min", icon: "solar:clock-circle-bold-duotone", color: "from-indigo-400 to-blue-500" },
    { name: "Abandonment Rate", value: 12, fill: "#ef4444", total: 100, unit: "%", icon: "solar:close-circle-bold-duotone", color: "from-rose-400 to-red-500" },
  ],
  Application: [
    { name: "Completion Rate", value: 84, fill: "#22c55e", total: 100, unit: "%", icon: "solar:check-circle-bold-duotone", color: "from-green-400 to-emerald-500" },
    { name: "Avg. Time (min)", value: 2.8, fill: "#6366f1", total: 10, unit: "min", icon: "solar:clock-circle-bold-duotone", color: "from-indigo-400 to-blue-500" },
    { name: "Abandonment Rate", value: 16, fill: "#ef4444", total: 100, unit: "%", icon: "solar:close-circle-bold-duotone", color: "from-rose-400 to-red-500" },
  ],
  Signup: [
    { name: "Completion Rate", value: 90, fill: "#22c55e", total: 100, unit: "%", icon: "solar:check-circle-bold-duotone", color: "from-green-400 to-emerald-500" },
    { name: "Avg. Time (min)", value: 1.7, fill: "#6366f1", total: 10, unit: "min", icon: "solar:clock-circle-bold-duotone", color: "from-indigo-400 to-blue-500" },
    { name: "Abandonment Rate", value: 10, fill: "#ef4444", total: 100, unit: "%", icon: "solar:close-circle-bold-duotone", color: "from-rose-400 to-red-500" },
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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
  { name: "San Jose", value: 74, color: "#eab308" }
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
      {/* Minimal Banner/Header */}
      <div className="mb-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-xl p-6 md:p-8 relative overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="mb-4 md:mb-0 flex items-center gap-3">
            <Icon icon="solar:graph-new-bold-duotone" className="text-indigo-400" width={28} />
            <h2 className="text-xl font-semibold text-gray-900">Form Analytics</h2>
          </div>
                <Button 
                  variant="flat" 
            className="bg-white text-indigo-600 font-medium border border-gray-100"
            startContent={<Icon icon="solar:export-bold" width={18} />}
          >
            Export
          </Button>
        </div>
      </div>
      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {kpis.map((item, idx) => (
          <HeroTooltip key={idx} content={
            item.name === "Completion Rate" ? "Percentage of users who completed the form."
            : item.name === "Avg. Time (min)" ? "Average time taken to complete the form."
            : "Percentage of users who started but did not finish the form."
          } placement="top">
            <Card className="bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6 cursor-help">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br ${item.color} text-white`}>
                <Icon icon={item.icon} width={22} />
              </div>
              <div className="text-xs text-gray-500 mb-1">{item.name}</div>
              <div className="text-2xl font-bold text-gray-900">{formatKPI(item.value, item.unit)}</div>
            </Card>
          </HeroTooltip>
        ))}
      </div>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
        <div className="flex gap-2 items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="min-w-[120px] bg-gray-50 text-gray-700 border border-gray-100">
                {dateRanges.find(r => r.value === selectedRange)?.label}
                <Icon icon="solar:alt-arrow-down-linear" className="ml-2 text-gray-400" width={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Time period options" onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0];
                if (selectedKey) setSelectedRange(selectedKey.toString());
              }} selectedKeys={[selectedRange]}>
                {dateRanges.map(range => (
                  <DropdownItem key={range.value}>{range.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="min-w-[120px] bg-gray-50 text-gray-700 border border-gray-100">
                {selectedForm}
                <Icon icon="solar:alt-arrow-down-linear" className="ml-2 text-gray-400" width={16} />
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Form options" onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0];
              if (selectedKey) setSelectedForm(selectedKey.toString());
            }} selectedKeys={[selectedForm]}>
              {allForms.map(form => (
                <DropdownItem key={form}>{form}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <span className="text-xs text-gray-400">* All data is mock for demo</span>
      </div>
      {/* Two-column grid for main charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pie (Doughnut) Chart: Submission Sources */}
        <HeroTooltip content="Distribution of form submissions by source." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon icon="solar:pie-chart-2-bold-duotone" className="text-indigo-400" width={18} />
              <span className="font-medium text-gray-700 text-sm">Submission Sources</span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={submissionSources}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    fill="#6366f1"
                    paddingAngle={2}
                  >
                    {submissionSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#6366f1", "#06b6d4", "#f59e42", "#3b82f6"][index % 4]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {submissionSources.map((src, i) => (
                  <span key={src.name} className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: ["#6366f1", "#06b6d4", "#f59e42", "#3b82f6"][i % 4] }}></span>
                    {src.name}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Doughnut Chart: Device Distribution */}
        <HeroTooltip content="Device types used to submit forms." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon icon="solar:devices-bold-duotone" className="text-cyan-400" width={18} />
              <span className="font-medium text-gray-700 text-sm">Device Distribution</span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={deviceDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    fill="#06b6d4"
                    paddingAngle={2}
                  >
                    {deviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#06b6d4", "#6366f1", "#f59e42"][index % 3]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {deviceDistribution.map((dev, i) => (
                  <span key={dev.name} className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: ["#06b6d4", "#6366f1", "#f59e42"][i % 3] }}></span>
                    {dev.name}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Bar Chart: Form Revenue by Week */}
        <HeroTooltip content="Weekly revenue generated by forms." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon icon="solar:bar-chart-bold-duotone" className="text-blue-400" width={18} />
              <span className="font-medium text-gray-700 text-sm">Form Revenue by Week</span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={revenue}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: "12px", fontWeight: 500, color: "#64748b" }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    style={{ fontSize: "12px", fontWeight: 500, color: "#64748b" }}
                  />
                  <RechartsTooltip
                    formatter={(value) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#f3f4f6",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#6366f1" 
                    radius={[4, 4, 0, 0]}
                    barSize={24}
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
              <Icon icon="solar:chart-bold-duotone" className="text-purple-400" width={18} />
              <span className="font-medium text-gray-700 text-sm">Submissions Trend</span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={trend} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "12px", color: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} style={{ fontSize: "12px", color: "#64748b" }} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#f3f4f6", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Area Chart: Response Rate */}
        <HeroTooltip content="Monthly response rate for forms." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon icon="solar:activity-bold-duotone" className="text-green-400" width={18} />
              <span className="font-medium text-gray-700 text-sm">Response Rate</span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={response} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "12px", color: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${Math.round(v * 100)}%`} style={{ fontSize: "12px", color: "#64748b" }} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#f3f4f6", borderRadius: "8px" }} formatter={v => `${Math.round(v * 100)}%`} />
                  <Area type="monotone" dataKey="rate" stroke="#22c55e" fill="#bbf7d0" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </HeroTooltip>
        {/* Horizontal Bar Chart: Top Cities by Submissions */}
        <HeroTooltip content="Top cities by number of form submissions." placement="top">
          <Card className="bg-white border border-gray-100 rounded-xl p-0 cursor-help">
            <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
              <Icon icon="solar:city-bold-duotone" className="text-amber-400" width={18} />
              <span className="font-medium text-gray-700 text-sm">Top Cities by Submissions</span>
            </CardHeader>
            <CardBody className="p-5 pt-2">
              <HResponsiveContainer width="100%" height={180}>
                <HBarChart
                  layout="vertical"
                  data={topCities.slice(0, 7)}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <HYAxis type="category" dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "12px", color: "#64748b" }} width={80} />
                  <HXAxis type="number" axisLine={false} tickLine={false} style={{ fontSize: "12px", color: "#64748b" }} />
                  <HTooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#f3f4f6", borderRadius: "8px" }} formatter={v => `${v} submissions`} />
                  <HBar dataKey="value" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={16}>
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
      {/* Minimal Map Section */}
      <Card className="bg-white border border-gray-100 rounded-xl p-0">
        <CardHeader className="flex items-center gap-2 px-5 pt-5 pb-2 bg-transparent">
          <Icon icon="solar:map-bold-duotone" className="text-blue-400" width={18} />
          <span className="font-medium text-gray-700 text-sm">Geographic Distribution</span>
          <HeroTooltip content="Hover a marker to see city and submissions." placement="top">
            <Icon icon="solar:info-circle-bold" className="ml-2 text-gray-400" width={16} />
          </HeroTooltip>
        </CardHeader>
        <CardBody className="p-5 pt-2">
          <div className="w-full h-72 rounded-lg overflow-hidden">
              <MapComponent />
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 