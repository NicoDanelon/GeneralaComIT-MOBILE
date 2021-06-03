// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7; //declaro al $$ como palabra reservada.

var app = new Framework7({ //defino una nueva instancia de mi framework7 llamada app
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
            { path: '/gamePage/', url: 'gamePage.html', },
            { path: '/index/', url: 'index.html', },
        ]
        // ... other parameters
});

var mainView = app.views.create('.view-main');
//inicio de index
$$(document).on('page:init', '.page[data-name="index"]', function(e) {
        $$('#jugar').on('click', fnJugar);
    })
    //inicio de igamepage
$$(document).on('page:init', '.page[data-name="gamePage"]', function(e) {
    $$('#irAIndex').on('click', fnIrAIndex);
    totalJugador1 = 0, totalJugador2 = 0;

    $$('#jug1').html(jugador1);
    $$('#jug2').html(jugador2);

    botones = document.querySelectorAll('.popup-open')
    aboutPopUp = document.querySelectorAll('.abou')
    servicesPopUp = document.querySelectorAll('.servi')
    popUpClose = document.querySelectorAll('.popup-close')
    fnllenarBotones()
    fnmultiplicar()
    jugadas()

})

/*-----VARIABLES A USAR EN EL SISTEMA-----*/

let jugadasGenerala = [20, 30, 40, 50, 100] //array de valores de jugadas
let botones = []
let popUpClose = []
let aboutPopUp = []
let servicesPopUp = []
let resutladoJugador1 = 0
let totalJugador1 = 0,
    totalJugador2 = 0


/*----FUNCIONES-----*/

function sumarTotal() {
    totalJugador1 = 0
    if (columna == 1) {
        for (let i = 1; i <= 11; i++) {
            console.log($$('#R' + i + '1').html()) // !false=true
            if (!isNaN($$('#R' + i + '1').html())) { totalJugador1 += parseInt($$('#R' + i + '1').html()) }
        }
        $$('#total1').html(totalJugador1)
    }
    if (columna == 2) {
        for (let i = 1; i <= 11; i++) {
            console.log($$('#R' + i + '2').html())
            if (!isNaN($$('#R' + i + '2').html())) { totalJugador2 += parseInt($$('#R' + i + '2').html()) }
        }
        $$('#total2').html(totalJugador2)
    }
}

function fnActualizarDisplay() {
    $$('#R' + fila + columna).html(resutladoJugador1)
    if (isNaN(resutladoJugador1)) {
        $$('#R' + fila + columna).html('-')
    }
    sumarTotal()
}

function fnRecuperarFyC(botonActual) {
    id = $$('#' + botonActual).attr('id') //"11"
    fila = parseInt(id[1]) //1
    columna = parseInt(id[2]) //1
    console.log('recupoere el valor de ' + botonActual + ' fila: ' + fila + 'columna ' + columna)
}

function jugadas() {
    $$('#ups').on('click', function(){$$('#R'+fila+columna).html('0')})
    for (let i = 0; i < servicesPopUp.length; i++) {
        $$('#' + servicesPopUp[i].id).on('click', function() { //agrega evento a cada boton segun su id
            if (servicesPopUp[i].id == 'S5') {
                resutladoJugador1 = 5 + jugadasGenerala[fila - 7]
            }
            if (servicesPopUp[i].id == 'S0') {
                resutladoJugador1 = jugadasGenerala[fila - 7]
            }
            if (servicesPopUp[i].id == 'Tachar') {
                resutladoJugador1 = '-'
            }
            fnActualizarDisplay()
        })
    }
}

function fnmultiplicar() {
  $$('#ups1').on('click', function(){$$('#R'+fila+columna).html('0')})
    for (let i = 0; i < 6; i++) {
        $$('#' + aboutPopUp[i].id).on('click', function() {
            resutladoJugador1 = parseInt(aboutPopUp[i].id[1]) * fila
            fnActualizarDisplay()
        })
    }

}

function fnllenarBotones() {
    for (let i = 0; i < 22; i++) {
        $$('#' + botones[i].id).on('click', function() {
                if (i < 18) {
                    fila = parseInt(botones[i].id[1]) //1
                    columna = parseInt(botones[i].id[2]) //1
                } else {
                    fila = parseInt(botones[i].id[1] + botones[i].id[2]) //'1'+'2'=12 fila='12'
                    columna = parseInt(botones[i].id[3]) //1
                }
            })
            //'#11'
    }
}

let jugador1 = '',
    jugador2 = '',
    fila = 0,
    columna = 0

function fnJugar() {

    jugador1 = $$('#jugador1').val();
    jugador2 = $$('#jugador2').val();
    if ($$('#jugador1').val() == "") {
        jugador1 = 'Jugador 1'; //si no coloca nombre colocamos por defecto el indicado.
    } else {
        jugador1 = $$('#jugador1').val();
    }
    if ($$('#jugador2').val() == "") {
        jugador2 = 'Jugador 2'; //si no coloca nombre colocamos por defecto el indicado.
    } else {
        jugador2 = $$('#jugador2').val();
    }

    mainView.router.navigate('/gamePage/'); //funcion para moverse de pestaña uno a dos
}

function fnIrAIndex() {
    mainView.router.navigate('/index/'); //para finalizar y resetear los campos.
}