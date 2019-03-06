function IronHide($q, $http, IronHideResponse) {
	var 
		debug = false,
		//url = "/agence-backend/public/api/";
		url = "/api/";

	this.get = function(urlParam, config, data) {
		var promise = debug 
		? $q.resolve({data: data}) 
		: $http.get(url.concat(urlParam), config);

		return promise.then(getData).catch(errorHandler);
	}

	this.post = function(urlParam, params, config, data) {
		var promise = debug 
		? $q.resolve({data: data}) 
		: $http.post(url.concat(urlParam), params, config);

		return promise.then(getData).catch(errorHandler);
	}

	function getData(response) {
		return IronHideResponse(response.data);
	}

	function errorHandler(error) {
		console.log('JazzHttpError Server Error', error);
	}
}

module.exports = {
	name: 'IronHide',
	func: IronHide
}