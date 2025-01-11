import React from "react";

interface ArticleCardProps {
  category: string;
  title: string;
  subtitle?: string;
  image: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ category, title, subtitle, image }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="aspect-[4/5] relative">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
        {/* Action Button */}
        <button className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          {/* Replace this span with your desired Icon */}
          <span className="w-5 h-5 text-neutral-900">+</span>
        </button>
      </div>

      {/* Category Label */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm font-medium">
        {category}
      </div>

      {/* Title and Subtitle */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-white/90">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ArticleCard;
