function nzPeriodo() {
	return {
		scope: {periodo:'='},
		controller: function($scope) {},
		template: require('./nz-periodo.html')
	}
}

module.exports = {
	name: 'nzPeriodo',
	func: nzPeriodo
}