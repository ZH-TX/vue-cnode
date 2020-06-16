module.exports={
    configureWebpack:{
        resolve:{
            extensions:['.js','.css','.vue'],
            alias:{
               'assets':'@/assets',
               'components':'@/components',
               'network':'@/network',
               'router':'@/router',
               'store':'@/store',
               'views':'@/views',

            }
        }
    },
    devServer:{
        proxy:{
            '/a':{
                target:'https://cnodejs.org/api/v1',
                secure: true,
                changeOrigin:true,
                // pathRewrite:{
                //     '^/api':'/api'
                // }
                
                
            }
        }
    }
}