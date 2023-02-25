const path = require( 'path' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	...defaultConfig,
	entry: {
		'wasm-block': path.resolve( process.cwd(), `src/index` ),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.[tjmc]sx?$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/,
			},
			{
				// https://github.com/webpack/webpack/issues/7352
				test: /\.wasm$/,
				loader: 'file-loader',
				options: {
					publicPath: 'src/wasm/',
				},
			},
		],
		...defaultConfig.module,
	},
	experiments: {
		asyncWebAssembly: true,
		syncWebAssembly: true,
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin( {
			patterns: [
				{
					from: 'src/wasm/hello.wasm',
					to: '[name].[ext]',
				},
			],
		} ),
	],
};
