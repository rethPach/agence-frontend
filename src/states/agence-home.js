function agenceHome($stateProvider) {
	$stateProvider.state('agence-home', {
		url: '/agence-home',
		controller: function($scope, Periodo, SelectMulti, ListaConsultores, 
			RelatarioService, Relatario, GraficoService, GraficoControl, Pizza, PizzaService) {
			function init() {
				angular.extend($scope, {
					panelControl: {
						relatario: false,
						grafico: false,
						pizza: false
					},
					pizza: Pizza(),
					graficoControl: GraficoControl(),
					relatario: Relatario(),
					periodo: Periodo({fromYear: 2000, toYear: 2019}),
					selectMulti: SelectMulti([]),
					relatarioAction: relatarioAction,
					graficoAction: graficoAction,
					pizzaAction: pizzaAction
				});

				listaConsultoresAllAction();
			}

			function listaConsultoresAllAction() {
				listaConsultoresAllHandler({});
			}

			function relatarioAction() {
				var command = getCommand();
				if(!command.validate()){
					alertMe('Selecciona al menos un consultor!');
					return;
				}
				relatarioHandler(command);
			}

			function getCommand() {
				var periodo = $scope.periodo.toRequest();
				var co_usuarios = $scope.selectMulti.toRequest();	
				return angular.extend(periodo, {
					co_usuarios: JSON.stringify(co_usuarios),
					validate: function() {
						return this.co_usuarios.length > 0;
					}
				});		
			}

			function graficoAction() {
				var command = getCommand();
				if(!command.validate()){
					alertMe('Selecciona al menos un consultor!');
					return;
				}
				graficoHandler(command);
			}

			function pizzaAction() {
				var command = getCommand();
				if(!command.validate()){
					alertMe('Selecciona al menos un consultor!');
					return;
				}
				pizzaHandler(command);
			}

			function listaConsultoresAllHandler(command) {
				return ListaConsultores.all(command).then(setSelectMulti, errorHandler);
			}

			function setSelectMulti(response) {
				$scope.selectMulti.init(response.consultores);
			}

			function relatarioHandler(command) {
				RelatarioService(command)
					.then(setRelatario, errorHandler)
					.then(showPanel('relatario'));
			}

			function showPanel(name) {
				return function() {
					Object.keys($scope.panelControl).forEach(function(key, value) {
						$scope.panelControl[key] = key == name;
					});
				}
			}

			function setRelatario(response) {
				$scope.relatario.init(response);
			}

			function graficoHandler(command) {
				return GraficoService(command)
					.then(setGraficoControl, errorHandler)
					.then(showPanel('grafico'));
			}

			function setGraficoControl(response) {
				$scope.graficoControl.init(response);
			}

			function pizzaHandler(command) {
				PizzaService(command)
				.then(setPizza, errorHandler)
				.then(showPanel('pizza'));
			}

			function setPizza(response) {
				$scope.pizza.init(response);
			}

			function errorHandler(response) {
				alert(response.message());
			}

			function alertMe(message) {
				alert(message);
			}

			init();
		},
		template: require('./agence-home.html')
	});
}

module.exports = agenceHome;