// components/Common/Loader.tsx
const Loader = ({ fadeOut }: { fadeOut: boolean }) => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-white z-[9999] transition-opacity duration-1000 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <video
          src="/loader.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  };
  
  export default Loader;
  