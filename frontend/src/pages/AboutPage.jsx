import React, { useState, useEffect } from 'react';
// Importing icons from the package you just installed
import { 
  FaCheckCircle, FaTags, FaShippingFast, FaUndo, FaHeadset, FaTshirt, 
  FaQuoteLeft, FaStar, FaShoppingBag, FaLeaf, FaGem, FaRulerCombined, FaMagic 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// 1. STATIC IMAGES (No backend needed)
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
];

const FOUNDER_IMAGE = "https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1964&auto=format&fit=crop";

const TEAM_MEMBERS = [
  { 
    name: "Manish Basnet", 
    role: "Founder", 
    img: "/team/manish.jpg" 
  },
  { 
    name: "Aastha Gupta", 
    role: "Head Stylist", 
    img: "/team/aastha.jpg" 
  },
  { 
    name: "Mansur Ansari", 
    role: "Operations", 
    img: "/team/mansur.jpg" 
  },
  { 
    name: "Kanhaiya Patel", 
    role: "Designer", 
    img: "/team/kanhaiya.jpg" 
  }
];

function AboutPage() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto-sliding background effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  // Your original features mapped to the new design
  const features = [
    {
      icon: <FaCheckCircle />,
      title: 'Quality Assurance',
      description: 'Every product is carefully selected and quality-checked before reaching you.',
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50 dark:bg-green-900/10"
    },
    {
      icon: <FaTags />,
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and exclusive offers.',
      color: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-50 dark:bg-yellow-900/10"
    },
    {
      icon: <FaShippingFast />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your orders to you faster.',
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      icon: <FaUndo />,
      title: 'Easy Returns',
      description: 'Hassle-free return and exchange policy for your peace of mind.',
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50 dark:bg-purple-900/10"
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you whenever you need.',
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50 dark:bg-orange-900/10"
    },
    {
      icon: <FaTshirt />,
      title: 'Wide Selection',
      description: 'Thousands of trendy fashion items across all categories.',
      color: "from-teal-500 to-cyan-500",
      bg: "bg-teal-50 dark:bg-teal-900/10"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* 1. HERO SECTION (Sliding Backgrounds) */}
      <section className="relative h-[80vh] md:h-[85vh] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentBgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={bg} 
                alt="Fashion background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
              <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply"></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold animate-pulse">
              <span>✨</span>
              <span>ESTABLISHED 2020</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
              About <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FashionStore
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Your trusted destination for the latest fashion trends and premium quality clothing.
            </p>

            <div className="animate-bounce mt-8">
              <svg className="w-6 h-6 text-white/70 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image with floating card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
                <img 
                  src={FOUNDER_IMAGE} 
                  alt="Our Story" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-4 bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600 max-w-xs animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                    <FaStar />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9/5</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 font-bold uppercase">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-bold mb-4 tracking-wider uppercase">
                <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse"></span>
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                From Vision to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Reality</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  FashionStore was born from a simple vision: to make high-quality, trendy fashion accessible to everyone. 
                  Founded in 2020, we've grown from a small startup to a trusted name in online fashion retail.
                </p>
                <p>
                  We believe that fashion is a form of self-expression. That's why we curate the latest trends from top brands 
                  and offer them at competitive prices, making style accessible to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES GRID (Your original content, enhanced design) */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="text-indigo-600">Us?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${feature.bg} p-8 rounded-3xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Meet The Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4]">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-indigo-300">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FaQuoteLeft className="text-5xl text-indigo-500 mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8 italic leading-relaxed">
            "The quality of clothing from FashionStore is unmatched. I've never felt more confident in my style!"
          </h2>
          <div className="flex flex-col items-center">
            <div className="flex text-amber-400 gap-1 mb-4 text-xl">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="text-xl font-bold">Manish basnet</p>
            <p className="text-gray-400 text-sm">Loyal Customer</p>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 px-4 text-center bg-gray-50 dark:bg-gray-900">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Ready to Upgrade Your Style?
        </h2>
        <div className="flex justify-center gap-4">
          <Link 
            to="/home" 
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-xl shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <FaShoppingBag /> Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;