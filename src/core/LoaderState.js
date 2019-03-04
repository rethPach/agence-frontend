function LoaderState(states) {
	this.setStates(states);
}

LoaderState.prototype = {
	states: [],
	setStates: function(states) {
		this.states = states;
	},
	hasState: function() {
		return this.states.length > 0;
	},
	load: function($stateProvider) {

		if(!this.hasState()) return;

		this.states.forEach(function(state) {
			state($stateProvider);
		});
	}
}

module.exports = {
	load: function(states, $stateProvider) {
		var loaderState = new LoaderState(states);
		loaderState.load($stateProvider);
	}
};