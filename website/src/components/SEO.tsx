import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Head>
  );
}
