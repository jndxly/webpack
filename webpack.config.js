

var htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
   filename: "[name].[contenthash].css",
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
            test: /layer\.html$/,
            loader:'ejs-loader'
        },{
            test:/\.js/,
            use:[
                "babel-loader"
            ],
            include:__dirname + '/src/',
            exclude:__dirname + '/node_modules/'
        },{

            test: /\.css$/,
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
        },{
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development 
                fallback: "style-loader"
            })
        }
        
            
        ]
    },

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
        extractLess
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