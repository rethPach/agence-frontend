function gananciasNetas($stateProvider) {
	$stateProvider.state('ganancias-netas', {
		url: '/ganancias-netas',
		controller: function($scope, ListaConsultores, GananciasNetasService, GanaciasNetasPresenter) {
			function init() {
				angular.extend($scope, {
					presenter: GanaciasNetasPresenter(),
					consultarAction: consultarAction,
					clientes: clientes(),
					resultadosShow: false
				});

				listaConsultoresAllAction();
			}

			function listaConsultoresAllAction() {
				listaConsultoresAllHandler({});
			}

			function listaConsultoresAllHandler(command) {
				return ListaConsultores.all(command).then(setPresenter, errorHandler);
			}

			function setPresenter(response) {
				$scope.presenter.init(response);
			}

			function consultarAction() {
				$scope.resultadosShow = false;
				return consultarHandler($scope.presenter.toRequest()).then(_resultadoShow(true));
			}

			function consultarHandler(command) {
				return GananciasNetasService(command).then(setClientes, errorHandler);
			}

			function setClientes(response) {
				$scope.clientes.init(response);
			}

			function clientes() {
				return {
					all: [],
					init: function(response) {
						this.all = response;
					}
				}
			}

			function _resultadoShow(show) {
				return function() {
					$scope.resultadosShow = show;
				}
			}

			function errorHandler(response) {
				alert(response.message());
			}

			init();
		},
		template: require('./ganancias-netas.html')
	});
}

module.exports = gananciasNetas;