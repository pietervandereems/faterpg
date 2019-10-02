const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/sheet.js',
    output: {
        filename: 'bundle.js',
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        modules: ['../node_modules']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // disable: true, // webpack@2.x and newer
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    devServer: {
        // eslint-disable-next-line no-undef
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        open: true,
        openPage: '/sheet.html',
        compress: true,
        port: 9000
    }
};
