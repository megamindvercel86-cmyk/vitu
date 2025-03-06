import React from "react";

const Loader = () => {
  return (
    <>
      <div
        style={{
          display: "inline-block",
          width: "40px", // Increased for better visibility
          height: "40px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #ae8566",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Loader;
