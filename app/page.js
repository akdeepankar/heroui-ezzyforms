"use client";

import React, { useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter, Spacer, Divider, Tooltip } from "@heroui/react";
import { Input } from "@heroui/react";

export default function Home() {
  const router = useRouter();

  // Add animation effects on page load
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          el.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check on load
    setTimeout(animateOnScroll, 100);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] left-[5%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header with glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                E
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                EzzyForms
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {["Features", "Templates", "Pricing", "About"].map((item) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              <Button
                variant="light"
                className="hidden sm:flex hover:bg-white/80 transition-all"
                onPress={() => router.push('/login')}
              >
                Log In
              </Button>
              <Button
                color="primary"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
                onPress={() => router.push('/dashboard')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced animations */}
      <section className="relative overflow-hidden pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col items-center text-center animate-on-scroll">
            <span className="px-4 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-6 shadow-sm">
              Form building reimagined
            </span>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl">
              Create beautiful forms in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient relative">
                seconds
                <svg className="absolute -bottom-4 left-0 w-full h-3 text-indigo-400 opacity-70" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-gray-600 max-w-2xl">
              The easiest way to build forms, surveys, and quizzes. Collect responses and analyze data all in one place.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button 
                color="primary" 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-200/40 transition-all duration-300 px-8 h-14"
                onPress={() => router.push('/dashboard')}
                startContent={<Icon icon="solar:rocket-bold" className="text-white" width={20} />}
              >
                Start Creating for Free
              </Button>
                <Button
                variant="bordered" 
                size="lg"
                className="border-gray-300 hover:border-indigo-400 hover:bg-white/80 transition-all duration-300 h-14"
                startContent={<Icon icon="solar:play-circle-bold" width={20} />}
              >
                Watch Demo
                </Button>
            </div>
            
            {/* Trusted by section */}
            <div className="mt-16 w-full">
              <p className="text-sm text-gray-500 mb-4">TRUSTED BY THOUSANDS OF ORGANIZATIONS</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
                {['Google', 'Microsoft', 'Airbnb', 'Spotify', 'Adobe'].map((company) => (
                  <div key={company} className="text-gray-400 font-bold text-xl">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Screenshots with enhanced design */}
      <section className="relative -mt-16 mb-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative animate-on-scroll">
      
      {/* Background Gradient Panel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-5xl h-[65vh] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl"></div>
      </div>

      {/* Main Grid Content */}
      <div className="relative flex items-center justify-center py-10">
        <div className="grid grid-cols-3 gap-8 max-w-5xl">
          
          {/* Left: Form Builder */}
          <div className="col-span-2 transform hover:-rotate-1 transition-all duration-700 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
            <div className="bg-white p-2 rounded-xl shadow-2xl relative z-10 transition-all duration-300 group-hover:shadow-indigo-200">
              <div className="bg-gray-100 rounded-lg p-1.5">
                <div className="flex items-center gap-1.5 mb-3 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="text-xs text-gray-500 ml-2">EzzyForms Builder</div>
                </div>
                <img
                  src="https://placehold.co/800x500/f8fafc/4f46e5?text=Form+Builder"
                  alt="Form Builder"
                  className="rounded-md w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20 z-0"></div>
          </div>

          {/* Right: Analytics and Templates */}
          <div className="space-y-6">
            
            {/* Analytics */}
            <div className="bg-white p-2 rounded-xl shadow-xl transform hover:rotate-1 hover:-translate-y-1 transition-all duration-500 hover:shadow-indigo-200 relative">
              <div className="bg-gray-100 rounded-lg p-1.5">
                <div className="flex items-center gap-1.5 mb-2 px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="text-xs text-gray-500 ml-2">Analytics</div>
                </div>
                <img
                  src="https://placehold.co/400x300/f8fafc/4f46e5?text=Analytics"
                  alt="Analytics"
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white p-2 rounded-xl shadow-xl transform hover:-rotate-2 hover:translate-y-1 transition-all duration-500 hover:shadow-indigo-200 relative">
              <div className="bg-gray-100 rounded-lg p-1.5">
                <div className="flex items-center gap-1.5 mb-2 px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="text-xs text-gray-500 ml-2">Templates</div>
                </div>
                <img
                  src="https://placehold.co/400x300/f8fafc/4f46e5?text=Template"
                  alt="Templates"
                  className="rounded-md"
                />
              </div>
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 z-0"></div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Badge: Responses */}
      <div className="absolute -right-8 top-1/3 transform rotate-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 animate-float">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Icon icon="solar:check-circle-bold" className="text-green-500" width={16} />
          </div>
          <div>
            <div className="text-xs text-gray-500">Responses</div>
            <div className="font-bold text-gray-800">1,234</div>
          </div>
        </div>
      </div>

      {/* Floating Badge: Rating */}
      <div className="absolute -left-6 bottom-1/4 transform -rotate-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 animate-float animation-delay-1000">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Icon icon="solar:star-bold" className="text-purple-500" width={16} />
          </div>
          <div>
            <div className="text-xs text-gray-500">Rating</div>
            <div className="font-bold text-gray-800">4.9/5</div>
          </div>
        </div>
      </div>

    </div> {/* end of .relative.animate-on-scroll */}
  </div> {/* end of .max-w-7xl */}
</section>


      {/* Features Section */}
      <section id="features" className="py-28 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-6 shadow-sm">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to create <span className="text-indigo-600">amazing forms</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Design beautiful forms, collect responses, and analyze results with our comprehensive toolkit designed for creators like you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
            {[
              {
                icon: "solar:pen-new-square-bold-duotone",
                color: "indigo",
                title: "Drag & Drop Builder",
                description: "Easily create forms with our intuitive drag-and-drop interface. No coding required."
              },
              {
                icon: "solar:widget-add-bold-duotone",
                color: "purple",
                title: "40+ Form Elements",
                description: "Choose from a wide variety of elements to build exactly what you need, from simple text inputs to complex file uploads."
              },
              {
                icon: "solar:chart-bold-duotone",
                color: "blue",
                title: "Real-time Analytics",
                description: "Get instant insights with beautiful visualizations of your form data and response patterns."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon icon={feature.icon} className={`text-${feature.color}-600`} width={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-28 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full mb-6 shadow-sm">
              Templates
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Start with professionally designed <span className="text-purple-600">templates</span>
            </h2>
            <p className="text-lg text-gray-600">
              Choose from hundreds of templates and customize them to fit your needs perfectly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
            {[
              {
                title: "Customer Feedback",
                category: "Surveys",
                image: "https://placehold.co/400x300/f8fafc/4f46e5?text=Feedback+Form",
                color: "indigo",
                popular: true,
                questions: 12,
                description: "Collect valuable feedback from your customers to improve your products and services."
              },
              {
                title: "Event Registration",
                category: "Forms",
                image: "https://placehold.co/400x300/f8fafc/7c3aed?text=Event+Form",
                color: "purple",
                popular: false,
                questions: 8,
                description: "Make event registration seamless with this easy-to-customize template."
              },
              {
                title: "Job Application",
                category: "Forms",
                image: "https://placehold.co/400x300/f8fafc/ec4899?text=Job+Form",
                color: "pink",
                popular: true,
                questions: 15,
                description: "Streamline your hiring process with this comprehensive application form."
              },
              {
                title: "Product Quiz",
                category: "Quizzes",
                image: "https://placehold.co/400x300/f8fafc/0ea5e9?text=Product+Quiz",
                color: "blue",
                popular: false,
                questions: 10,
                description: "Help customers find the perfect product with this interactive quiz."
              },
              {
                title: "Contact Form",
                category: "Forms",
                image: "https://placehold.co/400x300/f8fafc/10b981?text=Contact+Form",
                color: "emerald",
                popular: false,
                questions: 5,
                description: "A simple yet effective way for visitors to reach out to you."
              },
              {
                title: "User Satisfaction",
                category: "Surveys",
                image: "https://placehold.co/400x300/f8fafc/f59e0b?text=Satisfaction+Survey",
                color: "amber",
                popular: true,
                questions: 9,
                description: "Measure user satisfaction and identify areas for improvement."
              }
            ].map((template, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute top-3 right-3 px-2.5 py-1.5 text-xs font-semibold text-white bg-${template.color}-500 rounded-full z-20 shadow-sm`}>
                    {template.category}
                  </div>
                  {template.popular && (
                    <div className="absolute top-3 left-3 px-2.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-full z-20 shadow-sm flex items-center gap-1">
                      <Icon icon="solar:star-bold" width={12} />
                      <span>Popular</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{template.title}</h3>
                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-full">
                      {template.questions} questions
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{template.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon key={star} icon="solar:star-bold" className="text-amber-400" width={14} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">4.9</span>
                    </div>
                    <Button size="sm" color="primary" variant="flat" className="transition-all duration-300 hover:bg-indigo-100">
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16 animate-on-scroll">
            <Button 
              color="primary" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200/40 transition-all duration-300"
              endContent={<Icon icon="solar:arrow-right-bold" width={16} />}
            >
              Browse All Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-28 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-50 rounded-full mb-6 shadow-sm">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Pricing Plans
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for you and your team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="border rounded-2xl p-7 bg-white flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="mb-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <Icon icon="solar:star-bold-duotone" className="text-blue-500" width={28} />
                </span>
              </div>
              <h4 className="font-bold text-xl mb-1">Basic</h4>
              <div className="text-3xl font-bold mb-2">Free</div>
              <ul className="text-sm text-gray-600 mb-7 list-disc list-inside space-y-1 text-center">
                <li>100 responses/month</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <Button size="md" color="primary" className="w-full">Current Plan</Button>
            </div>
            {/* Pro Plan */}
            <div className="border-2 border-amber-400 rounded-2xl p-7 bg-white flex flex-col items-center shadow-xl hover:shadow-2xl transition-shadow scale-105 relative">
              {/* Pro Badge */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">Most Popular</span>
              <div className="mb-3 mt-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                  <Icon icon="solar:crown-bold-duotone" className="text-amber-500" width={28} />
                </span>
              </div>
              <h4 className="font-bold text-xl mb-1 text-amber-600">Pro</h4>
              <div className="text-3xl font-bold mb-2 text-amber-600">$12<span className="text-base font-normal">/mo</span></div>
              <ul className="text-sm text-gray-600 mb-7 list-disc list-inside space-y-1 text-center">
                <li>5,000 responses/month</li>
                <li>Advanced analytics</li>
                <li>Remove branding</li>
                <li>Priority support</li>
              </ul>
              <Button size="md" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-orange-500 hover:to-amber-500 transition-colors font-semibold shadow-md">Upgrade</Button>
            </div>
            {/* Business Plan */}
            <div className="border rounded-2xl p-7 bg-white flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="mb-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                  <Icon icon="solar:course-up-bold-duotone" className="text-purple-500" width={28} />
                </span>
              </div>
              <h4 className="font-bold text-xl mb-1">Business</h4>
              <div className="text-3xl font-bold mb-2">Custom</div>
              <ul className="text-sm text-gray-600 mb-7 list-disc list-inside space-y-1 text-center">
                <li>Unlimited responses</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
              </ul>
              <Button size="md" color="primary" className="w-full hover:bg-purple-600 hover:text-white transition-colors font-semibold shadow-md">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative animate-on-scroll">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
                <p className="text-gray-700 text-lg">
                  Join thousands of satisfied users who've transformed their form experience with EzzyForms.
                  Start creating beautiful forms today!
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col gap-4">
                <Button 
                  color="primary" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-500/20 h-12"
                  onPress={() => router.push('/dashboard')}
                  startContent={<Icon icon="solar:rocket-bold" width={20} />}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="bordered" 
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 h-12"
                  startContent={<Icon icon="solar:chat-dots-bold" width={20} />}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            {/* Testimonial */}
            <div className="mt-12 bg-indigo-50/60 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(null).map((_, i) => (
                    <Icon key={i} icon="solar:star-bold" className="text-amber-400" width={20} />
                  ))}
                </div>
                <span className="ml-2 text-indigo-900">5.0</span>
              </div>
              <p className="text-indigo-900 italic mb-4">
                "EzzyForms has transformed how we collect data from our customers. 
                The interface is intuitive, and the analytics are incredibly helpful. 
                It's saved us countless hours!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 mr-3 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=2" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-indigo-900 font-medium">Sarah Johnson</div>
                  <div className="text-indigo-700 text-sm">Marketing Director, Acme Inc.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  E
                </div>
                <span className="font-bold text-xl">EzzyForms</span>
              </div>
              <p className="text-gray-400 mb-4">Create beautiful forms, collect responses, and gain insights from your data with the most intuitive form builder on the market.</p>
              
              <div className="flex gap-4 mt-6">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300"
                  >
                    <Icon icon={`solar:${social}-bold`} className="text-white" width={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Product</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white hover:underline transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#templates" className="hover:text-white hover:underline transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white hover:underline transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Resources</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Developers
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-white hover:underline transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white hover:underline transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-12 border border-gray-700/50">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:flex-1">
                <h4 className="text-lg font-bold mb-2">Subscribe to our newsletter</h4>
                <p className="text-gray-400">Get the latest updates, news and product offers sent directly to your inbox.</p>
              </div>
              <div className="md:w-2/5">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button color="primary" className="bg-indigo-600 hover:bg-indigo-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2023 EzzyForms. All rights reserved.</p>
            <div className="flex gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      
      {/* Add required styles for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-blob {
          animation: blob 15s infinite ease;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
} 