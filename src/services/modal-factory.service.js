function ModalFactoryService($uibModal) {

	this.modals = {
    confirmModal: function(resolve) {
      return $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        controller:"",
        template:  "",
        size: 'lg',
        appendTo: '',
        resolve: resolve
      });
    },
    showInfoModal: function(resolve) {
      return $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        controller:"",
        template:  "",
        size: 'lg',
        appendTo: '',
        resolve: resolve
      });
    },
	}

	this.create = function(name, resolve) {
		return this.modals[name](resolve).result;
	}
}


module.exports = {
	name: 'ModalFactoryService',
	func: ModalFactoryService
}


