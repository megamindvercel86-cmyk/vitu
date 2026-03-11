import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"], // Prevent search engines from indexing sensitive areas
      },
    ],
    sitemap: ["https://viturealty.com/sitemap.xml"],
    host: "https://viturealty.com",
  };
}
