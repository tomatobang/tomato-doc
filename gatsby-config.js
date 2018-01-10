module.exports = {
  siteMetadata: {
    title: `TomatoBang doc site`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./doc/`,
        name: 'markdown-pages',
      },
    },
    `gatsby-transformer-remark`,
  ],
};
