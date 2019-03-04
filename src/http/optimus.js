function Optimus($q, IronHide, $timeout) {
	
	return function(command) {
		var deferred, requestFactory, request, methodHttp, response;
		deferred = $q.defer();
		
		requestFactory = {
			get: function(url, params, config, mocks) {
				angular.extend(config, {
					params: params
				});
				return IronHide.get(url, config, mocks);
			},
			post: function(url, params, config, mocks) {
				angular.extend(config, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				});
				return IronHide.post(url, params, config, mocks);
			}
		};

		request = requestFactory[command.method];

		if(!request) throw {};

		response = request(command.url, command.params, command.config, command.mocks); 

		response.then(function(IronHideResponse) {
			if(IronHideResponse.hasError()){
				deferred.reject(IronHideResponse);
				return;
			}

			deferred.resolve(IronHideResponse.data());
		});

		return deferred.promise;
	}
}

module.exports = {
	name: 'Optimus',
	func: Optimus
}