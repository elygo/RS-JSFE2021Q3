const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, ''),
    // devserver
    target: "web",
    //by default dev mode
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'public') 
    },
    // with this extensions are allowed to be omitted
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
        // alias for shortening the path
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'       
        }),
        new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './src/assets/'),
                        to: path.resolve(__dirname, './public/assets')
                    }
                ]
            }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        overlay: true,
        stats: 'errors-only',
        clientLogLevel: 'none'
      },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ 
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [  
                    {
                        loader: "style-loader"
                      },
                      {
                        loader: "css-loader?url=false"
                      },
                      {
                        loader: "sass-loader"
                      }
                    ]
            },
            {
                test: /\.less$/i,
                use: [  
                    {
                        loader: "style-loader",
                      },
                      {
                        loader: "css-loader",
                      },
                      {
                        loader: "less-loader",
                        options: {
                          lessOptions: {
                            javascriptEnabled: true
                          },
                        },
                      }
                    ]
            },
            {
                test: /\.(svg|png|gif|jpg|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './public/assets/img/',
                        publicPath:'./src/assets/img/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}