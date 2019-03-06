function Pizza(GraficoBarras) {
	return function() {
		var _Pizza = {
			fill: function() {
				angular.extend(this, {
					graficos: [],
					grafico: {
						year: '',
						labels: [],
						months: [],
						monthsName: []
					},
					graficoMonth: [],
					months: {
						all: [],
						selected: {},
					},
					years: {
						all: [],
						selected: ''
					},
					options: {
						legend: {
		          display: true,
		          labels: {
		              fontColor: 'rgb(0, 0, 0)',
		              fontSize: 10
		          }
		        }
					}
				});
			},
			init: function(response) {
				if(!response.desempenos.length) {
					this.fill();
					return;
				}
				var graficoBarras = GraficoBarras(response.desempenos);
				this.setGraficos(graficoBarras);
			},
			setGraficos: function(graficoBarras) {
				this.graficos = graficoBarras.map(function(graficoBarra) {
					return makePizza(graficoBarra);
				});

				this.setYears(graficoBarras);
				this.setGrafico();
			},
			setYears: function(graficoBarras) {
				this.years.all = graficoBarras.map(function(graficoBarra) {
					return graficoBarra.id;
				});

				this.years.selected = this.years.all[0];
			},
			setGrafico: function() {
				var self = this;
				var graficoX = this.graficos.filter(function(graficoI) {
					return graficoI.year == self.years.selected;
				});

				if(!graficoX.length) return;
				this.grafico = graficoX[0];

				this.setMonths(0);
			},

			setMonths: function(index) {
				this.months.all = this.grafico.monthsName.map(function(val, key) {
					return {id: key, value: val }
				});
				var monthX = this.months.all.filter(function(month) {
					return month.id == index;
				});
				if(!monthX.length) return;
				this.months.selected = monthX[0];

				this.setGraficoMonth();
			},

			setGraficoMonth: function() {
				var graficoMonth = this.grafico.months[this.months.selected.id];
				this.graficoMonth = graficoMonth.map(function(val, key) {
					return val.value;
				});
			},

			onChangeYear: function() {
				this.setGrafico();
			},

			onChangeMonth: function() {
				this.setGraficoMonth();
			}
		};

		_Pizza.fill();

		return _Pizza;
	};

	function makePizza(graficoBarra) {
		var data = [];
		graficoBarra.grafico.series.forEach(function(month, monthKey) {
			if(!data[monthKey]) data[monthKey] = [];
			graficoBarra.grafico.data.forEach(function(consultor) {
				consultor.forEach(function(receitaLiquidaMensual, key) {
					if(monthKey == key) {
						data[monthKey].push({
							name: graficoBarra.grafico.seriesName[key], 
							value: receitaLiquidaMensual
						});
					}
				});
			});
		});

		return {
			year: graficoBarra.id,
			labels: graficoBarra.grafico.labels,
			months: data,
			monthsName: graficoBarra.grafico.seriesName
		};
	}
}

module.exports = {
	name: 'Pizza',
	func: Pizza
}