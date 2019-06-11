module.exports = {
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    transpileDependencies: [
        /\bvue-echarts\b/,
        /\bresize-detector\b/
    ],
    devServer: {
        host: '0.0.0.0',
        hot: true,
        compress: true,
        // proxy: 'http://172.16.11.247:8089',
        proxy: {
            '/server': {
                target: 'https://dmp.yibangcredit.com'
                // target: 'http://moon.free.idcfengye.com/'
            },
            '/toolkit': {
                // target: 'http://172.16.11.0:18001'
                target: 'https://dmp.yibangcredit.com'
            },
            '/node': {
                target: 'http://127.0.0.1:7001'
            }
        }
    }
}
