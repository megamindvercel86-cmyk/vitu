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

  // 3. Fetch dynamic properties (Standard Projects)
  const properties = await getProperties();
  const dynamicPropertyRoutes = properties.map((property) => ({
    url: `${BASE_URL}/projects/${property.slug}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "monthly" as const,
    // Keep standard projects at 0.7 so Elite (1.0) wins
    priority: 0.7, 
  }));

  // 4. Fetch articles
  const articles = await getArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${BASE_URL}/resources/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Return Elite page FIRST in the array
  return [eliteLandingPage, ...staticRoutes, ...dynamicPropertyRoutes, ...articleRoutes];
}

// --- Helper Functions (Keep as they were) ---
async function getProperties() {
  return [
    { slug: "sea-view-residency", updatedAt: "2024-03-15" },
    { slug: "diamond-heights", updatedAt: "2024-02-20" },
    // Note: If 'vaikuntam-city-elite' is in your DB, it will generate 
    // a /projects/ url too. That is fine, but the landing page 
    // defined above will have the higher priority (1.0 vs 0.7).
  ];
}

async function getArticles() {
  return [
    { slug: "mangalore-property-market-trends", updatedAt: "2024-03-10" },
    { slug: "home-loan-guide", updatedAt: "2024-03-01" },
  ];
}