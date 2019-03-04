function Calendar() {

	return function(fromYear, toYear) {

		var _Calendar = {

			init: function(fromYear, toYear) {
				this.setYears(fromYear, toYear);
				this.monthsAux = this.months;
				this.yearsAux = this.years;
				return this;
			},

			months: [
				{n: 1, txt: 'January'},
				{n: 2, txt: 'February'},
				{n: 3, txt: 'March'},
				{n: 4, txt: 'April'},
				{n: 5, txt: 'May'},
				{n: 6, txt: 'June'},
				{n: 7, txt: 'July'},
				{n: 8, txt: 'August'},
				{n: 9, txt: 'September'},
				{n: 10, txt: 'October'},
				{n: 11, txt: 'November'},
				{n: 12, txt: 'December'}
			],

			years: [],

			setYears: function(from, to) {
				for(var i= from; i <= to; i++) this.years.push({n: i, txt: i});
			}
		};

		return _Calendar.init(fromYear, toYear);
	}
}


module.exports = {
	name: 'Calendar',
	func: Calendar
}