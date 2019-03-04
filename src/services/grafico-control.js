function GraficoControl(GraficoBarras) {
	return function() {
		return {
			options: {},
			grafico: {
				labels: [],
				series: [],
				seriesName: [],
				data: [],
			},
			graficos: [],
			select: [],
			selected: {},
			onChangeGrafico: function() {
				var self = this;
				var graficoX = this.graficos.filter(function(grafico) {
					return self.selected.id == grafico.id;
				});
				this.grafico = grafico;
			},
			init: function(response) {
				this.setOptions({lineAt: response.custo_fixo_medio});
				this.graficos = GraficoBarras(response.desempenos);
				this.grafico = this.graficos[0].grafico;
				this.select = this.graficos.map(function(grafico) {
					return {id: grafico.id, name: grafico.id};
				});
				this.selected = this.select[0];
			},
			setOptions: function(options) {
				this.options = angular.extend({
					scales: {
	            yAxes: [{
	                ticks: {
	                    min: 0
	                }
	            }]
	        },
	        legend: {
	            display: true,
	            labels: {
	                fontColor: 'rgb(0, 0, 0)',
	                fontSize: 10
	            }
	        }
				}, options);
			}
		};
	}
}

module.exports = {
	name: 'GraficoControl',
	func: GraficoControl
}