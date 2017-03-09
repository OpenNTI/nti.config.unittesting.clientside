/*eslint no-var: 0 strict: 0*/
'use strict';
var path = require('path');
var webpack = require('webpack');
var webpack1 = /^1/.test(require('webpack/package.json').version);

var main = module.parent;
var projectRoot = main ? path.dirname(main.filename) : __dirname;

var root = path.resolve(projectRoot, 'src', 'main', 'js');
var modules = path.resolve(projectRoot, 'node_modules');
var packageName = require(path.resolve(projectRoot, 'package.json')).name;

module.exports = exports = {
	basePath: '',
	frameworks: ['jasmine'],
	files: [
		'src/test/**/*.js'
	],

	preprocessors: {
		'src/test/**/*.js': ['webpack', 'sourcemap']
	},

	coverageReporter: {
		dir: 'reports/coverage/',
		reporters: [
			{ type: 'html', subdir: 'html' },
			{ type: 'lcov', subdir: 'lcov' },
			{ type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
			{ type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
			{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
			{ type: 'text', subdir: '.', file: 'text.txt' },
			{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
		]
	},

	htmlReporter: {
		outputDir: 'reports',
		reportName: 'test-results'
	},

	junitReporter: {
		outputDir: 'reports/test-results/',
		outputFile: 'index.xml',
		suite: packageName,
		useBrowserName: false
	},


	exclude: [],
	port: 8090,
	colors: true,
	autoWatch: false,
	browsers: ['PhantomJS'],
	// browsers: ['Chrome'], //to use, you will need: `npm install karma-chrome-launcher`

	// other possible values: 'dots', 'progress', 'junit', 'html', 'coverage'
	reporters: ['mocha'],
	captureTimeout: 60000,
	browserDisconnectTimeout : 100000,
	browserNoActivityTimeout : 100000,
	singleRun: true,


	webpackServer: {
		noInfo: false,
		stats: {
			version: false,
			hash: false,
			timings: false,
			assets: false,
			chunks: false,
			chunkModules: false,
			chunkOrigins: false,
			modules: false,
			cached: false,
			cachedAssets: false,
			showChildren: false,
			source: false,

			colors: true,
			reasons: true,
			errorDetails: true
		}
	},

	webpack: {
		entry: () => ({}),
		node: {
			crypto: 'empty',
			net: 'empty',
			tls: 'empty'
		},

		resolve: {
			modules: [root, modules],
			extensions: ['.async.jsx', '.jsx', '.js', '.css', '.scss', '.html']
		},

		plugins: [
			new webpack.DefinePlugin({SERVER: false})
		],

		module: {
			rules: [
				{
					test: /\.js(x?)$/i,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						plugins: [
							["istanbul", {
								exclude: [
									"node_modules",
									"**/*.spec.js"
								]
							}]
						]
					}
				},

				{
					test: /\.(html?|sass|s?css|ico|gif|png|jpg|svg|eot|ttf|woff)$/,
					loader: 'null-loader'
				}
			]
		}
	}
};

if (webpack1) {
	const {webpack: wp} = exports;
	wp.resolve.extensions.unshift('');
	wp.resolve.root = wp.resolve.modules;
	delete wp.resolve.modules;

	const loaders = wp.module.loaders = wp.module.rules;
	delete wp.module.rules;
	loaders.push({ test: /\.json$/, loader: 'json-loader' });
}
