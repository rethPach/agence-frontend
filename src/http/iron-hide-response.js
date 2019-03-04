function IronHideResponse() {
	
	return function(response) {

		var _IronHideResponse = {
			code : 10000,
			result : { 
				data: null, 
				message: '**********',
				create: function(response) {
					this.data = response.data;
					this.message = response.message
				}
			},
			create: function(response) {
				this.code = response.code;
				this.result.create(response.result);
				return this;
			},
			hasError: function() {
				return this.code > 10000;
			},
			error: function() {
				var self = this;
				return {code: self.code, message: self.result.message};
			},
			data: function() {
				return this.result.data;
			},
			message: function() {
				return this.result.message;
			},
			hasErrorEqual: function(code) {
				return this.hasError && this.code == code;
			}
		};

		_IronHideResponse.create(response);

		return _IronHideResponse;
	}
}

module.exports = {
	name: 'IronHideResponse',
	func: IronHideResponse
}
