import { MetadataRoute } from "next";

const BASE_URL = "https://viturealty.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. PRIORITY PAGE - ELITE (Flagship Project)
  const eliteLandingPage = {
    url: `${BASE_URL}/elite`,
    lastModified: new Date(),
    changeFrequency: "daily" as const, // More frequent updates signal importance
    priority: 1.0, // MAX PRIORITY
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
    "/privacy-policy",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 3. Secondary Project - Vaikuntam City (Lower priority than Elite)
  const vaikuntamCityPage = {
    url: `${BASE_URL}/vaikuntamcity`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9, // Lower than Elite
  };

  // Return Elite page FIRST, then homepage/static routes, then Vaikuntam City
  return [eliteLandingPage, ...staticRoutes, vaikuntamCityPage];
}


