"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Badge,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const TemplatesContent = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Template categories
  const categories = [
    { id: "all", name: "All Templates", count: 42 },
    { id: "survey", name: "Surveys", count: 12 },
    { id: "forms", name: "Forms", count: 15 },
    { id: "registration", name: "Registration", count: 8 },
    { id: "feedback", name: "Feedback", count: 7 },
  ];

  // Enhanced templates data with visual previews and more metadata
  const templates = [
    {
      id: 1,
      name: "Customer Feedback",
      category: "feedback",
      questions: 12,
      uses: 1234,
      rating: 4.8,
      isFeatured: true,
      isNew: false,
      colors: "from-blue-500 to-cyan-400",
      image:
        "https://placehold.co/300x200/e2e8f0/4f46e5?text=Customer+Feedback",
      description:
        "Collect comprehensive feedback from customers about your products or services.",
    },
    {
      id: 2,
      name: "Job Application",
      category: "forms",
      questions: 15,
      uses: 982,
      rating: 4.7,
      isFeatured: true,
      isNew: false,
      colors: "from-purple-500 to-indigo-500",
      image: "https://placehold.co/300x200/e2e8f0/7c3aed?text=Job+Application",
      description:
        "A professional application form for hiring new employees with customizable fields.",
    },
    {
      id: 3,
      name: "Event Registration",
      category: "registration",
      questions: 8,
      uses: 856,
      rating: 4.6,
      isFeatured: false,
      isNew: true,
      colors: "from-emerald-500 to-teal-500",
      image:
        "https://placehold.co/300x200/e2e8f0/059669?text=Event+Registration",
      description:
        "Perfect for conferences, webinars, and local events with attendee management.",
    },
    {
      id: 4,
      name: "Contact Form",
      category: "forms",
      questions: 5,
      uses: 1845,
      rating: 4.9,
      isFeatured: false,
      isNew: false,
      colors: "from-amber-500 to-orange-500",
      image: "https://placehold.co/300x200/e2e8f0/d97706?text=Contact+Form",
      description:
        "Simple yet effective contact form for your website visitors to reach you.",
    },
    {
      id: 5,
      name: "Product Survey",
      category: "survey",
      questions: 10,
      uses: 678,
      rating: 4.5,
      isFeatured: false,
      isNew: true,
      colors: "from-pink-500 to-rose-500",
      image: "https://placehold.co/300x200/e2e8f0/db2777?text=Product+Survey",
      description:
        "Gather insights about your product's features, usability, and customer satisfaction.",
    },
    {
      id: 6,
      name: "Satisfaction Survey",
      category: "survey",
      questions: 7,
      uses: 723,
      rating: 4.4,
      isFeatured: false,
      isNew: false,
      colors: "from-cyan-500 to-blue-500",
      image:
        "https://placehold.co/300x200/e2e8f0/0891b2?text=Satisfaction+Survey",
      description:
        "Measure customer satisfaction with this comprehensive yet concise survey.",
    },
    {
      id: 7,
      name: "Course Evaluation",
      category: "feedback",
      questions: 14,
      uses: 512,
      rating: 4.6,
      isFeatured: false,
      isNew: true,
      colors: "from-violet-500 to-purple-500",
      image:
        "https://placehold.co/300x200/e2e8f0/8b5cf6?text=Course+Evaluation",
      description:
        "Allow students to evaluate courses and instructors with detailed feedback options.",
    },
    {
      id: 8,
      name: "Online Order Form",
      category: "forms",
      questions: 9,
      uses: 932,
      rating: 4.7,
      isFeatured: true,
      isNew: false,
      colors: "from-green-500 to-emerald-500",
      image: "https://placehold.co/300x200/e2e8f0/10b981?text=Order+Form",
      description:
        "Process online orders with payment integration and shipping information collection.",
    },
  ];

  // Filter templates based on active category and search query
  const filteredTemplates = templates
    .filter((template) =>
      searchQuery
        ? template.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    )
    .filter((template) =>
      activeCategory === "all" ? true : template.category === activeCategory,
    );

  // Find featured templates
  const featuredTemplates = [
    {
      ...templates.find((t) => t.id === 1),
      icon: "solar:chat-round-dots-bold-duotone",
      color: "text-cyan-500 bg-cyan-100",
    },
    {
      ...templates.find((t) => t.id === 2),
      icon: "solar:letter-bold-duotone",
      color: "text-purple-500 bg-purple-100",
    },
    {
      ...templates.find((t) => t.id === 8),
      icon: "solar:cart-large-bold-duotone",
      color: "text-green-500 bg-green-100",
    },
    {
      id: 99,
      name: "Newsletter Signup",
      category: "forms",
      questions: 6,
      uses: 1543,
      rating: 4.9,
      isFeatured: true,
      isNew: true,
      colors: "from-pink-500 to-fuchsia-500",
      icon: "solar:letter-bold-duotone",
      color: "text-pink-500 bg-pink-100",
      image:
        "https://placehold.co/300x200/f9a8d4/f472b6?text=Newsletter+Signup",
      description:
        "Grow your audience with a beautiful, ready-to-use newsletter signup form.",
    },
  ];

  // Handle creating a new template
  const handleCreateTemplate = () => {
    router.push("/dashboard/create");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Form Templates
          </h2>
          <p className="text-gray-500">
            Start with a template or create your own from scratch
          </p>
        </div>
        <Button
          className="px-6"
          color="primary"
          startContent={<Icon icon="solar:add-circle-bold" />}
          onPress={handleCreateTemplate}
        >
          Create Template
        </Button>
      </div>

      {/* Featured Templates Carousel */}
      <div className="mb-10">
        <div className="flex items-center mb-4 gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow text-white">
            <Icon icon="solar:star-bold-duotone" width={22} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Featured Templates
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template, idx) => (
            <div
              key={template.name}
              className="relative group bg-gradient-to-br from-white/80 via-gray-50 to-blue-50/60 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-400 hover:shadow-xl transition-all p-6 flex flex-col justify-between min-h-[220px] cursor-pointer overflow-hidden"
              style={{ minHeight: 220 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${template.color} shadow-inner`}
                >
                  <Icon
                    icon={template.icon || "solar:document-bold"}
                    width={32}
                  />
                </div>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full ml-auto">
                  Featured
                </span>
              </div>
              <div className="mb-2 flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {template.name}
                </h4>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {template.description ||
                    "A ready-to-use template for your next form."}
                </p>
              </div>
              <button
                className="mt-4 w-full bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-200 hover:shadow-lg transition-all"
                onClick={() => setSelectedTemplate(template)}
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Template Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
          <Input
            className="w-full md:w-80"
            endContent={
              searchQuery && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon icon="solar:close-circle-bold" width={18} />
                </Button>
              )
            }
            placeholder="Search templates..."
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:magnifer-linear"
                width={20}
              />
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category.id}
                className="whitespace-nowrap"
                color={activeCategory === category.id ? "primary" : "default"}
                size="sm"
                variant={activeCategory === category.id ? "solid" : "flat"}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
                <Badge className="ml-1" size="sm" variant="flat">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 ? (
          <Card className="p-12 border border-gray-200">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Icon
                  className="text-gray-400"
                  icon="solar:magnifer-linear"
                  width={28}
                />
              </div>
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
              <Button
                color="primary"
                variant="flat"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedTemplate(template)}
              >
                <CardBody className="p-0">
                  <div className="flex items-center p-4 border-b border-gray-100">
                    <div
                      className={`w-10 h-10 rounded-md bg-gradient-to-br ${template.colors} flex items-center justify-center text-white shrink-0 mr-3`}
                    >
                      <Icon icon="solar:document-bold" width={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="text-base font-medium mb-0.5 truncate">
                          {template.name}
                        </h3>
                        {template.isNew && (
                          <Badge
                            className="ml-2"
                            color="success"
                            size="sm"
                            variant="flat"
                          >
                            NEW
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Icon
                            className="text-amber-400"
                            icon="solar:star-bold"
                            width={12}
                          />
                          <span>{template.rating}</span>
                        </div>
                        <span className="mx-1.5">•</span>
                        <span>{template.questions} questions</span>
                        <span className="mx-1.5">•</span>
                        <span>{template.uses.toLocaleString()} uses</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 text-sm text-gray-600">
                    <p className="line-clamp-2">{template.description}</p>
                  </div>

                  <div className="px-4 pb-4 pt-2 flex justify-between items-center">
                    <Badge color="primary" variant="flat">
                      {template.category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="light"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                        }}
                      >
                        Preview
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                        }}
                      >
                        Use
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Template Categories */}
      <div className="mt-10 border-t border-gray-200 pt-10">
        <h3 className="text-lg font-bold mb-6">Template Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Customer Surveys",
              icon: "solar:chat-square-like-bold-duotone",
              color: "from-blue-500 to-cyan-400",
              count: 12,
            },
            {
              name: "Lead Generation",
              icon: "solar:users-group-rounded-bold-duotone",
              color: "from-emerald-500 to-green-400",
              count: 8,
            },
            {
              name: "Event Registration",
              icon: "solar:calendar-mark-bold-duotone",
              color: "from-purple-500 to-violet-400",
              count: 10,
            },
            {
              name: "Online Orders",
              icon: "solar:cart-large-bold-duotone",
              color: "from-amber-500 to-orange-400",
              count: 6,
            },
            {
              name: "Education",
              icon: "solar:letter-bold-duotone",
              color: "from-rose-500 to-pink-400",
              count: 9,
            },
            {
              name: "Feedback",
              icon: "solar:like-bold-duotone",
              color: "from-indigo-500 to-blue-400",
              count: 7,
            },
            {
              name: "Healthcare",
              icon: "solar:health-bold-duotone",
              color: "from-teal-500 to-cyan-400",
              count: 5,
            },
            {
              name: "Non-Profit",
              icon: "solar:heart-shine-bold-duotone",
              color: "from-red-500 to-orange-400",
              count: 8,
            },
          ].map((category, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-center"
              onClick={() => setActiveCategory(category.name.toLowerCase())}
            >
              <CardBody className="flex flex-col items-center justify-center p-6 gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-2`}
                >
                  <Icon icon={category.icon} width={28} />
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <h4 className="font-medium text-base">{category.name}</h4>
                  <p className="text-xs text-gray-500">
                    {category.count} templates
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Your Own */}
      <div className="mt-10">
        <Card className="border-0 overflow-hidden bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <CardBody className="p-6 relative">
            <div className="absolute top-0 right-0 w-30 bg-white/5 rounded-full -mt-10 -mr-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">
                  Don&apos;t see what you need?
                </h3>
                <p className="text-white/80 mb-0">
                  Create a custom template that perfectly fits your
                  requirements.
                </p>
              </div>
              <Button
                className="bg-white text-primary-700 shadow-lg border-0 px-6"
                onPress={handleCreateTemplate}
              >
                Create from Scratch
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Template Details Modal */}
      <Modal
        isOpen={!!selectedTemplate}
        size="lg"
        onOpenChange={(open) => {
          if (!open) setSelectedTemplate(null);
        }}
      >
        <ModalContent>
          {(onClose) =>
            selectedTemplate && (
              <>
                <ModalHeader className="border-b flex items-center gap-2">
                  <Icon
                    className="text-primary-500"
                    icon={selectedTemplate.icon || "solar:document-bold"}
                    width={28}
                  />
                  <span className="font-semibold text-lg">
                    {selectedTemplate.name}
                  </span>
                </ModalHeader>
                <ModalBody className="bg-gray-50 p-0">
                  <img
                    alt={selectedTemplate.name}
                    className="w-full h-40 object-cover rounded-t-lg mb-0"
                    src={selectedTemplate.image}
                  />
                  <div className="px-6 pt-4 pb-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Chip color="primary" variant="flat">
                        {selectedTemplate.questions} questions
                      </Chip>
                      <Chip color="success" variant="flat">
                        {selectedTemplate.uses.toLocaleString()} uses
                      </Chip>
                      <Chip color="warning" variant="flat">
                        Rating: {selectedTemplate.rating}
                      </Chip>
                      <Chip color="secondary" variant="flat">
                        {selectedTemplate.category}
                      </Chip>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-0">
                      {selectedTemplate.description}
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="w-full"
                    color="primary"
                    onClick={() => {
                      /* TODO: implement use template */
                    }}
                  >
                    Use Template
                  </Button>
                  <Button
                    className="w-full"
                    variant="bordered"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
};

export default TemplatesContent;
