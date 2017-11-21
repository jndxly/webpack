

var htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

const extractLess = new ExtractTextPlugin({
   filename: "layer.css",
   disable: process.env.NODE_ENV === "development"
});

module.exports = {
    
    entry:'./src/app.js',
    output:{

        path:__dirname + '/dist',
        filename:'js/bundle.js'
    },

    module:{
        rules:[{
            test: /\.html$/,
            use:[
                "html-loader"
            ]
        },{
            test: /\.tpl$/,
            loader:'ejs-loader'
        },{
            test:/\.js/,
            use:[
                "babel-loader"
            ],
            include:__dirname + '/src/',
            exclude:__dirname + '/node_modules/'
        },
        {

            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        },
        // {
        //     test: /\.(css|scss)$/,
        //     use: ExtractTextPlugin.extract({
        //         fallback: 'style-loader',
        //         use: ['css-loader', 'postcss-loader', 'sass-loader']
        //     })
        // },


        {
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development 
                fallback: "style-loader"
            })
        },{
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    limit:2000
                }  
              },{
                  loader:'image-webpack-loader'
              }
            ]
            
            
              

        }
        
            
        ]
    },

    // resolve: {
    //     modules: [
    //         'node_modules',
    //         'assets/sprite' //css在哪里能找到sprite图
    //     ]
    // },

   


    plugins:[
        new htmlWebpackPlugin({
            template:"index.html",
            filename:'index.html',
            inject:'body',
        // chunks:["a","main"],
            title:'webpack-demo1',
            date:new Date(),
            minify:{
                removeComments:true,
                collapseInlineTagWhitespace:true
            }
        }),
        extractLess,
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/ico'),  //准备合并成sprit的图片存放文件夹
                glob: '*.png'  //哪类图片
            },
            target: {
                image: path.resolve(__dirname, 'src/assets/sprites.png'),  // sprite图片保存路径
                css: path.resolve(__dirname, 'src/assets/_sprites.css')  // 生成的sass保存在哪里
            },
            apiOptions: {
                cssImageRef: "~sprite.png" //css根据该指引找到sprite图
            }
        })
        // new htmlWebpackPlugin({
        //     template:"index.html",
        //     filename:'b.html',
        //     inject:false,
        // chunks:["b","main"],
        //     title:'webpack-demo1',
        //     date:new Date(),
        //     minify:{
        //         removeComments:true,
        //         collapseInlineTagWhitespace:true
        //     }
        // }),
        // new htmlWebpackPlugin({
        //     template:"index.html",
        //     filename:'c.html',
        //    inject:false,
        // chunks:["c","main"],
        //     title:'webpack-demo1',
        //     date:new Date(),
        //     minify:{
        //         removeComments:true,
        //         collapseInlineTagWhitespace:true
        //     }
        // })
    ]

    


};