function GanaciasNetasPresenter(SelectMulti, Periodo) {
	return function() {
		var _GanaciasNetasPresenter = {
			consultores: [],
			consultorSelected: {},
			consultoresTypes: [],
			consultoreTypeSelected: {},
			selectMulti: SelectMulti({}),
			grupo: [],
			periodo: Periodo({fromYear: 2000, toYear: 2019}),
			init: function(response) {
				this.setConsultores(response);
				this.setTypes(response);
			},
			setConsultores: function(response) {
				this.consultores = response.consultores;
				this.consultoresTemp = response.consultores;
				this.consultorSelected = this.consultores[0];

				this.setSelectMulti();
			},
			setTypes: function(response) {
				var types = response.types;
				types.unshift({id: 4, name: 'All'});

				this.consultoresTypes = types;
				this.consultoreTypeSelected = types[0];
			},
			setGrupo: function(grupo) {
				this.grupo = grupo;
			},
			setSelectMulti: function() {
				this.selectMulti.init(this.consultores);
			},
			onChangeType: function() {
				var self = this;

				if(this.consultoreTypeSelected.id == 4){
					this.consultores = this.consultoresTemp;
					this.setSelectMulti();
					return;
				}

				this.consultores = this.consultoresTemp.filter(function(consultor) {
					return consultor.co_tipo_usuario == self.consultoreTypeSelected.id;
				});

				this.setSelectMulti();
			},
			validateRequest: function() {
				var selectMulti;
				selectMulti = this.selectMulti.toRequest();
				return selectMulti.length > 0;
			},
			toRequest: function() {
				var selectMulti, periodo;
				selectMulti = JSON.stringify(this.selectMulti.toRequest());
				periodo = this.periodo.toRequest()
				return {
					co_usuarios: selectMulti,
					from: periodo.from,
					to: periodo.to 
				};
			}
		};

		return _GanaciasNetasPresenter;
	}
}

module.exports = {
	name: 'GanaciasNetasPresenter',
	func: GanaciasNetasPresenter
}