function gananciasNetas($stateProvider) {
	$stateProvider.state('ganancias-netas', {
		url: '/ganancias-netas',
		controller: function($scope, ListaConsultores, 
			GananciasNetasService, GanaciasNetasPresenter, ProgressBarService) {
			function init() {
				angular.extend($scope, {
					presenter: GanaciasNetasPresenter(),
					consultarAction: consultarAction,
				});

				listaConsultoresAllAction();
			}

			function listaConsultoresAllAction() {
				ProgressBarService.show();
				listaConsultoresAllHandler({}).then(hideProgressBar);
			}

			function listaConsultoresAllHandler(command) {
				return ListaConsultores.all(command).then(setConsultores, errorHandler);
			}

			function setConsultores(response) {
				$scope.presenter.init(response);
			}

			function consultarAction() {
				if(!$scope.presenter.validateRequest()) {
					alertMe("Selecciona un consultor");
					return;
				}

				consultarHandler($scope.presenter.toRequest()).then(hideProgressBar);
			}

			function consultarHandler(command) {
				ProgressBarService.show();
				return GananciasNetasService(command).then(setGrupo, errorHandler);
			}

			function setGrupo(response) {
				$scope.presenter.setGrupo(response);
			}

			function errorHandler(response) {
				alertMe(response.message());
				hideProgressBar();
			}

			function alertMe(message) {
				alert(message);
			}

			function hideProgressBar() {
				ProgressBarService.hide();
			}

			init();
		},
		template: require('./ganancias-netas.html')
	});
}

module.exports = gananciasNetas;