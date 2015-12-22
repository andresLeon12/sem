/* Controlador para secretario */
var app = angular.module('secreto', [])
var url_server = 'http://159.203.128.165:8080/';

app.controller('gerenteController', function($scope, $http){
	$scope.empresa = {}
	var empresa = localStorage.getItem("empresa_server")
	if(empresa !== null)
		window.location.href = 'inicio.html'

	/* Revisamos que ya se haya registrado la información del director general */
	
	/* Función para registrar una empresa en el sistema */
	$scope.registrarEmpresa = function() {
		// Hacemos un POST a la API para dar de alta nuestro nuevo ToDo
        $http.post(url_server+"empresa/crear", $scope.empresa).success(function(response) {
            if(response.status === "OK") { // Si nos devuelve un OK la API...
            	if(typeof(Storage) !== "undefined") {
					// Alamcenamos la información de la empresa y mandamos un codigo de verificación
				    localStorage.setItem("empresa_server", JSON.stringify(response.data));
				    $(".container").html('<div class="row"><div class="col s12 m12 l12"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">¡Listo!</span><p>Se ha enviado a tu correo el código de tu empresa, con él tus usuarios podrán ingresar al sistema.<br>'+response.data._id+'<br><a href="inicio.html" style="color:white">He anotado el código y deseo continuar.</a></p></div></div></div></div>');
				    $(".container").css('color', '#d50000');
				} 
            }
    	})
	}

	/* Función para loguear una empresa en el sistema */
	$scope.loginEmpresa = function() {
		// Hacemos un POST a la API para dar de alta nuestro nuevo ToDo
		alert(url_server+"empresa/find/"+$scope.datos.clave)
        $http.get(url_server+"empresa/find/"+$scope.datos.clave).success(function(response) {
            if(response.type) { // Si nos devuelve un OK la API...
            	if(typeof(Storage) !== "undefined") {
					// Alamcenamos la información de la empresa y mandamos un codigo de verificación
				    localStorage.setItem("empresa_server", JSON.stringify(response.data));
				    window.location.href = 'inicio.html'
				} 
            }
    	})
	}
});
//56759844da28db3415c376c7
