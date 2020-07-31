const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const path = require("path")

/** @type {import("webpack").Configuration}  */
module.exports = {
	mode: "development",
	target: "web",
	devtool: "inline-source-map",
	output: {
		path: path.resolve("./build"),
		publicPath: "/",
	},
	entry: "./src/index.jsx",
	resolve: {
		extensions: [".js", ".jsx", ".json"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: "src/index.ejs",
			isDevelopment: process.env.NODE_ENV === "development",
		}),
		new ReactRefreshWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(".cache"),
						},
					},
					"thread-loader",
					"babel-loader",
				],
			},
		],
	},
	devServer: {
		hot: true,
		compress: true,
		open: true,
		contentBase: false,
		historyApiFallback: true,
	},
}
