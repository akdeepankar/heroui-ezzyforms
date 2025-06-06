"use client";

import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { Button, Input } from "@heroui/react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Templates", href: "#templates" },
      { label: "Integrations", href: "#integrations" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "/careers" },
      { label: "Legal", href: "/legal" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { icon: "mdi:github", href: "https://github.com", label: "GitHub" },
  { icon: "mdi:twitter", href: "https://twitter.com", label: "Twitter" },
  { icon: "mdi:linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "mdi:facebook", href: "https://facebook.com", label: "Facebook" },
  { icon: "mdi:instagram", href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto">
        {/* Newsletter section */}
        <div className="py-12 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Stay up to date
              </h3>
              <p className="text-gray-600 max-w-md">
                Get the latest news, product updates, and exclusive offers from
                EzzyForms delivered to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                className="sm:flex-1"
                classNames={{
                  input: "h-11",
                  inputWrapper: "border-gray-300 shadow-sm",
                }}
                placeholder="Enter your email address"
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
              <Button className="font-medium h-11" color="primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
            {/* Brand section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
                <span className="font-bold text-xl text-gray-900">
                  EzzyForms
                </span>
              </div>

              <p className="text-gray-600 mb-6 max-w-md">
                The professional platform for creating beautiful forms,
                collecting responses, and analyzing data with powerful insights.
              </p>

              <div className="flex gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    isExternal
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    href={social.href}
                    title={social.label}
                  >
                    <Icon
                      className="text-gray-600"
                      icon={social.icon}
                      width={20}
                    />
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Icon
                  className="text-blue-500"
                  icon="solar:shield-check-bold-duotone"
                  width={16}
                />
                <span>SOC 2 Type II Certified</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <Icon
                  className="text-blue-500"
                  icon="solar:lock-keyhole-bold-duotone"
                  width={16}
                />
                <span>GDPR & HIPAA Compliant</span>
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-5">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        color="foreground"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon
                    className="text-gray-600 mt-1"
                    icon="solar:map-point-linear"
                    width={16}
                  />
                  <span className="text-gray-600">
                    123 Innovation Blvd, San Francisco, CA 94107
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    className="text-gray-600"
                    icon="solar:phone-linear"
                    width={16}
                  />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    className="text-gray-600"
                    icon="solar:letter-linear"
                    width={16}
                  />
                  <span className="text-gray-600">support@ezzyforms.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-gray-50 py-6 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} EzzyForms Inc. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              className="text-sm text-gray-500 hover:text-blue-600"
              color="foreground"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-blue-600"
              color="foreground"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-blue-600"
              color="foreground"
              href="/cookies"
            >
              Cookie Policy
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-blue-600"
              color="foreground"
              href="/accessibility"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
