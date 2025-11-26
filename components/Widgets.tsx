import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CloudRain, MapPin } from './Icons';

export const Widgets: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-8">
      {/* Clock Widget */}
      <div className="bg-white dark:bg-paper p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center hover:scale-105 transition-transform">
        <Clock className="w-8 h-8 text-primary mb-2" />
        <h3 className="text-2xl font-bold">{time.toLocaleTimeString()}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">Dhaka, Bangladesh</span>
      </div>

      {/* Calendar Widget */}
      <div className="bg-white dark:bg-paper p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center hover:scale-105 transition-transform">
        <Calendar className="w-8 h-8 text-secondary mb-2" />
        <h3 className="text-xl font-bold">{time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">Gregorian Calendar</span>
      </div>

      {/* Weather Widget (Mock) */}
      <div className="bg-white dark:bg-paper p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center hover:scale-105 transition-transform">
        <CloudRain className="w-8 h-8 text-blue-400 mb-2" />
        <div className="text-center">
          <h3 className="text-2xl font-bold">28°C</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Partly Cloudy</p>
          <p className="text-xs text-gray-400">Dhaka</p>
        </div>
      </div>

      {/* Map Widget (Static Image/Link as placeholder for iframe) */}
      <div className="bg-white dark:bg-paper rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden relative group h-40">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430139!2d90.39108011536295!3d23.750858094676466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3b91c5%3A0x1277825270971576!2sDhaka!5e0!3m2!1sen!2sbd!4v1634567890123!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{border:0}} 
          allowFullScreen 
          loading="lazy"
          title="Map"
        ></iframe>
        <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
        <div className="absolute bottom-2 left-2 bg-white dark:bg-darker px-2 py-1 rounded text-xs font-bold shadow flex items-center gap-1">
          <MapPin size={12} /> Dhaka
        </div>
      </div>
    </div>
  );
};
