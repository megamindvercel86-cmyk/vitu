import { MetadataRoute } from "next";

const BASE_URL = "https://www.viturealty.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. DEFINE YOUR PRIORITY PAGE (ELITE)
  const eliteLandingPage = {
    url: `${BASE_URL}/elite`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0, // MAX PRIORITY (Same as homepage)
  };

  // 2. Standard Static pages
  const staticRoutes = [
    "", // Homepage
    "/about",
    "/resources",
    "/career-application",
    "/project-enquire",
    "/general-enquire",
    "/terms-of-service",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));


  // 4. Fetch articles
 

  // Return Elite page FIRST in the array
  return [eliteLandingPage, ...staticRoutes];
}


