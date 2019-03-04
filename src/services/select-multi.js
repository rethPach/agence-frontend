function SelectMulti() {

	return function(data) {

		var _SelectMulti = {
			all: [],
			allNotSelected: [],
			allSelected: [],
			selected: {},
			init(data) {
				this.all = data;
				this.allNotSelected = data; 
				this.allSelected = [];
			},
			onSelectItem: function() {
				var selected = this.selected;
				if(!selected) return;
				this.allNotSelected = this.allNotSelected.filter(function(item) {
					return item.co_usuario != selected.co_usuario;
				});

				this.allSelected.push(selected);
			},
			onRemoveSelected: function(itemX) {
				this.allSelected = this.allSelected.filter(function(item) {
					return item.co_usuario != itemX.co_usuario;
				});

				this.allNotSelected.push(itemX);
			},
			toRequest: function() {
				return this.allSelected.map(function(consultor) {
					return consultor.co_usuario;
				});
			}
		};

		_SelectMulti.init(data);

		return _SelectMulti;
	}

};

module.exports = {
	name: 'SelectMulti',
	func: SelectMulti
}