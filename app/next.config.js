if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
};

module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    publicRuntimeConfig: {
        baseUrl: process.env.BASE_URL,
        apiUrl: process.env.API_URL,
        apiPrefix: process.env.API_PREFIX
    },
    serverRuntimeConfig: {
        baseUrl: process.env.BASE_URL,
        apiUrl: process.env.API_URL,
        apiPrefix: process.env.API_PREFIX
    },
    webpack(config) {
        // Allows you to load Electron modules and
        // native Node.js ones into your renderer
        // config.target = 'electron-renderer'
        return config
    },
    exportPathMap() {
        // Let Next.js know where to find the entry page
        // when it's exporting the static bundle for the use
        // in the production version of your app
        // return {
        //     '/start': { page: '/start' }
        // }
    }
}
