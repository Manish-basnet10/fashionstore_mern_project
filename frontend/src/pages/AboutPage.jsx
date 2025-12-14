const AboutPage = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Quality Assurance',
      description: 'Every product is carefully selected and quality-checked before reaching you.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and exclusive offers.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your orders to you faster.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Easy Returns',
      description: 'Hassle-free return and exchange policy for your peace of mind.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you whenever you need.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Wide Selection',
      description: 'Thousands of trendy fashion items across all categories.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-900/20 dark:to-pink-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About FashionStore
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Your trusted destination for the latest fashion trends and premium quality clothing
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-slate-700">
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Our Story</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                FashionStore was born from a simple vision: to make high-quality, trendy fashion accessible to everyone. 
                Founded in 2020, we've grown from a small startup to a trusted name in online fashion retail.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                We believe that fashion is a form of self-expression, and everyone deserves to look and feel their best, 
                regardless of their budget. That's why we curate the latest trends from top brands and offer them at 
                competitive prices, making style accessible to all.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                Our commitment to quality, customer satisfaction, and innovation has made us a favorite among fashion 
                enthusiasts across the country. We're not just selling clothes—we're helping you express your unique style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 md:p-10 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg leading-relaxed text-white/90">
              To inspire confidence through fashion by offering a curated selection of trendy, comfortable, and affordable 
              clothing. We believe that everyone deserves to look and feel their best, regardless of their budget.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 md:p-10 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg leading-relaxed text-white/90">
              To become the most trusted and loved fashion destination, known for quality, innovation, and exceptional 
              customer experience. We envision a future where fashion is accessible, sustainable, and empowering for all.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We're committed to providing you with the best shopping experience
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-400">We never compromise on quality</p>
            </div>
            <div>
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Customer First</h3>
              <p className="text-gray-600 dark:text-gray-400">Your satisfaction is our priority</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">Always improving and evolving</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
