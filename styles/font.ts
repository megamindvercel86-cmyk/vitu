import localFont from "next/font/local";

const FS_Siena_Regular = localFont({
  src: "./fonts/FS_Siena_Regular.ttf",
  variable: "--font-fs-siena",
});

const FS_Split_Sans_Trial_Regular = localFont({
  src: "./fonts/FS_Split_Sans_Trial_Regular.otf",
  variable: "--font-fs-split-sans",
});


export {
  FS_Siena_Regular,
  FS_Split_Sans_Trial_Regular,
};