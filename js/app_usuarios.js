/* Controlador para secretario */
var app = angular.module('secreto', [])
var url_server = 'http://159.203.128.165:8080/';
//var url_server = 'http://127.0.0.1:8080/';

app.controller('gerenteController', function($scope, $http){
	$scope.usuarios = {}
	$scope.usuarioN = {}
    $scope.usuario = {}
	$scope.puestoN = {}
	$scope.puest = {}
    var empresa = JSON.parse(localStorage.getItem("empresa_server"))
	/*if(empresa == null)
        window.location.href = '../index.html'*/
    /* Obtenemos los parametros de la url */
    var edit = getUrlParameter('id');
    /* Llamamos a la función para obtener la lista de usuario al cargar la pantalla */
    if (edit == undefined) {
        getUsuario();
        getPuesto();
    }else{
        getUsuarioUnico();
        getPuesto();
    }

    /* Método para obtener la lista de usuario */
    function getUsuario() {
        $http.get(url_server+'user/listar/'+empresa._id).
		success(function(response){
        	if(response.status == "OK") {
            	$scope.usuarios = response.data;
            	if($scope.usuarios.length == 0){
					$("#mensaje").empty();
					$("#mensaje").append('<div class="row"><div class="col s12 m12 l12"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">Ops</span><p>Aún no hay usuarios registrados en el sistema.</p></div></div></div></div>');
					$("#mensaje").css('color', '#d50000');
				}else{
                    $("#mensaje").empty();
                }
            }
        })
    }

    /* Método para obtener información de un usuario específico */
    function getUsuarioUnico() {
        $http.get(url_server+"user/buscar/"+edit).success(function(response) {
            if(response.type) { // Si nos devuelve un OK la API...
                $scope.usuario = response.data[0];
            }
        });
    }

    /* Método para obtener los puestos de la BD */
    function getPuesto(){
        $http.get(url_server+"puesto/listar/"+empresa._id).success(function(response) {
            if(response.status == "OK") {
            	$scope.puest = response.data;
        	}
    	})
    }

    /* Método para agregar un nuevo usuario */
    $scope.nuevoUsuario = function() {
        // Hacemos un POST a la API para dar de alta nuestro nuevo ToDo
        var nombre_puesto = $("#puesto_empleado option:selected").text();
        $scope.usuarioN.puesto_nombre = nombre_puesto;
        $scope.usuarioN.empresa = empresa._id;
        /* Cuando se crea un usuario su clave de acceso es su correo */
        $scope.usuarioN.clave = $scope.usuarioN.email;
        $http.get(url_server+"puesto/buscar/"+$scope.usuarioN.puesto, $scope.usuarioN).success(function(response) {
            $scope.usuarioN.nivel = response.data[0].nivel;
            $scope.usuarioN.clave = $scope.usuarioN.email;
            $http.post(url_server+"user/crear", $scope.usuarioN).success(function(response) {
                if(response.status === "OK") { // Si nos devuelve un OK la API...
                    $("#error").empty();
                    var nombres = $scope.usuarioN.nombreC.split(' ')
                    $("#error").append('<div class="chip col s12 m12 l12">Usuario '+nombres[0]+' agregado<i class="material-icons">Cerrar</i></div>');
                    $("#error").css('color', '#FFF');
                    $scope.usuarioN = {}; // Limpiamos el scope
                }
            });
        });
        
    }

    $scope.deleteUsuario = function(id) {
        // Hacemos una petición DELETE a la API para borrar el id que nos pase el html por parametro
        $http.delete(url_server+"user/eliminar", { params : {identificador: id}}).success(function(response) {
            if(response.status === "OK") { // Si la API nos devuelve un OK...
                $("#error").empty();
                $("#error").append('<div class="chip">Usuario eliminado <a href="usuarios.html">Volver a lista de usuarios</a></div>');
                $("#error").css('color', '#FFF');
                $(".card-reveal").fadeOut()
                $scope.usuario = {}
            }
        });
    }
    
    /* Método para actualizar un usuario */
    $scope.updateUsuario = function() {
        var usuario = $scope.usuario;
        $('#'+usuario._id+"-Update").closeModal();
        usuario.id = usuario._id; // Pasamos la _id a id para mayor comodidad del lado del servidor a manejar el dato.
        delete usuario._id; // Lo borramos para evitar posibles intentos de modificación de un ID en la base de datos
        // Hacemos una petición PUT para hacer el update a un documento de la base de datos.
        var nombre_puesto = $("#puesto_empleado_update-"+usuario.id+" option:selected").text();
        usuario.puesto_nombre = nombre_puesto;
        $http.put(url_server+"user/actualizar", usuario).success(function(response) {
            if(response.status === "OK") {
                getUsuarioUnico(); // Actualizamos la lista de ToDo's
                $("#error").empty();
                $("#error").append('<div class="chip">Información actualizada <i class="material-icons">Cerrar</i></div>');
                $("#error").css('color', '#FFF');
                $(".card-reveal").fadeOut()
            }
        });
    }
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
});
//568aa78c7c95f69f11621f9f