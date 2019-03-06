function progressBar() {
	return {
		controller: function($scope, ProgressBarService) {

			function init() {
				angular.extend($scope, {
					_show: false,
					show: function(showOption) {
						this._show = showOption;
					}
				});

				subscribeToEvents();
			}

			init();


			function subscribeToEvents() {
				ProgressBarService.onShow(function() {
					$scope.show(true);
				});

				ProgressBarService.onHide(function() {
					$scope.show(false);
				});
			}


		},
		template: `
			<uib-progressbar 
				ng-show="_show"
				class="progress-striped active" 
				type="primary">
			</uib-progressbar>`
	}
}

module.exports = {
	name: 'progressBar',
	func: progressBar
}