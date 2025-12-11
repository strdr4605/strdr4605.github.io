const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const rewrites = async () => {
    return [
      {
        source: "/planable-wrapped",
        destination: "/planable-wrapped/index.html",
      },
    ];
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        SITE_URL: "http://localhost:4605",
        twitterCreator: "@strdr4605",
      },
      reactStrictMode: true,
      rewrites,
    };
  }

  return {
    env: {
      SITE_URL: "https://strdr4605.com",
      twitterCreator: "@strdr4605",
    },
    reactStrictMode: true,
    rewrites,
  };
};
