"use client";

import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleLogin = () => {
    router.push("/dashboard");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/dashboard");
    onClose(); // Close the modal after successful login
  };

  // Typewriter effect for animated word
  const animatedWords = ["easier", "faster", "smarter", "professional"];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedWord, setDisplayedWord] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedWord(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(75);
    } else {
        setDisplayedWord(animatedWords[wordIndex].substring(0, displayedWord.length + 1));
        setTypingSpeed(150);
      }
      
      if (!isDeleting && displayedWord === animatedWords[wordIndex]) {
        // Pause at the end of the word
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && displayedWord === '') {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % animatedWords.length);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayedWord, isDeleting, wordIndex, animatedWords, typingSpeed]);

  return (
    <div className="py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Hero Content */}
        <div className="md:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>New AI Form Builder Released</span>
            <Icon icon="solar:arrow-right-linear" className="ml-1" width={16} />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Building forms has never been <br className="hidden md:block" />
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent min-w-[180px] inline-block">
                {displayedWord || animatedWords[0]}
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Create beautiful, responsive forms in minutes with our intuitive drag-and-drop builder. Save time, increase conversion rates, and get actionable insights.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              color="primary" 
              size="lg"
              endContent={<Icon icon="solar:arrow-right-broken" width={20} />}
              className="font-medium text-base h-12 px-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
              onPress={() => router.push('/signup')}
            >
              Get Started Free
            </Button>
            
          <Button
              variant="flat" 
              color="primary" 
              size="lg"
              startContent={<Icon icon="solar:play-circle-bold" width={20} />}
              className="font-medium text-base h-12"
            onPress={onOpen}
          >
              Watch Demo
          </Button>
          </div>
          
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt={`User ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} icon="solar:star-bold" className="text-amber-400" width={16} />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-2">5.0 (2,500+ reviews)</span>
                </div>
                <p className="text-sm text-gray-600">
                  Trusted by <span className="font-semibold text-gray-900">50,000+</span> users worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="md:col-span-6 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-70"></div>
          
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            <img 
              src="/hero-image.png" 
              alt="EzzyForms Interface"
              className="relative z-10 w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400/5046e5/white?text=EzzyForms+Interface";
              }}
            />
            
            {/* Decorative elements */}
            <div className="absolute top-5 right-5 flex gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            {/* Animated cursor */}
            <div className="absolute bottom-20 left-[40%] w-4 h-4 bg-blue-500 rounded-full z-20 animate-ping opacity-75"></div>
          </div>
          
          {/* Feature badges */}
          <div className="absolute -right-3 md:-right-6 top-20 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 z-20 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon icon="solar:chart-2-bold-duotone" className="text-blue-500" width={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Real-time analytics</h4>
                <p className="text-xs text-gray-600">Actionable insights</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -left-3 md:-left-6 bottom-20 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 z-20 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Icon icon="solar:shield-user-bold-duotone" className="text-green-500" width={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Enterprise security</h4>
                <p className="text-xs text-gray-600">GDPR & HIPAA compliant</p>
              </div>
            </div>
          </div>
          
          <div className="absolute left-[20%] -bottom-3 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 z-20 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Icon icon="solar:devices-bold-duotone" className="text-indigo-500" width={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Fully responsive</h4>
                <p className="text-xs text-gray-600">Works on all devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trusted by section */}
      <div className="mt-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50"></div>
        <div className="relative">
          <p className="text-center text-gray-500 font-medium mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {[
              { name: "Google", icon: "logos:google-icon" },
              { name: "Microsoft", icon: "logos:microsoft-icon" },
              { name: "Slack", icon: "logos:slack-icon" },
              { name: "Spotify", icon: "logos:spotify-icon" },
              { name: "Airbnb", icon: "logos:airbnb" },
              { name: "Adobe", icon: "logos:adobe-icon" }
            ].map((brand, index) => (
              <div key={index} className="text-gray-400 hover:text-gray-600 transition-colors transform hover:scale-110 transition-transform">
                <Icon icon={brand.icon} width={index % 2 === 0 ? 36 : 30} className="opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="4xl"
        classNames={{
          backdrop: "bg-black/60 backdrop-blur-sm",
          base: "border border-gray-200"
        }}
      >
        <ModalContent>
          <ModalHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Icon icon="solar:play-circle-bold" className="text-blue-500" width={20} />
              <span>EzzyForms Product Demo</span>
            </div>
          </ModalHeader>
          <ModalBody className="p-0">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <Icon icon="solar:play-bold" className="text-white/50" width={64} />
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-gray-100">
            <Button color="primary" variant="light" onPress={onClose} className="font-medium">
              Close
            </Button>
            <Button color="primary" className="font-medium">
              Learn More
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 