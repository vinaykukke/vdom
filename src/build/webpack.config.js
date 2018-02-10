const path = require('path');
const babelConf = require('./.babelrc.json');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
	entry: path.resolve(__dirname, '..', 'client', 'index.tsx'),
	output: {
		path: path.resolve('dist'),
		filename: 'client.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelConf
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		]
	},
	plugins: [
		new ProvidePlugin({
			h: path.resolve(__dirname, '..', 'lib', 'hyperscript'),
		}),
	],
	resolve: {
		alias: {
			Lib: path.resolve(__dirname, '..', 'lib'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '*'],
	}
};
