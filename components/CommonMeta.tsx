export default function CommonMeta() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={process.env.twitterCreator} />
      <meta name="theme-color" content="#FAF181" />
    </>
  );
}
