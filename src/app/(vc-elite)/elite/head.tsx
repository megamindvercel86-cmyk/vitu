export default function Head() {
  const title =
    "Vaikuntam City Elite – Luxury Villa Plots in Mangaluru | Vitu Realty";
  const description =
    "Discover Vaikuntam City Elite, an exclusive enclave of 11 luxury villa plots in Mangaluru. Experience premium living with 38.3% parks & open spaces, vastu-aligned plots, and world-class amenities. Developed by Vitu Realty.";
  const image =
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8";
  const canonical = "https://www.viturealty.com/elite";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Vitu-Realty" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Vaikuntam City Elite - Luxury Villa Plots in Mangaluru"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
