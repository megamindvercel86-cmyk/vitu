"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function ZohoJobsEmbed() {
  useEffect(() => {
    // @ts-ignore
    if (window.rec_embed_js) {
      // @ts-ignore
      window.rec_embed_js.load({
        widget_id: "rec_job_listing_div",
        page_name: "Careers",
        source: "CareerSite",
        site: "https://viturealty.zohorecruit.in",
        brand_color: "#4F3737",
        empty_job_msg: "No current Openings",
      });
    }
  }, []);

  return (
    <div className="px-6 md:px-8 xl:px-[17.312rem] lg:px-[8.250rem] w-full py-[4.125rem] lg:py-[3.938rem] xl:py-[8.938rem]">
      <h1 className="text-customBrown font-FreightNeoProBold text-3xl md:text-4xl lg:text-6xl leading-tight mb-8 md:mb-12 text-center">
        Current Openings
      </h1>
      <link
        rel="stylesheet"
        href="https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css"
        type="text/css"
      />
  <style>{`
  /* Override Zoho's default backgrounds to be completely transparent for outer containers only */
  .embed_jobs_head, 
  .embed_jobs_with_style_3, 
  .embed_jobs_head2, 
  #rec_job_listing_div {
    background-color: transparent !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .embed_jobs_head3 {
    background-color: transparent !important;
    background: transparent !important;
  }

  /* Restore white background for Job Cards */
  #rec_job_listing_div .rec-job-info {
    background-color: #ffffff !important;
    border-radius: 8px !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
  }

  /* Apply the PERMANENT distinct border directly to the input fields */
  #rec_job_listing_div .rec-what-where .searchWhat input,
  #rec_job_listing_div .rec-what-where .searchWhere input,
  #rec_job_listing_div .rec-what-where input[type="text"] {
    border: 2px solid #A17F5F !important;
    border-radius: 8px !important;
  }
  
  /* Ensure the wrappers don't have unnecessary styling */
  #rec_job_listing_div .rec-what-where .searchWhat,
  #rec_job_listing_div .rec-what-where .searchWhere {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* Match Typography */
  #rec_job_listing_div {
    font-family: "Freight Neo Pro Medium", sans-serif !important;
    color: #04070799 !important;
  }
  
  #rec_job_listing_div a {
    color: #4F3737 !important;
    text-decoration: none !important;
  }

  #rec_job_listing_div .rec-job-title,
  #rec_job_listing_div .cw-job-title,
  #rec_job_listing_div h2,
  #rec_job_listing_div h3 {
     font-family: "Freight Neo Pro Bold", sans-serif !important;
     color: #4F3737 !important;
  }

  /* Search button */
  #rec_job_listing_div .searchButton,
  #rec_job_listing_div .searchButton > button,
  #rec_job_listing_div button.rec-search-btn,
  body #rec_job_listing_div button {
    background-color: #4F3737 !important;
    color: #ffffff !important;
    border-radius: 999px !important;
    border: none !important;
  }

  /* Checkboxes */
  #rec_job_listing_div input[type="checkbox"] {
     accent-color: #4F3737 !important;
  }
  
  #rec_job_listing_div .active,
  #rec_job_listing_div .rec-active {
     color: #4F3737 !important;
     border-color: #4F3737 !important;
  }
  
  #rec_job_listing_div button:hover {
     opacity: 0.9 !important;
  }

  /* Search Bar and Dropdowns — NO margin-bottom here */
  #rec_job_listing_div input[type="text"],
  #rec_job_listing_div input[type="search"],
  #rec_job_listing_div select,
  #rec_job_listing_div .rec-search-input,
  #rec_job_listing_div .cw-search-input {
    background-color: #F8F6F5 !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 8px !important;
    padding: 12px 16px !important;
    font-family: "Freight Neo Pro Medium", sans-serif !important;
    color: rgba(4, 7, 7, 0.8) !important;
    font-size: 1.125rem !important;
    width: 100% !important;
    box-sizing: border-box !important;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.02) !important;
    transition: all 0.2s ease !important;
  }

  /* Remove focus border */
  #rec_job_listing_div input[type="text"]:focus,
  #rec_job_listing_div input[type="search"]:focus,
  #rec_job_listing_div select:focus,
  #rec_job_listing_div .rec-what-where .searchWhat:focus-within,
  #rec_job_listing_div .rec-what-where .searchWhere:focus-within {
    outline: none !important;
    border-color: inherit !important;
    box-shadow: none !important;
  }

  /* Search wrap alignment */
  #rec_job_listing_div .rec-search-wrap,
  #rec_job_listing_div .cw-search-wrap,
  #rec_job_listing_div .cw-filter-section {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 16px !important;
    align-items: center !important;
    margin-bottom: 32px !important;
    padding-bottom: 16px !important;
    border-bottom: 1px dashed rgba(0,0,0,0.1) !important;
  }

  #rec_job_listing_div ::placeholder {
    color: rgba(4, 7, 7, 0.5) !important;
    font-family: "Freight Neo Pro Medium", sans-serif !important;
  }

  /* ============ DESKTOP: add margin-bottom on inputs ============ */
  @media (min-width: 769px) {
    #rec_job_listing_div input[type="text"],
    #rec_job_listing_div input[type="search"],
    #rec_job_listing_div select,
    #rec_job_listing_div .rec-search-input,
    #rec_job_listing_div .cw-search-input {
      margin-bottom: 1rem !important;
    }
  }

  /* ============ MOBILE ============ */
  @media (max-width: 768px) {
    /* Zero out ALL spacing between inputs */
    #rec_job_listing_div input[type="text"],
    #rec_job_listing_div input[type="search"],
    #rec_job_listing_div select,
    #rec_job_listing_div .rec-search-input,
    #rec_job_listing_div .cw-search-input {
      margin-bottom: 0 !important;
      margin-top: 0 !important;
    }

    #rec_job_listing_div .rec-what-where,
    #rec_job_listing_div .cw-search-wrap,
    #rec_job_listing_div .rec-search-wrap {
      flex-direction: column !important;
      gap: 8px !important;
    }

    #rec_job_listing_div .rec-what-where > div,
    #rec_job_listing_div .rec-what-where .searchWhat,
    #rec_job_listing_div .rec-what-where .searchWhere {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    #rec_job_listing_div .searchButton,
    #rec_job_listing_div .searchButton > button {
      width: 100% !important;
      margin: 0 !important;
    }

    #rec_job_listing_div .rec-left-panel,
    #rec_job_listing_div .rec-right-panel,
    #rec_job_listing_div .cw-filter-section {
      width: 100% !important;
      float: none !important;
      max-width: 100% !important;
    }

    #rec_job_listing_div .rec-job-info {
      padding: 16px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 6px !important;
    }
    
    /* Force elements inside the job card to stop floating side-by-side */
    #rec_job_listing_div .rec-job-info * {
      float: none !important;
      text-align: left !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    #rec_job_listing_div .rec-job-title,
    #rec_job_listing_div .cw-job-title {
      font-size: 1.125rem !important;
      line-height: 1.2 !important;
      margin-bottom: 4px !important;
    }

    /* Reduce font sizes for location, type, date, and description */
    #rec_job_listing_div .rec-job-info span,
    #rec_job_listing_div .rec-job-info p,
    #rec_job_listing_div .rec-job-info div:not(.rec-job-title) {
      font-size: 0.85rem !important;
      line-height: 1.4 !important;
      white-space: normal !important;
    }
  }
`}</style>

      <div className="embed_jobs_head embed_jobs_with_style_3 bg-transparent w-full">
        <div className="embed_jobs_head2 bg-transparent w-full">
          <div className="embed_jobs_head3 bg-transparent w-full p-3 sm:p-5 md:p-[40px]" style={{ border: "2px solid #A17F5F", borderRadius: "12px" }}>
            <div id="rec_job_listing_div" className="bg-transparent w-full"></div>
            
            <Script
              src="https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js"
              strategy="afterInteractive"
              onLoad={() => {
                // @ts-ignore
                if (window.rec_embed_js) {
                  // @ts-ignore
                  window.rec_embed_js.load({
                    widget_id: "rec_job_listing_div",
                    page_name: "Careers",
                    source: "CareerSite",
                    site: "https://viturealty.zohorecruit.in",
                    brand_color: "#4F3737",
                    empty_job_msg: "No current Openings",
                  });
                }

                let attempts = 0;
                const interval = setInterval(() => {
                  const container = document.getElementById("rec_job_listing_div");
                  if (!container) return;

                  const btns = container.querySelectorAll<HTMLElement>(
                    ".searchButton, .searchButton button, .rec-search-btn, " +
                    "button[class*='search'], input[type='button'], button[type='button']"
                  );

                  btns.forEach((el) => {
                    el.setAttribute("style",
                      "background-color: #4F3737 !important; " +
                      "color: #ffffff !important; " +
                      "border: none !important; " +
                      "border-radius: 999px !important;"
                    );
                  });

                  if (attempts++ >= 20) clearInterval(interval);
                }, 500);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}