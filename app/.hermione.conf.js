const path = require('path');
const { browsers } = require('./browsers');

module.exports = {
	baseUrl: 'http://localhost:3000',

    browsers,

    screenshotsDir: test => path.join(path.dirname(test.file), 'screens', test.id(), test.browserId),

    sets: {
        common: {
			files: 'e2e-tests/**/*@common.hermione.js',
			browsers: ['chrome', 'firefox', 'iphone8', 'ipad']
		},
        behaviour: {
			files: 'e2e-tests/**/*@behaviour.hermione.js',
			browsers: ['chrome']
		},
        desktop: {
			files: 'e2e-tests/**/*@desktop.hermione.js',
			browsers: ['chrome', 'firefox']
		},
		phone: {
			files: 'e2e-tests/**/*@phone.hermione.js',
			browsers: ['iphone8', 'ipad']
		}
    },

    plugins: {
        'html-reporter/hermione': {
            enabled: true,
            path: 'hermione/reports',
            defaultView: 'failed',
		},
	},
};