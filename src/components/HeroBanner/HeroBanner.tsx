import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/backgroundImages/resourcesPageBackground.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-white max-w-2xl mb-8">
            <span className="text-sm uppercase tracking-wider">BLOG</span>
            <h1 className="text-5xl font-semibold mt-2 mb-4">Is it Really worth it?</h1>
            <p className="text-lg opacity-90 mb-6">
              Is real estate investment worth it? We break down the pros, 
              cons, and key considerations to help you decide.
            </p>
            <button className="bg-white text-gray-800 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Read Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;