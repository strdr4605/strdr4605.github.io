require(`dotenv`).config({
  path: `.env`,
})

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
  ],
}
