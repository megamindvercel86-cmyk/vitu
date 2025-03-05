// src/app/not-found.tsx
import Image from 'next/image';
import Link from 'next/link';
import bgImage from '../../public/images/backgroundImages/homePageBackgroundImageDesktop.webp';

export default function NotFound() {
  return (
    <div className="relative" role="img" aria-label="Modern real estate background">
      <Image
        src={bgImage}
        alt="Home Hero Background"
        placeholder="blur"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 bottom-36 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-freightNeoMedium">
          Oops! Page Not Found
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light font-CandideCondensedNormal">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}