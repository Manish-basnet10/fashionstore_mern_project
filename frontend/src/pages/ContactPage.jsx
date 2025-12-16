import { useState } from 'react';
import api from '../services/api'; 
import toast from 'react-hot-toast'; 
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, 
  FaClock, FaInstagram, FaTwitter, FaLinkedin 
} from 'react-icons/fa'; 

const ContactPage = () => {
  // ==========================================
  // 🔒 BACKEND LOGIC (KEPT EXACTLY THE SAME)
  // ==========================================
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/contact', formData);
      
      if (response.data.success) {
        toast.success(response.data.message || 'Thank you for contacting us! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'manishbasnet476@gmail.com',
      link: 'mailto:manishbasnet476@gmail.com',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Phone',
      content: '7300449730',
      link: 'tel:7300449730',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      content: '123 Fashion Street, New York, NY 10001',
      link: null,
      gradient: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      {/* ==================== 1. HERO HEADER ==================== */}
      <div className="relative bg-indigo-900 py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold animate-pulse">
             <span>✨</span> <span>24/7 SUPPORT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* GRID: LEFT (Form) + RIGHT (Info/Hours) */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* --- LEFT COLUMN: FORM (2/3 Width) --- */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  Send a Message
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Your Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 dark:text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 dark:text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 dark:text-white placeholder-gray-400"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {/* Message (Taller row count to match height of right column) */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6" 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 resize-none dark:text-white placeholder-gray-400"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: INFO + HOURS (Stacked) --- */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* 1. Contact Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-indigo-500">
                Contact Details
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start group p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{info.title}</p>
                      {info.link ? (
                        <a href={info.link} className="block text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate">
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-4">
                {[<FaInstagram />, <FaTwitter />, <FaLinkedin />].map((icon, index) => (
                  <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white text-gray-500 dark:text-gray-300 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Business Hours Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute -top-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <FaClock className="text-[10rem]" />
              </div>
              <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
                <FaClock /> Business Hours
              </h3>
              <div className="space-y-3 relative z-10 text-indigo-100 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mon - Fri</span>
                  <span className="font-bold text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Saturday</span>
                  <span className="font-bold text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Sunday</span>
                  <span className="font-bold text-red-200 bg-red-500/20 px-3 py-0.5 rounded-full text-xs">Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==================== 3. MAP SECTION (BOTTOM, FULL WIDTH) ==================== */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-[450px] relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076364379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1626966601429!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Office Location"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          ></iframe>
          {/* Floating Location Badge */}
          <div className="absolute top-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 pointer-events-none flex items-center gap-4 animate-fade-in-up">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Headquarters</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">123 Fashion Street, NY</p>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;