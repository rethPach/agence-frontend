function Periodo(Calendar) {

	return function(config) {

		var _Periodo = {
			init: function() {
				this.from.init();
				this.to.init();
				return this;
			},
			from: {
				monthSelected: {},
				yearsSelected: {},
				calendar: Calendar(config.fromYear, config.toYear),
				init: function() {
					this.monthSelected = this.calendar.months[0];
					this.yearsSelected = this.calendar.years[0];
				},
				toRequest: function() {
					return new Date(this.yearsSelected.n, this.monthSelected.n - 1, 1);
				}
			},
			to: {
				monthSelected: {},
				yearsSelected: {},
				calendar: Calendar(config.fromYear, config.toYear),
				init: function() {
					this.monthSelected = this.calendar.months[0];
					this.yearsSelected = this.calendar.years[0];
				},
				toRequest: function() {
					return new Date(this.yearsSelected.n, this.monthSelected.n, 0);
				}
			},
			onChangeFromYearSelected: function() {
				var fromYearSelected = this.from.yearsSelected;
				this.to.calendar.years = this.to.calendar.yearsAux.filter(function(year) {
					return year.n >= fromYearSelected.n;
				});
				this.to.yearsSelected = this.to.calendar.years[0];
			},
			onChangeFromMonthSelected: function() {
				var fromMonthSelected = this.from.monthSelected;
				this.to.calendar.months = this.to.calendar.monthsAux.filter(function(month) {
					return month.n >= fromMonthSelected.n;
				});
				this.to.monthSelected = this.to.calendar.months[0];
			},
			onChangeToYearSelected: function() {
				var fromYearSelected = this.from.yearsSelected;
				var toYearSelected = this.to.yearsSelected;
				if(toYearSelected.n>fromYearSelected.n) this.to.calendar.months = this.to.calendar.monthsAux;
				else this.onChangeFromMonthSelected();
			},
			toRequest: function() {
				return {
					from: this.from.toRequest(),
					to: this.to.toRequest()
				}
			}
		};

		return _Periodo.init();
	}

}

module.exports = {
	name: 'Periodo',
	func: Periodo
}

