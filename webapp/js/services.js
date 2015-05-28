angular.module('app.services', [])

.service('UserService', function($http, $location, $window) {
    var service = this;
    
    this.getUser = function() {
        return $http.get('/currentUser', {
            headers: { 'X-Auth': window.sessionStorage.token }
        })
    }
    
    this.logout = function() {
        delete service.token
        delete $window.sessionStorage.token;
        $http.defaults.headers.common['X-Auth'] = null;
        $location.path('/');
    }

})
