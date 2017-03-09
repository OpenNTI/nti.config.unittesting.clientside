const baseConfig = require('./index');

module.exports = function (config) {
	baseConfig.webpack.resolve.modules = void 0;

	config.set(Object.assign(baseConfig, {
		files: [
			'test/**/*.js'
		],

		preprocessors: {
			'test/**/*.js': ['webpack', 'sourcemap']
		},
	}));
};
