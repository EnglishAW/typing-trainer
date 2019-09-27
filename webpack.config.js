const HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
module.exports = {
    entry: ['./src/bootstrap.tsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './bundle.js',
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'eval',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // Handle .ts and .tsx file via ts-loader.
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        // New plugin
        new HtmlWebpackPlugin(),
    ],
}
