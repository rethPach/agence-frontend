function Relatario() {
	return function() {
		var _Relatario = {
			custo_fixo_medio: "",
			desempenos: [],
			init: function(response) {
				this.custo_fixo_medio = response.custo_fixo_medio;
				this.desempenos = response.desempenos;
			}
		};
		return _Relatario;
	}
}

module.exports = {
	name: 'Relatario',
	func: Relatario
}