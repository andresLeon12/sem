/* Controlador para secretario */
var app = angular.module('perfil', [])
var url_server = 'http://159.203.128.165:8080/';

app.controller('perfilController', function($scope, $http){

    var empresa = localStorage.getItem("empresa_server");
    $scope.empresa = JSON.parse(empresa);

    $scope.updateEmpresa = function() {
        var empresa = $scope.empresa;
        var temporal = empresa._id;
        $('#'+empresa._id+"-Update").closeModal();
        empresa.id = empresa._id; // Pasamos la _id a id para mayor comodidad del lado del servidor a manejar el dato.
        delete empresa._id; // Lo borramos para evitar posibles intentos de modificación de un ID en la base de datos
        // Hacemos una petición PUT para hacer el update a un documento de la base de datos.
        //var nombre_puesto = $("#puesto_empleado_update-"+usuario.id+" option:selected").text();
        //usuario.puesto_nombre = nombre_puesto;
        $http.put(url_server+"empresa/actualizar", empresa).success(function(response) {
            if(response.status === "OK") {
                //localStorage.setItem("empresa_server") = response.data
                getEmpresa(temporal); // Actualizamos la lista de ToDo's
                $("#mensaje").empty();
                $("#mensaje").append('<div class="chip">Información actualizada <i class="material-icons">Cerrar</i></div>');
                $("#mensaje").css('color', '#FFF');
            }
        })
    }

    /* Método para obtener información de un usuario específico */
    function getEmpresa(a) {
        $http.get(url_server+"empresa/buscar/"+a).success(function(response) {
            if(response.type) { // Si nos devuelve un OK la API...
                $scope.empresa = response.data[0];
            }
        });
    }
});
