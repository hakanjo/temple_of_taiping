const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/sketch.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public/js"),
  },
};
