const browsers = {
    iphone8: {
        desiredCapabilities: {
            browserName: 'chrome',
            version: '67.0',
            chromeOptions: {
                mobileEmulation: {
                    deviceMetrics: {
                        width: 375,
                        height: 667,
                        pixelRatio: 2.0,
                    },
                    userAgent: [
                        'Mozilla/5.0',
                        '(iPhone; CPU iPhone OS 10_1_1 like Mac OS X)',
                        'AppleWebKit/602.2.14',
                        '(KHTML, like Gecko)',
                        'Version/10.0',
                        'Mobile/14B100',
                        'Safari/602.1',
                    ].join(' '),
                },
            },
        },
        meta: { platform: 'touch-phone' },
        calibrate: true,
        compositeImage: true,
        screenshotDelay: 600,
        screenshotMode: 'viewport',
    },
    ipad: {
        desiredCapabilities: {
            browserName: 'chrome',
            version: '67.0',
            chromeOptions: {
                mobileEmulation: {
                    deviceMetrics: {
                        width: 1024,
                        height: 768,
                        pixelRatio: 2.0,
                    },
                    userAgent: [
                        'Mozilla/5.0',
                        '(iPhone; CPU iPhone OS 10_1_1 like Mac OS X)',
                        'AppleWebKit/602.2.14',
                        '(KHTML, like Gecko)',
                        'Version/10.0',
                        'Mobile/14B100',
                        'Safari/602.1',
                    ].join(' '),
                },
            },
        },
        meta: { platform: 'touch-phone' },
        calibrate: true,
        compositeImage: true,
        screenshotDelay: 600,
        screenshotMode: 'viewport',
    },
    chrome: {
        desiredCapabilities: {
            browserName: 'chrome',
            version: '67.0',
        },
        calibrate: false,
        compositeImage: true,
        meta: { platform: 'desktop' },
        windowSize: '1280x1024',
    },
    firefox: {
        desiredCapabilities: {
            browserName: 'firefox',
            version: '64.0',
            acceptInsecureCerts: true,
        },
        testsPerSession: 5,
        calibrate: false,
        compositeImage: true,
        w3cCompatible: true,
        meta: { platform: 'desktop' },
        windowSize: '1280x1024',
    },
};

module.exports = {
    browsers,
};
