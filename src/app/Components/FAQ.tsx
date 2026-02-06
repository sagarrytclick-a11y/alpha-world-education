"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Phone, Mail, Clock, Globe, Award, Users } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { openModal } = useFormModal();

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "admissions", name: "Admissions", icon: Globe },
    { id: "process", name: "Process", icon: Clock },
    { id: "support", name: "Support", icon: Users },
    { id: "benefits", name: "Benefits", icon: Award }
  ];

  const faqs = [
    {
      question: "What services does Alpha World Education provide?",
      answer: "Alpha World Education provides comprehensive study abroad services including university admissions, visa assistance, scholarship guidance, pre-departure orientation, and ongoing support throughout your educational journey.",
      category: "services"
    },
    {
      question: "How do I apply to universities through Alpha World Education?",
      answer: "Our streamlined application process: 1) Schedule free consultation → 2) Select course & country → 3) Submit documents → 4) We handle applications → 5) Receive offers → 6) Visa & departure support. Simple, efficient, and personalized.",
      category: "process"
    },
    {
      question: "Which countries do you help students study in?",
      answer: "We specialize in USA, UK, Canada, Australia, New Zealand, Germany, Ireland, and top European destinations. Each offers unique advantages - from world-class education to post-study work opportunities.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements for studying abroad?",
      answer: "Requirements vary but typically include: academic qualifications, English proficiency (IELTS/TOEFL), statement of purpose, recommendation letters, and financial proof. We evaluate your profile and match you with suitable programs.",
      category: "admissions"
    },
    {
      question: "Do you help with scholarships and financial aid?",
      answer: "Absolutely! We provide comprehensive scholarship support - identifying opportunities, application assistance, and financial planning. Many universities offer exclusive scholarships for our students, reducing costs significantly.",
      category: "benefits"
    },
    {
      question: "How long does the application process take?",
      answer: "Timeline: 4-12 weeks depending on destination. We recommend starting 6-8 months early to ensure smooth processing of applications, visas, and preparations. Early planning increases success rates.",
      category: "process"
    },
    {
      question: "What support do you provide after admission?",
      answer: "Complete post-admission support: visa guidance, accommodation, pre-departure orientation, travel arrangements, and ongoing assistance. Our team supports you throughout your entire academic journey.",
      category: "support"
    },
    {
      question: "Are your services free of charge?",
      answer: "Most services are free as we're university-partnered. We only charge for specialized services like premium visa processing. Schedule a consultation to understand our service structure - no hidden fees!",
      category: "benefits"
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-green-50 overflow-hidden font-poppins">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions? We Have Answers
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[900] text-slate-900 mb-6 leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Questions</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about studying abroad with Alpha World Education. 
            Find clear answers to make your journey smoother.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? "shadow-xl border-green-200 transform scale-[1.02]" 
                  : "border-slate-200 hover:shadow-md hover:border-green-100"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openIndex === index ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500 group-hover:bg-green-50 group-hover:text-green-600"
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 pr-4 leading-tight">
                    {faq.question}
                  </h3>
                </div>
                <div className={`flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'rotate-180 text-green-600' : 'text-slate-400 group-hover:text-green-600'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-8 pb-6">
                  <div className="pl-12">
                    <p className="text-slate-600 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-10 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MessageCircle className="w-4 h-4" />
              Still Have Questions?
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Let's Start Your Journey Together
            </h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Our expert education consultants are ready to provide personalized guidance for your study abroad dreams. 
              Schedule your free consultation today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={openModal}
                className="group px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Schedule Free Consultation
              </button>
              <button 
                onClick={openModal}
                className="group px-8 py-4 bg-green-900/50 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-green-900 transition-all duration-300 border border-white/20 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Quick Response
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Expert Consultants
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Proven Success
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
