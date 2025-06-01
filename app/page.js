"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // Add animation effects on page load
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible) {
          el.classList.add("animate-in");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    // Initial check on load
    setTimeout(animateOnScroll, 100);

    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob" />
        <div className="absolute top-[40%] left-[5%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-4000" />
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
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors relative group"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                className="hidden sm:flex hover:bg-white/80 transition-all"
                variant="light"
                onPress={() => router.push("/login")}
              >
                Log In
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
                color="primary"
                onPress={() => router.push("/dashboard")}
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
            <span className="px-4 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-6 shadow-sm hover:shadow-md transition-all duration-300">
              ✨ Form building reimagined
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl leading-tight">
              Create beautiful forms in{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient relative inline-block">
                seconds
                <svg
                  className="absolute -bottom-4 left-0 w-full h-3 text-indigo-400 opacity-70"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 12"
                >
                  <path
                    d="M0,0 Q50,12 100,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 max-w-2xl leading-relaxed">
              The easiest way to build forms, surveys, and quizzes. Collect
              responses and analyze data all in one place.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-200/40 transition-all duration-300 px-8 h-14 group"
                color="primary"
                size="lg"
                startContent={
                  <Icon
                    className="text-white transform group-hover:translate-x-1 transition-transform"
                    icon="solar:rocket-bold"
                    width={20}
                  />
                }
                onPress={() => router.push("/dashboard")}
              >
                Start Creating for Free
              </Button>
              <Button
                className="border-gray-300 hover:border-indigo-400 hover:bg-white/80 transition-all duration-300 h-14 group"
                size="lg"
                startContent={
                  <Icon 
                    icon="solar:play-circle-bold" 
                    width={20}
                    className="transform group-hover:scale-110 transition-transform"
                  />
                }
                variant="bordered"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trusted by section */}
            <div className="mt-16 w-full">
              <p className="text-sm text-gray-500 mb-4 font-medium">
                TRUSTED BY THOUSANDS OF ORGANIZATIONS
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
                {["Google", "Microsoft", "Airbnb", "Spotify", "Adobe"].map(
                  (company) => (
                    <div
                      key={company}
                      className="text-gray-400 font-bold text-xl hover:text-gray-600 transition-colors"
                    >
                      {company}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features Heading */}
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full mb-6 shadow-sm hover:shadow-md transition-all duration-300 inline-block">
              ✨ Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to create{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                amazing forms
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build, collect, and analyze with our comprehensive suite of powerful features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Drag & Drop Builder",
                description: "Create forms in minutes with our intuitive drag-and-drop interface",
                icon: "solar:widget-bold-duotone",
                color: "indigo",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                title: "Smart Analytics",
                description: "Get real-time insights and analytics for your form responses",
                icon: "solar:chart-bold-duotone",
                color: "purple",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "AI-Powered",
                description: "Leverage AI to create better forms and analyze responses",
                icon: "solar:magic-stick-3-bold-duotone",
                color: "blue",
                gradient: "from-blue-500 to-indigo-500"
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform`}>
                  <Icon icon={feature.icon} className="text-white" width={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your form experience?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who've transformed their form experience with EzzyForms.
            </p>
            <Button
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 h-14 text-lg font-medium group"
              size="lg"
              startContent={
                <Icon 
                  icon="solar:rocket-bold" 
                  width={20}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              }
              onPress={() => router.push("/dashboard")}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                E
              </div>
              <span className="font-bold text-xl">EzzyForms</span>
            </div>
            <div className="flex gap-8">
              <Button
                variant="light"
                className="text-gray-400 hover:text-white transition-colors"
                onPress={() => {}}
              >
                Privacy
              </Button>
              <Button
                variant="light"
                className="text-gray-400 hover:text-white transition-colors"
                onPress={() => {}}
              >
                Terms
              </Button>
              <Button
                variant="light"
                className="text-gray-400 hover:text-white transition-colors"
                onPress={() => {}}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Add required styles for animations */}
      <style global jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
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
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .bg-grid-white\/10 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }

        .bg-grid-white\/5 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
}
