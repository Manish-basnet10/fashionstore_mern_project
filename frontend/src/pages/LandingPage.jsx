import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    title: "END OF SEASON SALE",
    discount: "UP TO 70% OFF",
    image: "https://wwd.com/wp-content/uploads/2025/03/iman-photos.jpg" // Iconic supermodel luxury shot
  },
  {
    title: "NEW COLLECTION",
    discount: "FLAT 60% OFF",
    image: "https://images.squarespace-cdn.com/content/v1/55f45174e4b0fb5d95b07f39/af01c2ff-c44b-4c04-b2f4-5c5567640ec2/Louis-Vuitton-Cruise-2025-by-Jamie-Hawkesworth-9.png" // Louis Vuitton 2025 campaign
  },
  {
    title: "FESTIVE EDIT",
    discount: "EXTRA 20% OFF",
    image: "https://blog.indianweddingsaree.com/wp-content/uploads/2021/10/Jewelry.jpg" // Stunning ethnic festive wear
  },
  {
    title: "PREMIUM BRANDS",
    discount: "BUY 2 GET 1 FREE",
    image: "https://b244e933bce2c5a47bc0-4e69e996a1d8df063c04c0e54696da2b.ssl.cf1.rackcdn.com/fashion-photography-male-model-leather-outerwear-ny.jpg" // Premium men's luxury editorial
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = offers[currentIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images with Smooth Fade */}
      {offers.map((offer, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
      ))}

      {/* Professional Content Overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Subtle Title */}
          <h2 className="text-3xl md:text-5xl font-extralight tracking-widest mb-4 uppercase">
            {current.title}
          </h2>

          {/* Bold Discount */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-16 tracking-tight">
            {current.discount}
          </h1>

          {/* Elegant Timer */}
          <div className="flex justify-center gap-8 md:gap-12 mb-16 flex-wrap">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 min-w-[100px] border border-white/10">
                  <div className="text-5xl md:text-6xl font-bold tabular-nums">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-sm uppercase tracking-widest mt-2 text-white/70">
                    {unit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Shop Now Button */}
          <button
            onClick={() => navigate('/home')}
            className="bg-white text-black px-20 py-5 rounded-full text-xl font-medium uppercase tracking-wider
                     hover:bg-gray-100 transform hover:scale-105 transition-all duration-500 shadow-2xl"
          >
            Shop Now
          </button>

          {/* Minimal Dots */}
          <div className="flex justify-center gap-4 mt-20">
            {offers.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentIndex ? 'bg-white w-12' : 'bg-white/40 w-1'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;