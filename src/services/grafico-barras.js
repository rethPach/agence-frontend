function GraficoBarras() {
	return function(desempeno) {
		var _GraficoBarras = {
			create: function(desempenos) {
				var result = {}, self = this;
				desempenos.forEach(function(consultor) {
					consultor.years.forEach(function(year) {
						if(!result[year.name]) {
							result[year.name] = {};
						}
						if(!result[year.name][consultor.name]) {
							result[year.name][consultor.name] = {};
						}
						year.months.forEach(function(month) {
							result[year.name][consultor.name][month.name] = month.sum_receita_liquida;
						});
					});
				});
				return Object.keys(result).map(function(year) {
					var grafico = self.transform(result[year]);
					return self.toRequest(year, grafico);
				});
			},
			transform: function(year) {
				var _grafico = {
					labels: [],
					series: [],
					seriesName: [],
					data: [],
					init: function(year) {
						this.fillLabelsAndData(year);
						this.setSeries();
						this.setSeriesName();
						this.transformDataToGrafico();
						return this.toRequest();
					},
					fillLabelsAndData: function(year) {
						for (var consultor in year) {
							this.labels.push(consultor);
							this.data.push(year[consultor]);
						}
					},
					setSeries: function() {
						var series = [];
						this.data.forEach(function(line) {
							Object.keys(line).forEach(function(key) {
							  series.push(key);
							});
						});
						this.series = series.unique().sort();
					},
					setSeriesName: function() {
						this.seriesName = this.series.map(function(serie) {
							var months = [0, 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
							return months[serie];
						});
					},
					transformDataToGrafico: function() {
						var self = this;
						this.data = this.data.map(function(line) {
							var data = [];
							self.series.forEach(function(serie, index) {
								data[index] = line[serie] || 0;
							});
							return data;
						});
					},
					toRequest: function() {
						return {
							labels: this.labels,
							series: this.series,
							seriesName: this.seriesName,
							data: this.data,
						}
					}
				};
				return _grafico.init(year);
			},
			toRequest: function(yearName, grafico) {
				var from = grafico.seriesName[0] + ' of ' + yearName + ' to ';
				var to = grafico.seriesName[grafico.seriesName.length-1] + ' of ' + yearName;
				return {
					id: yearName,
					name: from + to,
					grafico: grafico
				}
			} 
		};
		return _GraficoBarras.create(desempeno);
	}
}

module.exports = {
	name: 'GraficoBarras',
	func: GraficoBarras
}