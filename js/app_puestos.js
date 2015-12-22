/* Controlador para secretario */
var app = angular.module('secreto', [])
var url_server = 'http://159.203.128.165:8080/';

app.controller('gerenteController', function($scope, $http){
	$scope.puestoN = {}
	$scope.puest = {}
    $scope.puesto = {}
    var empresa = JSON.parse(localStorage.getItem("empresa_server"))
    empresa = empresa[0]
    if(empresa == null)
        window.location.href = '../index.html'
    /* Obtenemos los parametros de la url */
    var edit = getUrlParameter('id');
    if (edit == undefined) {
        getPuesto();
    }else{
        getPuestoUnico();
    }
	/* Llamamos a la función para obtener la lista de usuario al cargar la pantalla */
	getPuesto();

    /* Método para obtener los puestos de la BD */
    function getPuesto(){
        $http.get(url_server+"puesto/listar/"+empresa._id).success(function(response) {
            if(response.status == "OK") {
            	$scope.puest = response.data;
                if($scope.puest.length == 0){
                    $("#mensaje").empty();
                    $("#mensaje").append('<div class="row"><div class="col s12 m12 l12"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">Ops</span><p>Aún no hay puestos registrados en el sistema.</p></div></div></div></div>');
                    $("#mensaje").css('color', '#d50000');
                }else{
                    $("#mensaje").empty();
                }
        	}
    	})
    }
    /* Método para obtener información de un usuario específico */
    function getPuestoUnico() {
        $http.get(url_server+"puesto/buscar/"+edit).success(function(response) {
            if(response.type) { // Si nos devuelve un OK la API...
                $scope.puesto = response.data[0];
            }
        });
    }

    /* Método para agregar un nuevo puesto */
    $scope.nuevoPuesto = function() {
        $scope.puestoN.empresa = empresa._id;
        /* Obtenemos el total de puestos para establecer la nueva clave */
        $http.get(url_server+"puesto/listar/"+empresa._id).success(function(response) {
            $scope.puestoN.clave = ($scope.puest.length + 1);
            // Hacemos un POST a la API para dar de alta nuestro nuevo ToDo
            $http.post(url_server+"puesto/crear", $scope.puestoN).success(function(response) {
                if(response.status === "OK") { // Si nos devuelve un OK la API...
                    $("#error").empty();
                    var nombres = $scope.puestoN.nombreP.split(' ')
                    $("#error").append('<div class="chip">Puesto '+nombres[0]+' agregado<i class="material-icons">Cerrar</i></div>');
                    $("#error").css('color', '#FFF');
                    $scope.puestoN = {}; // Limpiamos el scope
                }
            })
        });
    }

    /* Método para actualizar un puesto */
    $scope.updatePuesto = function(puesto) {
        $('#'+puesto._id+"-Update").closeModal();
        puesto.id = puesto._id; // Pasamos la _id a id para mayor comodidad del lado del servidor a manejar el dato.
        delete puesto._id; // Lo borramos para evitar posibles intentos de modificación de un ID en la base de datos
        // Hacemos una petición PUT para hacer el update a un documento de la base de datos.
        $http.put(url_server+"puesto/actualizar", puesto).success(function(response) {
            if(response.status === "OK") {
                getPuestoUnico(); // Actualizamos la lista de ToDo's
                $("#error").empty();
                $("#error").append('<div class="chip">Información actualizada <i class="material-icons">Cerrar</i></div>');
                $("#error").css('color', '#FFF');
                $(".card-reveal").fadeOut()
            }
        });
    }

    /* Método para eliminar un puesto */
    $scope.deletePuesto = function(id) {
        // Hacemos una petición DELETE a la API para borrar el id que nos pase el html por parametro
        $http.delete(url_server+"puesto/eliminar", { params : {identificador: id}}).success(function(response) {
                //console.log("function");
            if(response.status === "OK") { // Si la API nos devuelve un OK...
                $("#error").empty();
                $("#error").append('<div class="chip">Puesto eliminado <a href="puestos.html">Volver a lista de puestos</a></div>');
                $("#error").css('color', '#FFF');
                $(".card-reveal").fadeOut()
                $scope.puesto = {}
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