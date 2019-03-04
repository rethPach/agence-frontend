function Modulo(angular, settings) {
	this.setAngular(angular);
    this.setAttrs(settings);
    this.setModule();
    this.loadConfig();
    this.loadRun();
    this.loadProviders();
    this.loadFactories();
    this.loadServices();
    this.loadDirectives();
    this.loadControllers();
}

Modulo.prototype = {

	setAngular: function(angular) {
		this.angular = angular;
	},

	setAttrs: function(settings) {
		this.attrs = this.angular.extend({
			dependencies: [],
			services: [],
			factories: [],
			directives: [],
			providers: [],
			controllers: [],
			config: this.angular.noop,
			run: this.angular.noop
		}, settings);
	},

	setModule: function(angular) {
		this.modulo = this.angular.module(
			this.attrs.name, 
			this.attrs.dependencies
		);
	},

	loadConfig: function() {
		this.modulo.config(this.attrs.config);
	},

	loadRun: function() {
		this.modulo.run(this.attrs.run);
	},

	loadProviders: function() {
		var _this = this;
		this.attrs.providers.forEach(function(provider) {
			_this.modulo.provider(provider.name, provider.func);
		});
	},

	loadFactories: function() {
		var _this = this;
		this.attrs.factories.forEach(function(factory) {
			_this.modulo.factory(factory.name, factory.func);
		});
	},

	loadServices: function() {
		var _this = this;
		this.attrs.services.forEach(function(service) {
			_this.modulo.service(service.name, service.func);
		});
	},

	loadDirectives: function() {
		var _this = this;
		this.attrs.directives.forEach(function(directive) {
			_this.modulo.directive(directive.name, directive.func);
		});
	},

	loadControllers: function() {
		var _this = this;
		this.attrs.controllers.forEach(function(controller) {
			_this.modulo.controller(controller.name, controller.func);
		});
	},

	getNameModule: function() {
		return this.attrs.name;
	}

}

module.exports = {
	create: function(angular, settings) {
		var modulo = new Modulo(angular, settings);
		return modulo.getNameModule();
	}
};