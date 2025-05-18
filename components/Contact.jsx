"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const contactInfo = [
  {
    icon: "solar:map-point-bold-duotone",
    title: "Headquarters",
    details:
      "123 Innovation Boulevard, Tech District, San Francisco, CA 94107, USA",
    color: "blue",
  },
  {
    icon: "solar:phone-bold-duotone",
    title: "Customer Support",
    details: "+1 (555) 123-4567",
    color: "indigo",
  },
  {
    icon: "solar:letter-bold-duotone",
    title: "Email Inquiries",
    details: "support@ezzyforms.com",
    color: "purple",
  },
];

export default function Contact() {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-70 z-0" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-70 z-0" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
        {/* Contact Form */}
        <Card
          className="lg:col-span-3 border border-gray-200 bg-white overflow-hidden shadow-sm"
          style={{ borderRadius: "16px" }}
        >
          <CardBody className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon
                  className="text-blue-500"
                  icon="solar:chat-round-dots-bold-duotone"
                  width={20}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Send us a message
                </h3>
                <p className="text-gray-600">
                  We&apos;ll respond within 24 hours
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  classNames={{
                    label: "font-medium text-gray-700 mb-1",
                    input: "h-11",
                    inputWrapper: "shadow-sm",
                  }}
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="Enter your first name"
                  radius="sm"
                  variant="bordered"
                />

                <Input
                  classNames={{
                    label: "font-medium text-gray-700 mb-1",
                    input: "h-11",
                    inputWrapper: "shadow-sm",
                  }}
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Enter your last name"
                  radius="sm"
                  variant="bordered"
                />
              </div>

              <Input
                classNames={{
                  label: "font-medium text-gray-700 mb-1",
                  input: "h-11",
                  inputWrapper: "shadow-sm",
                }}
                label="Email Address"
                labelPlacement="outside"
                placeholder="yourname@example.com"
                radius="sm"
                startContent={
                  <Icon
                    className="text-gray-400"
                    icon="solar:letter-linear"
                    width={18}
                  />
                }
                type="email"
                variant="bordered"
              />

              <Input
                classNames={{
                  label: "font-medium text-gray-700 mb-1",
                  input: "h-11",
                  inputWrapper: "shadow-sm",
                }}
                label="Subject"
                labelPlacement="outside"
                placeholder="How can we help you?"
                radius="sm"
                variant="bordered"
              />

              <Textarea
                classNames={{
                  label: "font-medium text-gray-700 mb-1",
                  input: "h-11",
                  inputWrapper: "shadow-sm",
                }}
                label="Message"
                labelPlacement="outside"
                minRows={5}
                placeholder="Type your message here..."
                radius="sm"
                variant="bordered"
              />

              <Checkbox defaultSelected size="sm">
                <span className="text-sm text-gray-600">
                  I agree to receive marketing communications from EzzyForms
                </span>
              </Checkbox>
            </div>
          </CardBody>

          <CardFooter className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end">
            <Button
              className="font-medium px-6"
              color="primary"
              startContent={<Icon icon="solar:send-bold" width={18} />}
            >
              Send Message
            </Button>
          </CardFooter>
        </Card>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            className="border border-gray-200 bg-white overflow-hidden shadow-sm"
            style={{ borderRadius: "16px" }}
          >
            <CardBody className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-${item.color}-50 flex items-center justify-center shrink-0`}
                    >
                      <Icon
                        className={`text-${item.color}-500`}
                        icon={item.icon}
                        width={22}
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card
            className="border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden shadow-sm"
            style={{ borderRadius: "16px" }}
          >
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon
                    className="text-blue-500"
                    icon="solar:clock-circle-bold-duotone"
                    width={20}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Business Hours
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-blue-100/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-blue-500"
                      icon="solar:calendar-bold-duotone"
                      width={18}
                    />
                    <span className="font-medium text-gray-800">
                      Monday - Friday
                    </span>
                  </div>
                  <span className="font-medium text-blue-700">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-100/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-blue-500"
                      icon="solar:calendar-bold-duotone"
                      width={18}
                    />
                    <span className="font-medium text-gray-800">Saturday</span>
                  </div>
                  <span className="font-medium text-blue-700">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-blue-500"
                      icon="solar:calendar-bold-duotone"
                      width={18}
                    />
                    <span className="font-medium text-gray-800">Sunday</span>
                  </div>
                  <span className="font-medium">Closed</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-100/50">
                <p className="text-sm text-gray-700">
                  All times displayed are in Pacific Time (PT).
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
