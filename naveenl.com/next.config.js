const withSass = require('@zeit/next-sass');
module.exports = withSass({
    publicRuntimeConfig: {
        mapBox: {
            MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN
        }
    }
});