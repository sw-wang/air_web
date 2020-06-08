module.exports = {
    assetsDir: './static',
    publicPath: process.env.VUE_APP_BASE_URL,
    outputDir: process.env.VUE_APP_OUTPUT_DIR,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                target: 'https://www.joinfun-test.top/nec/api/',
                // target: 'http://192.168.50.137:9090/',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }
}
