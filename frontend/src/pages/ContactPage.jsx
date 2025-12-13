import { useState } from 'react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to backend
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Visit Us</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                123 Fashion Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> support@fashionstore.com
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Hours:</strong> Mon-Sat 9AM-6PM
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Location Map</h3>
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map Embed Placeholder</p>
                <p className="text-gray-400 text-sm mt-2">
                  (In production, embed Google Maps here)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

