"use client";

import React from "react";
import Typography from "../Typography/Typography";
import { Download } from "../Icons/Icons";
import Image from "next/image";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function MediaSectionIntro() {
  const downloadData = [
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/pdfs%2FVITU%20Realty%20-%20About%20Us%20(2).pdf?alt=media&token=7ed3634d-27bc-406e-9a23-7a50dd85206f",
    "/downloadingFiles/Vitu Realty - Light BG Logos.zip",
    "/downloadingFiles/Vitu Realty - Dark BG Logos.zip",
  ];

  const handleDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder("viturealty"); // Create a folder in the ZIP

    if (!folder) {
      console.error("Failed to create folder in ZIP");
      return;
    }

    // Fetch each file and add it to the ZIP
    const filePromises = downloadData.map(async (filePath) => {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const filename = filePath.split("/").pop(); // Extract filename

      // Ensure filename is defined before adding to the folder
      if (filename) {
        folder.file(filename, blob); // Add file to the ZIP folder
      } else {
        console.error(`Could not extract filename from ${filePath}`);
      }
    });

    await Promise.all(filePromises);

    // Generate the ZIP and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "viturealty.zip");
    });
  };

  return (
    <>
      <div
        className="hidden lg:block relative mx-4 md:mx-[40px] lg2:mx-[133px] lg:mx-[70px] xl:mx-[210px] 
        mt-16 md:mt-[137px] xl:mt-[200px] 
        mb-[168px] xl:mb-[223px]"
      >
        {/* Image overlay */}
        <Image
          src={"/images/mediakit.png"}
          className="absolute right-0 lg:right-[101px] rounded-[24px] z-10
            w-[280px] md:w-[300px] lg2:w-[480px] lg:w-[400px] xl:w-[584px]
            h-[450px] md:h-[550px] lg2:h-[724px] lg:h-[624px] xl:h-[724px]
            top-[-40px] md:top-[-60px] lg:top-[-99px] object-cover"
          alt="Media Kit"
          width={584}
          height={724}
        />
        {/* Background div */}
        <div
          className="relative w-full bg-[#AE8566] rounded-[24px] z-0
          xl:px-[105px] md:px-16 py-8 md:py-[40px] lg2:py-[106px] lg:py-[60px]"
        >
          <div className="w-[50%]">
            <Typography
              variant="custom"
              className="text-[32px] md:text-[45px] lg:max-w-[70%] lg2:max-w-[85%] lg2:text-[60px] lg:[40px] font-freightNeoMedium text-white leading-[1]"
            >
              Need our logo or a quick intro to who we are?
            </Typography>
            <Typography variant="custom" className="text-lg md:text-xl lg2:text-2xl lg:max-w-[80%] lg:text-xl font-freightNeoMedium text-white mt-4">
              Grab our brand assets & get to know us <br /> in just a few clicks!
            </Typography>
            <button
              aria-label="Download Media Kit"
              onClick={handleDownload}
              className="flex items-center justify-center gap-4 
              w-full md:w-[272px] h-[58px] 
              text-xl md:text-2xl font-freightNeoMedium text-white 
              rounded-[34px] border-white border-[2px] mt-[49px]"
            >
              <Download />
              <span className="pt-1">Download Now</span>
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden block mt-6">
        <div className="w-full">
          {/* Card Container */}
          <div className="bg-white overflow-hidden">
            {/* Image Section */}
            <div className="relative h-[440px] md:h-[800px]">
              <Image src={"/images/mediakit.png"} className="w-full" alt="Media Kit" width={584} height={385} />
            </div>
          </div>
          <div className="h-[330px] md:h-auto bg-[#AE8566]">
            <Typography
              variant="custom"
              className="text-[32px] md:text-5xl px-7 pt-[42px] leading-[1] pb-[10px] text-center font-freightNeoMedium text-white"
            >
              Need our logo or a quick intro to who we are?
            </Typography>
            <Typography variant="custom" className="text-[14px] text-center px-7 leading-[1] font-freightNeoMedium text-white">
              Grab our brand assets & get to know us <br /> in just a few clicks!
            </Typography>
            <div className="px-7 md:pb-16 pb-0 w-full">
              <button
                aria-label="Download Media Kit"
                onClick={handleDownload}
                className="flex items-center justify-center gap-4 
                w-full md:w-[272px] h-[58px] 
                text-xl md:text-2xl font-freightNeoMedium text-white 
                rounded-[34px] border-white border-[2px] mt-[49px]"
              >
                <Download />
                <span className="pt-1">Download Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaSectionIntro;
