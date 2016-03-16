const baseConfig = require('./index');

module.exports = function (config) {
	baseConfig.webpack.resolve.root = void 0;

	config.set(Object.assign(baseConfig, {
		files: [
			'test/**/*.js'
		],

		preprocessors: {
			'test/**/*.js': ['webpack', 'sourcemap']
		},
	}));
};
