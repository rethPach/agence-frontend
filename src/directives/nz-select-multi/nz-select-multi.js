function nzSelectMulti() {
	return {
		scope: {selectMulti: '='},
		controller: function($scope) {},
		template: require('./nz-select-multi.html')
	}
}

module.exports = {
	name: 'nzSelectMulti',
	func: nzSelectMulti
}