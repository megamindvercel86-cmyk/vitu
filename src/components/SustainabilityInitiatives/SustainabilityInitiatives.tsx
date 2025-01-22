import React from "react";
import Typography from "../Typography/Typography";

const SustainabilityInitiatives = () => {
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <div>
          <Typography variant="custom" className="text-customBrown text-[60px] font-freightNeoMedium">
            Our Commitment to Sustainability
          </Typography>
          <Typography variant="custom" className="text-[#4F373799] text-2xl font-freightNeoMedium">
            Our commitment to sustainability drives us to create eco-friendly,
            energy-efficient spaces that benefit both our clients and the
            planet.
          </Typography>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default SustainabilityInitiatives;
