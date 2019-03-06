function ProgressBarService($rootScope) {

	this.addSubscriber = function(event, handler) {
		return $rootScope.$on(event, handler);
	}

	this.emit = function(eventName, eventData) {
		$rootScope.$emit(eventName, eventData);
	}

	this.onShow = function(handler) {
		this.addSubscriber('onShow', handler);
	}

	this.onHide = function(handler) {
		this.addSubscriber('onHide', handler);
	}

	this.show = function() {
		this.emit('onShow', {});
	}

	this.hide = function() {
		this.emit('onHide', {});
	}

}

module.exports = {
	name: 'ProgressBarService',
	func: ProgressBarService
}