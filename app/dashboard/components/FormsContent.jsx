"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Badge, Input, Tabs, Tab, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dummyResponses = [
  { name: "Alice Smith", email: "alice@example.com", q1: "Very satisfied", q2: "Yes", q3: "Great support" },
  { name: "Bob Lee", email: "bob@example.com", q1: "Satisfied", q2: "No", q3: "Faster delivery" },
  { name: "Charlie Kim", email: "charlie@example.com", q1: "Neutral", q2: "Yes", q3: "More features" },
  { name: "Dana Wu", email: "dana@example.com", q1: "Very satisfied", q2: "Yes", q3: "Keep it up!" },
  { name: "Evan Tran", email: "evan@example.com", q1: "Dissatisfied", q2: "No", q3: "Better UI" },
  { name: "Fiona Patel", email: "fiona@example.com", q1: "Satisfied", q2: "Yes", q3: "More templates" },
  { name: "George Li", email: "george@example.com", q1: "Neutral", q2: "No", q3: "Mobile app" },
  { name: "Hannah Park", email: "hannah@example.com", q1: "Very satisfied", q2: "Yes", q3: "Excellent!" },
];

const FormsContent = ({ activeFormTab: initialActiveFormTab = "all" }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeFormTab, setActiveFormTab] = useState(initialActiveFormTab);
  const [selectedFormForResponses, setSelectedFormForResponses] = useState(null);
  const [responseFilters, setResponseFilters] = useState({ name: '', email: '', q1: [], q2: [], q3: '' });
  const [responsePage, setResponsePage] = useState(1);
  const rowsPerPage = 9;
  const [responsesTab, setResponsesTab] = useState("table");
  
  // Enhanced mock data with form creation dates and completion rates
  const mockForms = [
    { 
      id: 1, 
      name: "Customer Feedback Form", 
      responses: 134, 
      status: "active", 
      lastUpdated: "2h ago", 
      createdAt: "2023-12-10", 
      completionRate: 92,
      icon: "solar:chat-round-dots-bold-duotone",
      color: "blue"
    },
    { 
      id: 2, 
      name: "Event Registration", 
      responses: 89, 
      status: "active", 
      lastUpdated: "1d ago", 
      createdAt: "2023-11-28", 
      completionRate: 87,
      icon: "solar:calendar-mark-bold-duotone",
      color: "purple"
    },
    { 
      id: 3, 
      name: "Job Application", 
      responses: 56, 
      status: "draft", 
      lastUpdated: "5d ago", 
      createdAt: "2023-12-05", 
      completionRate: 0,
      icon: "solar:document-text-bold-duotone",
      color: "gray"
    },
    { 
      id: 4, 
      name: "Product Survey", 
      responses: 245, 
      status: "active", 
      lastUpdated: "1h ago", 
      createdAt: "2023-10-15", 
      completionRate: 76,
      icon: "solar:box-bold-duotone",
      color: "green"
    },
    { 
      id: 5, 
      name: "Newsletter Signup", 
      responses: 501, 
      status: "active", 
      lastUpdated: "3d ago", 
      createdAt: "2023-09-20", 
      completionRate: 95,
      icon: "solar:letter-bold-duotone",
      color: "amber"
    },
    { 
      id: 6, 
      name: "Contact Request", 
      responses: 23, 
      status: "draft", 
      lastUpdated: "1w ago", 
      createdAt: "2023-11-30", 
      completionRate: 0,
      icon: "solar:users-group-rounded-bold-duotone",
      color: "pink"
    },
  ];

  // Filter forms by status and search query
  const filteredForms = mockForms
    .filter(form => activeFormTab === "all" ? true : form.status === activeFormTab)
    .filter(form => form.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Sort forms based on the selected order
  const sortedForms = [...filteredForms].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "most-responses":
        return b.responses - a.responses;
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const statusColorMap = {
    active: "success",
    draft: "warning",
    archived: "default",
  };

  const handleCreateForm = () => {
    router.push("/dashboard/create");
  };

  const handleTabChange = (tab) => {
    setActiveFormTab(tab);
    // We still update the URL for bookmarking purposes, but we don't rely on it for filtering
    router.push(`/dashboard?tab=${tab}`, { scroll: false });
  };

  const getUniqueValues = (key) => Array.from(new Set(dummyResponses.map(r => r[key])));

  // For pagination, filter and slice the rows:
  const filteredRows = dummyResponses.filter(row =>
    (responseFilters.name === '' || row.name.toLowerCase().includes(responseFilters.name.toLowerCase())) &&
    (responseFilters.email === '' || row.email.toLowerCase().includes(responseFilters.email.toLowerCase())) &&
    (responseFilters.q1.length === 0 || responseFilters.q1.includes(row.q1)) &&
    (responseFilters.q2.length === 0 || responseFilters.q2.includes(row.q2)) &&
    (responseFilters.q3 === '' || row.q3.toLowerCase().includes(responseFilters.q3.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice((responsePage - 1) * rowsPerPage, responsePage * rowsPerPage);

  return (
    <>
      {selectedFormForResponses ? (
        <div className="w-full h-full min-h-[60vh]">
          <div className="flex items-center gap-3 mb-2">
            <Button isIconOnly variant="light" onClick={() => setSelectedFormForResponses(null)} className="rounded-full">
              <Icon icon="solar:arrow-left-linear" width={22} />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 mr-4">{selectedFormForResponses.name}</h1>
          </div>
          {/* Stat cards styled like analytics KPI cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                <Icon icon="solar:users-group-rounded-bold" width={22} />
              </div>
              <div className="text-xs text-gray-500 mb-1">Responses</div>
              <div className="text-2xl font-bold text-gray-900">{selectedFormForResponses.responses}</div>
            </Card>
            <Card className="bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                <Icon icon="solar:chart-bold-duotone" width={22} />
              </div>
              <div className="text-xs text-gray-500 mb-1">Completion Rate</div>
              <div className="text-2xl font-bold text-gray-900">{selectedFormForResponses.completionRate}%</div>
            </Card>
            <Card className="bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br from-gray-400 to-gray-300 text-white">
                <Icon icon="solar:clock-circle-bold" width={22} />
              </div>
              <div className="text-xs text-gray-500 mb-1">Last Updated</div>
              <div className="text-lg font-bold text-gray-900">{selectedFormForResponses.lastUpdated}</div>
            </Card>
            <Card className="bg-white border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white">
                <Icon icon="solar:clock-circle-bold" width={22} />
              </div>
              <div className="text-xs text-gray-500 mb-1">Avg. Time</div>
              <div className="text-2xl font-bold text-gray-900">2.4 min</div>
            </Card>
          </div>
          {/* Tabs and Export button in the same row */}
          <div className="flex items-center justify-between mb-4">
            <Tabs selectedKey={responsesTab} onSelectionChange={setResponsesTab} variant="solid" className="">
              <Tab key="table" title="Table" />
              <Tab key="charts" title="Charts" />
            </Tabs>
            <div className="flex gap-2">
              <Button
                variant="flat"
                className="bg-white border border-gray-100 text-gray-700 font-medium"
                startContent={<Icon icon="solar:export-bold" width={18} />} size="sm"
              >
                Export
              </Button>
              <Button
                variant="flat"
                className="bg-white border border-gray-100 text-gray-700 font-medium"
                startContent={<Icon icon="solar:close-circle-bold" width={18} />} size="sm"
                onClick={() => { setResponseFilters({ name: '', email: '', q1: [], q2: [], q3: '' }); setResponsePage(1); }}
              >
                Clear Filter
              </Button>
            </div>
          </div>
          {/* Tab content */}
          {responsesTab === "table" ? (
            <div className="w-full bg-white border border-green-200 rounded-xl">
              <div className="overflow-auto w-full" style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
                <table className="w-full border border-green-200 text-[14px] font-sans bg-transparent">
                  <thead className="sticky top-0 z-20">
                    <tr className="border-b border-green-100 text-sm font-semibold text-gray-800 bg-white">
                      <th className="border border-green-100 px-2 py-2">Name</th>
                      <th className="border border-green-100 px-2 py-2">Email</th>
                      <th className="border border-green-100 px-2 py-2">How satisfied?</th>
                      <th className="border border-green-100 px-2 py-2">Would recommend?</th>
                      <th className="border border-green-100 px-2 py-2">Feedback</th>
                    </tr>
                    <tr className="sticky top-[38px] z-10" style={{background: '#f6fbf4'}}>
                      <th className="border border-green-100 px-1 py-1">
                        <Input
                          size="sm"
                          placeholder="Filter Name"
                          value={responseFilters.name}
                          onChange={e => { setResponsePage(1); setResponseFilters(f => ({ ...f, name: e.target.value })); }}
                          className="w-full bg-[#f6fbf4]"
                        />
                      </th>
                      <th className="border border-green-100 px-1 py-1">
                        <Input
                          size="sm"
                          placeholder="Filter Email"
                          value={responseFilters.email}
                          onChange={e => { setResponsePage(1); setResponseFilters(f => ({ ...f, email: e.target.value })); }}
                          className="w-full bg-[#f6fbf4]"
                        />
                      </th>
                      <th className="border border-green-100 px-1 py-1">
                        <Select
                          size="sm"
                          placeholder="Filter Satisfaction"
                          selectionMode="multiple"
                          selectedKeys={responseFilters.q1}
                          onSelectionChange={keys => { setResponsePage(1); setResponseFilters(f => ({ ...f, q1: Array.from(keys) })); }}
                          className="w-full bg-[#f6fbf4]"
                        >
                          {getUniqueValues('q1').map(val => (
                            <SelectItem key={val}>{val}</SelectItem>
                          ))}
                        </Select>
                      </th>
                      <th className="border border-green-100 px-1 py-1">
                        <Select
                          size="sm"
                          placeholder="Filter Recommend"
                          selectionMode="multiple"
                          selectedKeys={responseFilters.q2}
                          onSelectionChange={keys => { setResponsePage(1); setResponseFilters(f => ({ ...f, q2: Array.from(keys) })); }}
                          className="w-full bg-[#f6fbf4]"
                        >
                          {getUniqueValues('q2').map(val => (
                            <SelectItem key={val}>{val}</SelectItem>
                          ))}
                        </Select>
                      </th>
                      <th className="border border-green-100 px-1 py-1">
                        <Input
                          size="sm"
                          placeholder="Filter Feedback"
                          value={responseFilters.q3}
                          onChange={e => { setResponsePage(1); setResponseFilters(f => ({ ...f, q3: e.target.value })); }}
                          className="w-full bg-[#f6fbf4]"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.map((row, idx) => (
                      <tr key={idx} className={
                        `${idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafb]'} border-b border-green-100 hover:bg-[#eaf6e6] transition-colors`}
                      >
                        <td className="border border-green-100 px-2 py-1">{row.name}</td>
                        <td className="border border-green-100 px-2 py-1">{row.email}</td>
                        <td className="border border-green-100 px-2 py-1">{row.q1}</td>
                        <td className="border border-green-100 px-2 py-1">{row.q2}</td>
                        <td className="border border-green-100 px-2 py-1">{row.q3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination controls */}
              <div className="flex justify-end items-center gap-2 mt-3 p-4">
                <Button size="sm" variant="flat" disabled={responsePage === 1} onClick={() => setResponsePage(p => Math.max(1, p - 1))}>Prev</Button>
                <span className="text-xs text-gray-500">Page {responsePage} of {totalPages}</span>
                <Button size="sm" variant="flat" disabled={responsePage === totalPages || totalPages === 0} onClick={() => setResponsePage(p => Math.min(totalPages, p + 1))}>Next</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bar chart for How satisfied? */}
              <Card className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="solar:chart-bold-duotone" width={20} className="text-blue-500" />
                  <span className="font-medium text-gray-700 text-sm">Satisfaction Distribution</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={Object.entries(dummyResponses.reduce((acc, r) => { acc[r.q1] = (acc[r.q1] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }))}>
                    <XAxis dataKey="name" style={{ fontSize: 13 }} />
                    <YAxis allowDecimals={false} style={{ fontSize: 13 }} />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              {/* Pie chart for Would recommend? */}
              <Card className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="solar:pie-chart-2-bold-duotone" width={20} className="text-indigo-500" />
                  <span className="font-medium text-gray-700 text-sm">Would Recommend</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={Object.entries(dummyResponses.reduce((acc, r) => { acc[r.q2] = (acc[r.q2] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#6366f1">
                      {Object.entries(dummyResponses.reduce((acc, r) => { acc[r.q2] = (acc[r.q2] || 0) + 1; return acc; }, {})).map(([name], idx) => (
                        <Cell key={name} fill={["#22c55e", "#f59e42"][idx % 2]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Enhanced Header with Search and Stats */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-100/50 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Icon icon="solar:documents-bold-duotone" className="text-indigo-500 mr-2" width={28} />
                  Your Forms
                </h2>
                <p className="text-gray-600 mt-1">Manage and track all your forms in one place</p>
              </div>
              <Button 
                color="primary" 
                startContent={<Icon icon="solar:add-circle-bold" />}
                onPress={handleCreateForm}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md hover:shadow-indigo-300/20 transition-all"
                size="lg"
              >
                Create New Form
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <Icon icon="solar:document-text-bold-duotone" className="text-indigo-600" width={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Total Forms</p>
                  <p className="text-xl font-bold text-gray-900">{mockForms.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Icon icon="solar:file-check-bold-duotone" className="text-green-600" width={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Active Forms</p>
                  <p className="text-xl font-bold text-gray-900">{mockForms.filter(f => f.status === "active").length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Icon icon="solar:users-group-rounded-bold-duotone" className="text-purple-600" width={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Total Responses</p>
                  <p className="text-xl font-bold text-gray-900">{mockForms.reduce((sum, form) => sum + form.responses, 0)}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Icon icon="solar:chart-bold-duotone" className="text-amber-600" width={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Avg. Completion</p>
                  <p className="text-xl font-bold text-gray-900">
                    {Math.round(mockForms.filter(f => f.completionRate > 0).reduce((sum, form) => sum + form.completionRate, 0) / 
                    mockForms.filter(f => f.completionRate > 0).length)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forms Card with Enhanced Filters */}
          <Card className="mb-8 shadow-sm border-0">
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                {/* Filter Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <Button 
                    variant={activeFormTab === "all" ? "solid" : "light"} 
                    color="default"
                    className={`rounded-lg ${activeFormTab === "all" ? "bg-white shadow-sm text-indigo-600" : "bg-transparent"}`}
                    onPress={() => handleTabChange("all")}
                  >
                    All Forms
                    <span className={`ml-1 text-xs ${activeFormTab === "all" ? "bg-indigo-100" : "bg-gray-200"} px-1.5 py-0.5 rounded-full`}>{mockForms.length}</span>
                  </Button>
                  <Button 
                    variant={activeFormTab === "active" ? "solid" : "light"} 
                    color="default"
                    className={`rounded-lg ${activeFormTab === "active" ? "bg-white shadow-sm text-indigo-600" : "bg-transparent"}`}
                    onPress={() => handleTabChange("active")}
                  >
                    <Icon icon="solar:check-circle-bold" className={`mr-1 ${activeFormTab === "active" ? "text-indigo-600" : ""}`} width={16} />
                    Active
                    <span className={`ml-1 text-xs ${activeFormTab === "active" ? "bg-indigo-100" : "bg-gray-200"} px-1.5 py-0.5 rounded-full`}>{mockForms.filter(f => f.status === "active").length}</span>
                  </Button>
                  <Button 
                    variant={activeFormTab === "draft" ? "solid" : "light"} 
                    color="default"
                    className={`rounded-lg ${activeFormTab === "draft" ? "bg-white shadow-sm text-indigo-600" : "bg-transparent"}`}
                    onPress={() => handleTabChange("draft")}
                  >
                    <Icon icon="solar:pen-bold" className={`mr-1 ${activeFormTab === "draft" ? "text-indigo-600" : ""}`} width={16} />
                    Drafts
                    <span className={`ml-1 text-xs ${activeFormTab === "draft" ? "bg-indigo-100" : "bg-gray-200"} px-1.5 py-0.5 rounded-full`}>{mockForms.filter(f => f.status === "draft").length}</span>
                  </Button>
                </div>
                
                {/* Search and Sort */}
                <div className="flex gap-2 w-full md:w-auto">
                  <Input
                    placeholder="Search forms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Icon icon="solar:magnifer-linear" className="text-gray-400" width={16} />}
                    className="max-w-xs"
                  />
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered" 
                        startContent={<Icon icon="solar:sort-by-time-linear" width={16} />}
                      >
                        Sort
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu 
                      selectedKeys={[sortOrder]}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0];
                        if (selectedKey) setSortOrder(selectedKey.toString());
                      }}
                      selectionMode="single"
                    >
                      <DropdownItem key="newest">Newest First</DropdownItem>
                      <DropdownItem key="oldest">Oldest First</DropdownItem>
                      <DropdownItem key="most-responses">Most Responses</DropdownItem>
                      <DropdownItem key="alphabetical">Alphabetical</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {/* Forms Table with Enhanced Design */}
              {sortedForms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Icon icon="solar:documents-minimalistic-linear" className="text-gray-400" width={32} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No forms found</h3>
                  <p className="text-gray-500 text-center mb-6">
                    {searchQuery ? `No forms match '${searchQuery}'` : "You don't have any forms yet in this category."}
                  </p>
                  <Button 
                    color="primary" 
                    startContent={<Icon icon="solar:add-circle-bold" />}
                    onPress={handleCreateForm}
                  >
                    Create Your First Form
                  </Button>
                </div>
              ) : (
                <Table aria-label="Forms table" className="border-collapse">
                  <TableHeader>
                    <TableColumn className="text-xs uppercase">FORM NAME</TableColumn>
                    <TableColumn className="text-xs uppercase text-center">RESPONSES</TableColumn>
                    <TableColumn className="text-xs uppercase text-center">COMPLETION RATE</TableColumn>
                    <TableColumn className="text-xs uppercase">STATUS</TableColumn>
                    <TableColumn className="text-xs uppercase">LAST UPDATED</TableColumn>
                    <TableColumn className="text-xs uppercase text-right">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {sortedForms.map((form) => (
                      <TableRow key={form.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg bg-${form.color}-100 flex items-center justify-center mr-3`}>
                              <Icon icon={form.icon} className={`text-${form.color}-500`} width={20} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 hover:underline cursor-pointer" onClick={() => setSelectedFormForResponses(form)}>{form.name}</p>
                              <p className="text-xs text-gray-500">Created on {new Date(form.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-semibold text-gray-900">{form.responses}</span>
                        </TableCell>
                        <TableCell>
                          {form.status === "draft" ? (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-xs text-gray-500">Not published</span>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                                  <div 
                                    className={`bg-${form.completionRate > 80 ? 'green' : form.completionRate > 50 ? 'blue' : 'amber'}-500 h-2 rounded-full`} 
                                    style={{ width: `${form.completionRate}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium">{form.completionRate}%</span>
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`inline-block rounded-full h-2.5 w-2.5 mr-2 ${form.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                            <span className="capitalize text-gray-700">{form.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-500">{form.lastUpdated}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 justify-end">
                            <Tooltip content="Edit form">
                              <Button isIconOnly size="sm" variant="flat" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                                <Icon icon="solar:pen-bold" width={16} />
                              </Button>
                            </Tooltip>
                            <Tooltip content="View responses">
                              <Button isIconOnly size="sm" variant="flat" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                <Icon icon="solar:eye-bold" width={16} />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Share form">
                              <Button isIconOnly size="sm" variant="flat" className="bg-green-100 text-green-700 hover:bg-green-200">
                                <Icon icon="solar:share-bold" width={16} />
                              </Button>
                            </Tooltip>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="flat" className="bg-gray-100 hover:bg-gray-200">
                                  <Icon icon="solar:menu-dots-bold" width={16} />
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu>
                                <DropdownItem
                                  startContent={<Icon icon="solar:copy-bold" width={16} className="text-gray-500" />}
                                >
                                  Duplicate
                                </DropdownItem>
                                <DropdownItem
                                  startContent={<Icon icon="solar:export-bold" width={16} className="text-gray-500" />}
                                >
                                  Export Responses
                                </DropdownItem>
                                <DropdownItem
                                  startContent={<Icon icon="solar:code-bold" width={16} className="text-gray-500" />}
                                >
                                  Embed
                                </DropdownItem>
                                <DropdownItem 
                                  className="text-danger" 
                                  color="danger"
                                  startContent={<Icon icon="solar:trash-bin-trash-bold" width={16} className="text-danger" />}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>

          {/* Enhanced Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Activity Card with Timeline Design */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Icon icon="solar:clock-circle-bold" className="text-indigo-500 mr-2" width={18} />
                    Recent Activity
                  </h3>
                  <Button variant="flat" size="sm" endContent={<Icon icon="solar:arrow-right-linear" width={14} />}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="relative pl-8 py-3 pr-6">
                  {/* Timeline connector line */}
                  <div className="absolute top-0 bottom-0 left-8 w-px bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                        <Icon icon="solar:user-check-rounded-bold" className="text-white" width={12} />
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 ml-4 border border-blue-100">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-gray-900">New response on "Customer Feedback Form"</p>
                          <Badge color="primary" variant="flat" size="sm">New</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">From: john.doe@example.com</p>
                          <p className="text-xs text-gray-500">10 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                        <Icon icon="solar:chart-bold" className="text-white" width={12} />
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 ml-4 border border-green-100">
                        <p className="text-sm font-medium text-gray-900 mb-1">Weekly analytics report is ready</p>
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
                        <Icon icon="solar:pen-bold" className="text-white" width={12} />
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 ml-4 border border-purple-100">
                        <p className="text-sm font-medium text-gray-900 mb-1">You edited "Event Registration" form</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">5 fields modified</p>
                          <p className="text-xs text-gray-500">Yesterday at 4:30 PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center transform -translate-x-1/2 z-10 border-2 border-white">
                        <Icon icon="solar:add-square-bold" className="text-white" width={12} />
                      </div>
                      <div className="bg-amber-50 rounded-lg p-4 ml-4 border border-amber-100">
                        <p className="text-sm font-medium text-gray-900 mb-1">New form "Product Survey" created</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">15 questions added</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Performance Card with Better Visualization */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium flex items-center">
                    <Icon icon="solar:graph-new-bold" className="text-indigo-500 mr-2" width={18} />
                    Form Performance
                  </h3>
                  <div className="flex items-center gap-2 ml-5">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          variant="flat" 
                          className="bg-white border border-gray-200"
                          endContent={<Icon icon="solar:alt-arrow-down-bold" width={12} />}
                          size="sm"
                        >
                          Last 7 days
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Time period options">
                        <DropdownItem key="7days">Last 7 days</DropdownItem>
                        <DropdownItem key="30days">Last 30 days</DropdownItem>
                        <DropdownItem key="month">This month</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button variant="flat" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Responses</p>
                        <p className="text-2xl font-bold text-gray-900">1,048</p>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Icon icon="solar:users-group-rounded-bold" className="text-blue-600" width={18} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
                        <Icon icon="solar:arrow-up-bold" width={12} />
                        12% from last week
                      </span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Completion Rate</p>
                        <p className="text-2xl font-bold text-gray-900">87%</p>
                      </div>
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Icon icon="solar:check-circle-bold" className="text-green-600" width={18} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
                        <Icon icon="solar:arrow-up-bold" width={12} />
                        3% from last week
                      </span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-gray-900">2:45</p>
                      </div>
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Icon icon="solar:clock-circle-bold" className="text-purple-600" width={18} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-red-600 font-medium flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded-full">
                        <Icon icon="solar:arrow-down-bold" width={12} />
                        10% from last week
                      </span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Active Forms</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <div className="bg-amber-500/10 p-2 rounded-lg">
                        <Icon icon="solar:file-check-bold" className="text-amber-600" width={18} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                        No change
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Top Performing Forms Bar Chart */}
                <div className="mt-8">
                  <h4 className="text-sm font-medium mb-4">Top Performing Forms</h4>
                  <div className="space-y-4">
                    {mockForms
                      .filter(form => form.status === "active")
                      .sort((a, b) => b.responses - a.responses)
                      .slice(0, 3)
                      .map((form) => (
                        <div key={form.id} className="relative pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-md bg-${form.color}-100 flex items-center justify-center mr-2`}>
                                <Icon icon={form.icon} className={`text-${form.color}-500`} width={12} />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{form.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{form.responses}</span>
                          </div>
                          <div className="overflow-hidden h-2 mb-2 text-xs flex rounded-full bg-gray-200">
                            <div 
                              style={{ width: `${(form.responses / Math.max(...mockForms.map(f => f.responses))) * 100}%` }} 
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${form.color}-500`}
                            ></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat"
                      className="text-xs"
                      endContent={<Icon icon="solar:arrow-right-bold" width={14} />}
                    >
                      View Full Analytics
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default FormsContent; 