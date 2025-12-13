const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        
        <div className="card p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Welcome to Fashion Store</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Fashion Store is your one-stop destination for the latest trends in men's, women's, and kids' fashion.
              We are committed to providing high-quality clothing at affordable prices, ensuring that style is
              accessible to everyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is to inspire confidence through fashion by offering a curated selection of trendy,
              comfortable, and affordable clothing. We believe that everyone deserves to look and feel their best,
              regardless of their budget.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Wide selection of trendy fashion items</li>
              <li>Affordable prices with regular discounts</li>
              <li>Quality assurance on all products</li>
              <li>Fast and reliable delivery</li>
              <li>Excellent customer service</li>
              <li>Easy returns and exchanges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              For any inquiries or support, please visit our{' '}
              <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

