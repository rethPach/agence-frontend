var elixir = require('laravel-elixir');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.config.assetsPath = '';
elixir.config.css.folder = '';
elixir.config.js.folder = '';

elixir(function(mix) {
	mix
		.styles([
			'dist/css/cosmo.theme.css',
			'dist/css/font-awesome.css',
			'dist/css/simple-sidebar.css'
		], 'dist/vendors/vendor.css')

		.scripts([
			"node_modules/chart.js/dist/Chart.min.js",
			"node_modules/angular-chart.js/dist/angular-chart.min.js",
			"dist/js/chart-config.js",
			"dist/js/array-config.js"
		], 'dist/vendors/vendor.js')
		.browserify('app.js', 'dist/app.js', 'src');
});