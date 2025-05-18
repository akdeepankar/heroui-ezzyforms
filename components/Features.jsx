'use client';

import React from "react";
import { Card, CardBody, CardFooter, Badge } from "@heroui/react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

const featureItems = [
  {
    icon: "solar:widget-add-bold-duotone",
    title: "Intuitive Form Builder",
    description: "Design professional forms with our intuitive drag & drop interface. No coding skills required.",
    color: "blue",
    badge: "Popular"
  },
  {
    icon: "solar:chart-line-bold-duotone",
    title: "Advanced Analytics",
    description: "Transform raw data into actionable insights with comprehensive analytics and visualization tools.",
    color: "indigo"
  },
  {
    icon: "solar:devices-bold-duotone",
    title: "Responsive Design",
    description: "Create forms that look perfect on any device with automatic responsive adjustments.",
    color: "purple"
  },
  {
    icon: "solar:shield-check-bold-duotone",
    title: "Enterprise Security",
    description: "Bank-grade security with GDPR compliance, end-to-end encryption, and regular security audits.",
    color: "emerald",
    badge: "New"
  },
  {
    icon: "solar:finger-print-minimalistic-bold-duotone",
    title: "Custom Branding",
    description: "Align forms with your brand using custom colors, logos, fonts, and white-labeled domains.",
    color: "amber"
  },
  {
    icon: "solar:upload-square-bold-duotone",
    title: "Smart Integrations",
    description: "Seamlessly connect with 100+ tools including Google Sheets, Zapier, Slack, and more.",
    color: "rose"
  }
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featureItems.map((feature, index) => (
        <Card 
          key={index} 
          className="border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg overflow-hidden bg-white group"
          style={{
            borderRadius: "16px",
          }}
        >
          <CardBody className="p-8 flex flex-col gap-5">
            <div className={`w-14 h-14 rounded-xl bg-${feature.color}-50 flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Icon 
                icon={feature.icon} 
                className={`text-${feature.color}-500`} 
                width={28} 
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-xl text-gray-900">{feature.title}</h3>
                {feature.badge && (
                  <Badge color={feature.color} variant="flat" size="sm" className="font-medium">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </CardBody>
          
          <CardFooter className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <Button 
              variant="light" 
              color={feature.color}
              fullWidth
              endContent={<Icon icon="solar:arrow-right-linear" />}
              className="font-medium"
            >
              Learn more
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
