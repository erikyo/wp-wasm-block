const path = require( 'path' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	...defaultConfig,
	entry: {
		'wasm-block': path.resolve( process.cwd(), `src/index` ),
		'view-scripts': path.resolve( process.cwd(), `src/view-scripts` ),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.[tjmc]sx?$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/,
			},
			{
				// https://github.com/webpack/webpack/issues/7352
				test: /\.wasm$/,
				type: 'javascript/auto',
				loader: 'file-loader',
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
					to: '[name][ext]',
				},
			],
		} ),
	],
};
