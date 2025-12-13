import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-pulse">
          MEGA SALE!
        </h1>
        <p className="text-2xl md:text-4xl mb-8">Up to 70% OFF</p>
        <p className="text-lg md:text-xl mb-8">Hurry! Limited Time Offer</p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 min-w-[80px]">
            <div className="text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 min-w-[80px]">
            <div className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 min-w-[80px]">
            <div className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 min-w-[80px]">
            <div className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="bg-accent text-gray-900 px-12 py-4 rounded-full text-xl font-bold hover:bg-accent-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

