console.log('SI ESTAMOS LLEGANDO AL SELLO'); //PRUEBA PARA SABER QUE ESTAMOS LLEGANDO AL SELLO DE FOMRMA CORRECTA
frontal = true;
function Vertical() {
    $("#div1").addClass("GirarDiv")
    frontal = false;
}
function Horizontal() {
    $("#div1").removeClass("GirarDiv").addClass("horizontal")

    elMovimiento.style.left = (300) + "px";
    frontal = true;
}
 
$(function () {
    agregarDatosRadicado();
});
xActual = 2;
yActual = 2;
function agregarDatosRadicado() {
    var anexos = "";
    _externo = JSON.parse(localStorage.getItem('Externo')); 
    _Radicado = JSON.parse(localStorage.getItem('Radicado')); 
    if (_Radicado.observacionesAnexo != "" && _Radicado.observacionesAnexo !=null) {
        var anexos = "</br>Descripción Anexo: " + _Radicado.observacionesAnexo;
    }
    var fecha = new Date();
    var hora = convertirFormatoHora(fecha.getHours(), fecha.getMinutes());
    var dia = checkTime(fecha.getDate()) + "/" + checkTime(fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    document.getElementById("asunto").innerHTML = "Asunto: " + _Radicado.codigoTRD + "-" + _Radicado.serieTRD + "-" + _Radicado.subserieTRD +", "+_Radicado.asunto + anexos;
    document.getElementById("N_Radicado").innerHTML = "Radicado: " + _Radicado.tipo + _Radicado.año + _Radicado.consecutivo + ", Folios: " + _Radicado.numeroFolios;
    document.getElementById("Fecha").innerHTML = "Fecha: " + dia + ", Hora: " + hora
    var titulo = _Radicado.asunto;
    $(this).attr("title", quitaAcentos(titulo));
}

function manejarErrorAjax(err) {
    console.log(err.responseText)
}
function carga() {
    posicion = 0;

    // IE
    if (navigator.userAgent.indexOf("MSIE") >= 0) navegador = 0;
    // Otros
    else navegador = 1;

}
function quitaAcentos(str) {
    for (var i = 0; i < str.length; i++) {
        //Sustituye "á é í ó ú"
        if (str.charAt(i) == "á") str = str.replace(/á/, "a");
        if (str.charAt(i) == "é") str = str.replace(/é/, "e");
        if (str.charAt(i) == "í") str = str.replace(/í/, "i");
        if (str.charAt(i) == "ó") str = str.replace(/ó/, "o");
        if (str.charAt(i) == "ú") str = str.replace(/ú/, "u");
    }
    return str;
}
function evitaEventos(event) {
    // Funcion que evita que se ejecuten eventos adicionales
    if (navegador == 0) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    if (navegador == 1) event.preventDefault();
}

function comienzoMovimiento(event, id) {
    elMovimiento = document.getElementById(id);

    $('#imagenFlotante').fadeOut(500);
    $('.btPosicion').fadeOut(500);
    // Obtengo la posicion del cursor
    if (navegador == 0) {
        cursorComienzoX = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        cursorComienzoY = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;

        document.attachEvent("onmousemove", enMovimiento);
        document.attachEvent("onmouseup", finMovimiento);
    }
    if (navegador == 1) {
        cursorComienzoX = event.clientX + window.scrollX;
        cursorComienzoY = event.clientY + window.scrollY;

        document.addEventListener("mousemove", enMovimiento, true);
        document.addEventListener("mouseup", finMovimiento, true);


    }

    elComienzoX = parseInt(elMovimiento.style.left);
    elComienzoY = parseInt(elMovimiento.style.top);
    // Actualizo el posicion del elemento
    elMovimiento.style.zIndex = ++posicion;

    evitaEventos(event);
}

function enMovimiento(event) {
    xActual = 0, yActual = 0;
    if (navegador == 0) {
        xActual = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        yActual = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
    }
    if (navegador == 1) {
        xActual = event.clientX + window.scrollX;
        yActual = event.clientY + window.scrollY;

    }

    if (elComienzoX + xActual - cursorComienzoX < 564 && elComienzoX + xActual - cursorComienzoX > -80 && frontal) {
        //console.log(elComienzoX + xActual - cursorComienzoX)
        elMovimiento.style.left = (elComienzoX + xActual - cursorComienzoX) + "px";

    } else if (elComienzoX + xActual - cursorComienzoX < 650 && elComienzoX + xActual - cursorComienzoX > -78 && !frontal) {

        elMovimiento.style.left = (elComienzoX + xActual - cursorComienzoX) + "px";
    }
    if (elComienzoY + yActual - cursorComienzoY >= -18 && elComienzoY + yActual - cursorComienzoY <= 958 && frontal) {

        elMovimiento.style.top = (elComienzoY + yActual - cursorComienzoY) + "px";
    } else if (elComienzoY + yActual - cursorComienzoY >= -30 && elComienzoY + yActual - cursorComienzoY <= 850 && !frontal) {
        console.log(elComienzoY + yActual - cursorComienzoY)
        elMovimiento.style.top = (elComienzoY + yActual - cursorComienzoY) + "px";
    }


    evitaEventos(event);
}

function finMovimiento(event) {
    //alert(elComienzoY + yActual - cursorComienzoY)
    //alert(elComienzoX + xActual)
    if (navegador == 0) {
        document.detachEvent("onmousemove", enMovimiento);
        document.detachEvent("onmouseup", finMovimiento);
        console.log(xActual + yActual)
    }
    if (navegador == 1) {
        document.removeEventListener("mousemove", enMovimiento, true);
        document.removeEventListener("mouseup", finMovimiento, true);
        //alert("X: " + xActual + " Y: " + yActual);
        $('#imagenFlotante').fadeIn(500);
        $('.btPosicion').fadeIn(500);
    }
}

window.onload = carga;
function PrintElem(elem) {
    $('.btPosicion').hide();
    //Popup($(elem).html());
    Popup("");
    window.close();
}

function Popup(data) {
    //var mywindow = window.open('', 'my div');
    //mywindow.document.write('<html><head><title>my div</title>');
    ///*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    //mywindow.document.write('</head><body >');
    //mywindow.document.write(data);
    //mywindow.document.write('</body></html>');

    //mywindow.document.close(); // necessary for IE >= 10
    //mywindow.focus(); // necessary for IE >= 10

    //mywindow.print();
    //mywindow.close();
    $('#imagenFlotante').fadeOut(0);
    window.print();
    return true;
}