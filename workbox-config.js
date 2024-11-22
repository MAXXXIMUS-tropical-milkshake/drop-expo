module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,png,ttf,ico,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};