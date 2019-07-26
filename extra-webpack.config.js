module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [require("tailwindcss")]
        }
      }
    ]
  }
};
