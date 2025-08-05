import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Noto_Serif,
  Source_Sans_3,
  Tenor_Sans,
} from "next/font/google";
import localFont from "next/font/local";

const FS_Siena_Regular = localFont({
  src: "./fonts/FS_Siena_Regular.ttf",
  variable: "--font-fs-siena",
});

const FS_Split_Sans_Trial_Regular = localFont({
  src: "./fonts/FS_Split_Sans_Trial_Regular.otf",
  variable: "--font-fs-split-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-geist-serif",
  subsets: ["latin"],
});
const tenorSans = Tenor_Sans({
  variable: "--font-tenor-sans",
  subsets: ["latin"],
  weight: "400",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: "400",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

export {
  FS_Siena_Regular,
  FS_Split_Sans_Trial_Regular,
  geistSans,
  geistMono,
  notoSerif,
  tenorSans,
  hankenGrotesk,
  sourceSans3,
};
