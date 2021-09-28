module.exports = {
    module: {
        rules: [
            {
                test: /\.sass$/,
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        ident: 'postcss',
                        syntax: 'postcss-scss',
                        plugins: [
                            require('postcss-import'),
                            require('tailwindcss'),
                            require('autoprefixer')
                        ]
                    }
                }
            }
        ]
    }
}
