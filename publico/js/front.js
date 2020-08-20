$( document ).ready(function() {
});

$('#formulario').submit((e) => {
    e.preventDefault();

    console.log("hola");

    $.ajax({

        url: "http://localhost:7000/enviar_correo",
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "correo": $("#correo").val(),
            "texto": $('#texto').val()
        }),
        success: (datos) => {
            console.log(datos);
        }
    })
});