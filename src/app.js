var angular = require('angular');
var factory = require('./core/ModuleFactory');
var loaderState = require('./core/LoaderState');

factory.create(angular, {
	name: 'agence-app',
	dependencies: [
		require('angular-ui-bootstrap'),
		require('angular-ui-router'),
		'chart.js'
	],
	directives: [
		require('./directives/progress-bar/progress-bar.directive'),
		require('./directives/nz-periodo/nz-periodo'),
		require('./directives/nz-select-multi/nz-select-multi'),
	],
	factories: [
		require('./http/optimus'),
		require('./http/iron-hide-response'),
		require('./http-services/consultores/relatario-service'),
		require('./http-services/consultores/grafico-service'),
		require('./http-services/consultores/pizza-service'),
		require('./http-services/consultores/ganancias-netas-service'),
		require('./services/calendar'),
		require('./services/ganancias-netas-presenter'),
		require('./services/grafico-barras'),
		require('./services/grafico-control'),
		require('./services/periodo'),
		require('./services/pizza'),
		require('./services/relatario'),
		require('./services/select-multi')
	],
	services: [
		require('./http/iron-hide'),
		require('./http-services/consultores/lista-consultores'),
		require('./services/modal-factory.service'),
		require('./directives/progress-bar/progress-bar.service')
	],
	run: function ($state) {
  	//$state.go('ganancias-netas');
	},
	config: function($stateProvider) {
		registerStates($stateProvider);
	}
});

function registerStates($stateProvider) {
  var states = [
  	require('./states/agence-home'),
  	require('./states/ganancias-netas')
	];

  loaderState.load(states, $stateProvider); 
}
