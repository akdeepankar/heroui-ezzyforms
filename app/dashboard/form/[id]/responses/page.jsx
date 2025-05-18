'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

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

export default function FormResponsesPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const formId = params?.id || "";
  const formTitle = searchParams.get("title") || `Form #${formId}`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col min-h-screen">
        <div className="flex items-center gap-2 mb-8">
          <Button isIconOnly variant="light" onClick={() => router.push('/dashboard')} className="rounded-full">
            <Icon icon="solar:arrow-left-linear" width={22} />
          </Button>
          <span className="text-lg font-bold text-indigo-700">Dashboard</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Button variant="light" className="justify-start" startContent={<Icon icon="solar:home-2-bold" width={18} />}
            onClick={() => router.push('/dashboard')}>Overview</Button>
          <Button variant="solid" color="primary" className="justify-start" startContent={<Icon icon="solar:eye-bold" width={18} />}>Responses</Button>
          <Button variant="light" className="justify-start" startContent={<Icon icon="solar:settings-bold" width={18} />}>Settings</Button>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{formTitle} - Responses</h1>
        <Card>
          <CardBody>
            <div className="overflow-x-auto">
              <Table aria-label="Form responses table" className="min-w-[700px]">
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Email</TableColumn>
                  <TableColumn>How satisfied?</TableColumn>
                  <TableColumn>Would recommend?</TableColumn>
                  <TableColumn>Feedback</TableColumn>
                </TableHeader>
                <TableBody>
                  {dummyResponses.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.q1}</TableCell>
                      <TableCell>{row.q2}</TableCell>
                      <TableCell>{row.q3}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 