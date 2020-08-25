$( document ).ready(function() {
});

$('#formulario').submit((e) => {
    e.preventDefault();  // sirve para parar la funcion nativa de envio de formulario

    console.log("Envia el formulario al backend.");

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
        },
        error: () => {
            console.log("Ocurrió un error.");
        }
    })
});

$('#boton_listado').on('click', () => {
    console.log("Muestra el listado desde el backend.");

    var filas = $("#cantidadDeLineas").val();

    $.ajax({

        url: "http://localhost:7000/ver_envios/" + filas,
        dataType: 'json',
        contentType: 'application/json',
        success: (datos) => {
            var lista = JSON.parse(JSON.stringify(datos));   // lo paso a string y despues lo parseo
            var info = '<table border="1"><tr><td>Fecha de envío</td><td>Dirección destino</td><td>Body</td></tr>';
            for (item of lista) {
                info += "<tr><td>" + item.fecha_envio + "</td>";
                info += "<td>" + item.correo_destino + "</td>";
                info += "<td>" + item.body + "</td></tr>";
            }
            $('#data').html(info + "</table>").addClass("formatoLista");
        },
        error: () => {
            console.log("Ocurrió un error.");
        }

    })
});