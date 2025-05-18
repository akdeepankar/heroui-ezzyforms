"use client";

import React from "react";
import { Card, CardBody, Spacer, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

const stats = [
  { label: "Active users", value: "50K+", icon: "solar:user-check-rounded-bold-duotone", color: "blue" },
  { label: "Forms created", value: "1M+", icon: "solar:document-add-bold-duotone", color: "indigo" },
  { label: "Data collected", value: "25M+", icon: "solar:database-bold-duotone", color: "purple" },
  { label: "Customer satisfaction", value: "99%", icon: "solar:emoji-happy-bold-duotone", color: "emerald" }
];

const reasons = [
  {
    title: "User-friendly Interface",
    description: "Our intuitive design empowers users of all technical backgrounds to create sophisticated forms without any coding knowledge.",
    icon: "solar:magic-stick-3-bold-duotone",
    color: "blue"
  },
  {
    title: "Powerful Integrations",
    description: "Streamline your workflow by connecting with 100+ productivity tools like Google Workspace, Microsoft 365, Slack, Zapier, and more.",
    icon: "solar:plug-circle-bold-duotone",
    color: "indigo"
  },
  {
    title: "Enterprise Security",
    description: "Rest easy with SOC 2 compliance, bank-level encryption, regular penetration testing, and comprehensive data protection policies.",
    icon: "solar:lock-password-bold-duotone",
    color: "emerald"
  }
];

export default function About() {
  return (
    <div className="space-y-20">
      {/* Stats Section */}
      <div>
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-50 rounded-full blur-xl opacity-80 z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-50 rounded-full blur-xl opacity-80 z-0"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="border border-gray-200 bg-white hover:border-blue-200 transition-all hover:shadow-md overflow-hidden group"
                style={{ borderRadius: "16px" }}
              >
                <CardBody className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-${stat.color}-50 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                    <Icon icon={stat.icon} width={32} className={`text-${stat.color}-500`} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div>
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Why businesses choose EzzyForms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="border border-gray-200 bg-white hover:shadow-md transition-all overflow-hidden"
              style={{ borderRadius: "16px" }}
            >
              <CardBody className="p-8">
                <div className={`w-14 h-14 rounded-full bg-${reason.color}-50 flex items-center justify-center mb-6`}>
                  <Icon icon={reason.icon} width={28} className={`text-${reason.color}-500`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Testimonial Section */}
      <Card 
        className="border border-gray-200 overflow-hidden bg-white"
        style={{ borderRadius: "16px" }}
      >
        <CardBody className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Testimonial content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} icon="solar:star-bold" className="text-amber-400" width={20} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">5.0 rating</span>
              </div>
              
              <Icon icon="solar:quote-bold" width={48} className="text-blue-200 mb-4" />
              <p className="text-xl text-gray-800 font-medium leading-relaxed mb-6">
                "EzzyForms has completely transformed how we collect and process customer data. The intuitive interface saved us countless hours of development time, and the analytics provide insights we never had before."
              </p>
              
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Sarah Thompson</h4>
                <p className="text-gray-600">Director of Digital Marketing, TechCorp</p>
              </div>
            </div>
            
            {/* Image section with gradient overlay */}
            <div className="relative h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Team collaboration" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">Join 5,000+ teams</h3>
                <p className="text-center text-white/90 mb-6">Companies of all sizes trust EzzyForms for their data collection needs</p>
                <div className="grid grid-cols-3 gap-6">
                  {['Google', 'Microsoft', 'Airbnb', 'Dropbox', 'Spotify', 'Slack'].map((company, idx) => (
                    <div key={idx} className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                      <p className="text-sm font-medium text-white text-center">{company}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 