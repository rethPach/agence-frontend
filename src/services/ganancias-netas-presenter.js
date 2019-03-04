function GanaciasNetasPresenter() {
	return function() {
		var _GanaciasNetasPresenter = {
			consultores: [],
			consultorSelected: {},
			consultoresTypes: [],
			consultoreTypeSelected: {},
			fromDataPicker: datapicker({}),
			toDataPicker: datapicker({}),
			from: '',
			to: '',
			init: function(response) {
				this.setConsultores(response);
				this.setTypes(response);
			},
			setConsultores: function(response) {
				this.consultores = response.consultores;
				this.consultoresTemp = response.consultores;
				this.consultorSelected = this.consultores[0];
			},
			setTypes: function(response) {
				var types = response.types;
				types.unshift({id: 4, name: 'All'});

				this.consultoresTypes = types;
				this.consultoreTypeSelected = types[0];
			},
			onChangeType: function() {
				var self = this;

				if(this.consultoreTypeSelected.id == 4){
					this.consultores = this.consultoresTemp;
					return;
				}

				this.consultores = this.consultoresTemp.filter(function(consultor) {
					return consultor.co_tipo_usuario == self.consultoreTypeSelected.id;
				});
			},
			toRequest: function() {
				var self = this;
				return {
					co_usuario: self.consultorSelected.co_usuario,
					from: self.from,
					to: self.to
				};
			}
		};

		return _GanaciasNetasPresenter;
	}

	function datapicker(config) {
		return angular.extend({
			format: 'dd MMMM yyyy',
	    opened: false,
	    options: {
        formatYear: 'yyyy',
        maxDate: new Date(),
        initDate: new Date()
	    },
	    open: function () {
        this.opened = true;
	    }
		}, config);
	}
}

module.exports = {
	name: 'GanaciasNetasPresenter',
	func: GanaciasNetasPresenter
}