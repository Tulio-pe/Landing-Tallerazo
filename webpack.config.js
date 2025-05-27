const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {                plugins: [
                  require('tailwindcss')(),
                  require('autoprefixer')(),
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
