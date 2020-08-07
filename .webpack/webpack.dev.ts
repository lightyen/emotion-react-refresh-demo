import HtmlWebpackPlugin from "html-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import TsPathsResolvePlugin from "ts-paths-resolve-plugin"
import path from "path"

const outputJS = "js"
const src = path.resolve(process.cwd(), "src")
const join = (...args: string[]) => path.join(...args).replace(path.sep, "/")

export default {
	mode: "development",
	target: "web",
	devtool: "inline-source-map",
	output: {
		filename: join(outputJS, "[name].js?[hash]"),
		chunkFilename: join(outputJS, "[name].js?.[hash:8]"),
		publicPath: "/",
	},
	entry: path.join(src, "index.tsx"),
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
		plugins: [new TsPathsResolvePlugin({ tsConfigPath: path.resolve(src, "tsconfig.json") })],
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
			{
				test: /\.tsx?$/,
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
					{
						loader: "ts-loader",
						options: {
							happyPackMode: true,
						},
					},
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
