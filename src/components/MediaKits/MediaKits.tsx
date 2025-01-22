import React from "react";
import Typography from "../Typography/Typography";
import { Download } from "../Icons/Icons";

function MediaKits() {
  const downloadCards = [
    {
      title: "About Us",
      description: "Take the first step towards the home of your dreams. Fill in the form and begin your journey.",
      buttonText: "Download Bio",
      variant: "white"
    },
    {
      title: "VITU REALTY",
      logo: true,
      buttonText: "Download Logo",
      variant: "light"
    },
    {
      title: "VITU REALTY",
      logo: true,
      buttonText: "Download Logo",
      variant: "dark"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F2F0] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadCards.map((card, index) => (
            <div 
              key={index}
              className={`rounded-[24px] p-8 ${
                card.variant === 'white' ? 'bg-white' :
                card.variant === 'light' ? 'bg-white' :
                'bg-[#1A1A1A]'
              }`}
            >
              {card.logo ? (
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12">
                    <img 
                      src="https://images.unsplash.com/photo-1585217514700-a88c0e780e83?auto=format&fit=crop&q=80&w=100"
                      alt="Vitu Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Typography
                    variant="custom"
                    className={`text-2xl font-medium ml-4 ${
                      card.variant === 'dark' ? 'text-white' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {card.title}
                  </Typography>
                </div>
              ) : (
                <>
                  <Typography
                    variant="custom"
                    className="text-2xl font-medium text-[#1A1A1A] mb-4"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="custom"
                    className="text-base text-[#1A1A1A] mb-6"
                  >
                    {card.description}
                  </Typography>
                </>
              )}
              <button 
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border ${
                  card.variant === 'dark' 
                    ? 'border-white text-white hover:bg-white/10' 
                    : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-black/5'
                } transition-colors duration-200`}
              >
                <Download />
                <span>{card.buttonText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaKits;