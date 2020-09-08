require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: `Dragoș Străinu`,
    siteTitleAlt: `Dragoș Străinu blog`,
    siteHeadline: `Dragoș Străinu blog`,
    siteUrl: `https://strdr4605.github.io`,
    siteDescription: `I am Dragoș (Dragosh), a Front-end Software Engineer. I write about practical and philosophical parts of Software Engineering. Follow me on twitter [@strdr4605](https://twitter.com/strdr4605) to get updates about latest posts.`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `@strdr4605`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        mdx: false,
        feedTitle: `Dragoș Străinu blog`,
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Resume`,
            slug: `/resume`,
          },
        ],
        externalLinks: [
          {
            name: `Github`,
            url: `https://github.com/strdr4605/`,
          },
          {
            name: `Twitter`,
            url: `https://twitter.com/strdr4605/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `remark-autolink-headers`,
            },
          },
          { resolve: `gatsby-plugin-my-social-cards` },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-171697116-1`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dragoș Străinu blog`,
        short_name: `strdr4605-blog`,
        description: `Blog of a front-end software engineer`,
        start_url: `/`,
        background_color: `#FFFFF8`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sass`,
  ],
};
