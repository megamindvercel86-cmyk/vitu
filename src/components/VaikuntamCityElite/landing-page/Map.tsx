"use client";

export default function MapSection() {
  return (
    <section className="bg-[#1C1213]  ">
      <div className="relative z-50 container mx-auto">
        <StaticMap />
      </div>
    </section>
  );
}

function StaticMap() {
  const lat = 13.008386;
  const lng = 74.810103;

  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.005}%2C${lat - 0.005}%2C${lng + 0.005}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="relative z-10 w-full  ">
      <div className="lg:border-l lg:border-r border-[#c7784d]">
        <p className="text-[#E0D9C7] font-freightNeoMedium text-center text-lg pb-6 lg:text-xl lg2:text-3xl">
          Behind NITK, Munchoor, Surathkal, Mangalore.
        </p>
      </div>
      <iframe
        src={url}
        style={{ width: "100%", height: "348px", border: 0 }}
        className="border-none outline-none"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <div className="absolute bottom-0 left-0 bg-[#1C1213] w-full h-4 border-l border-r border-[#c7784d]" />
    </div>
  );
}
