m = setInterval(titulo, 5000);

$(document).ready(function(){
	$('.button-collapse').sideNav({
	      menuWidth: 350, // Default is 240
	      edge: 'left', // Choose the horizontal origin
	      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    }
	);

	//socket.emit("conectado")
});

/* Modal eliminar y actualizar */
$(document).on("click", ".modal-trigger", function(){
	var id = $(this).attr("id");
	$(id).openModal();
});

/* Modal para nuevo puesto */
$(document).on("click", "#nuevo_puesto", function(){
	$("#nuevo_puesto_modal").openModal();
});

/* Modal para nuevo usuario */
$(document).on("click", "#nuevo_usuario", function(){
	$("#nuevo_usuario_modal").openModal();
});

/* Escondes los mensajes de la pagina */
function titulo(){
	if($("#error").text() != ""){
		$("#error").fadeOut(6000)
	}
}
