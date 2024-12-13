module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{ico,html,png,txt,js,css,svg}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};