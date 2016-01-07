/* Controlador para Actualizar el Perfil */
var app = angular.module('perfil', [])
var url_server = 'http://127.0.0.1:8080/';

app.controller('perfilController', function($scope, $http){
    console.log("Esto Contiene localStorage:"+localStorage.getItem("empresa_server"));
    var empresa = localStorage.getItem("empresa_server");
    $scope.empresa = JSON.parse(empresa);
		console.log($scope.empresa);

    $scope.updateEmpresa = function() {
        var empresa = $scope.empresa;
        $('#'+empresa._id+"-Update").closeModal();
        empresa.id = empresa._id; // Pasamos la _id a id para mayor comodidad del lado del servidor a manejar el dato.
        //delete empresa._id; //
        $http.put(url_server+"empresa/actualizar", empresa).success(function(response) {
            if(response.status === "OK") {
                localStorage.empresa_server = JSON.stringify(empresa);
                $("#mensaje").empty();
                $("#mensaje").append('<div class="chip">Información actualizada <i class="material-icons">Cerrar</i></div>');
                $("#mensaje").css('color', '#FFF');
            }
        });
    }

});
