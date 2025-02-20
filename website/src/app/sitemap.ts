import { MetadataRoute } from "next";

const BASE_URL = "https://www.viturealty.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes = [
    "",
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

  // Fetch dynamic properties
  const properties = await getProperties();
  const dynamicPropertyRoutes = properties.map((property) => ({
    url: `${BASE_URL}/projects/${property.slug}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Fetch blog/resources articles
  const articles = await getArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${BASE_URL}/resources/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicPropertyRoutes, ...articleRoutes];
}

// Replace these with actual API/DB calls
async function getProperties() {
  return [
    { slug: "sea-view-residency", updatedAt: "2024-03-15" },
    { slug: "diamond-heights", updatedAt: "2024-02-20" },
  ];
}

async function getArticles() {
  return [
    { slug: "mangalore-property-market-trends", updatedAt: "2024-03-10" },
    { slug: "home-loan-guide", updatedAt: "2024-03-01" },
  ];
}
