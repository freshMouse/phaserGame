module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname+ "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /.png$/,
        loader: "file-loader",
        exclude: /node_modules/
      }
    ]
  }
}
