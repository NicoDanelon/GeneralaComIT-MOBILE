// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7; //declaro al $$ como palabra reservada.

var app = new Framework7({//defino una nueva instancia de mi framework7 llamada app
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
      {
        path:'/gamePage/',
        url: 'gamePage.html',
      },
      {
        path:'/index/',
        url: 'index.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
//inicio de index
$$(document).on('page:init','.page[data-name="index"]', function (e) {
    $$('#jugar').on('click', fnJugar);
  })
//inicio de igamepage
$$(document).on('page:init', '.page[data-name="gamePage"]', function (e) {
      totalJugador1 = 0, totalJugador2 = 0;
      $$('#jug1').html(jugador1);
      $$('#jug2').html(jugador2);
      botones=document.querySelectorAll('.popup-open')
      aboutPopUp=document.querySelectorAll('.abou')
      servicesPopUp=document.querySelectorAll('.servi')
      popUpClose=document.querySelectorAll('.popup-close')
      fnllenarBotones()
      fnmultiplicar()
      jugadas()
      dialog()
              //     7   8   9   10    11 fila
})            //      0   1   2   3     4   poA  fila=posicion-7
let jugadasGenerala=[20, 30, 40 ,50 , 100]// 
let botones=[]
let popUpClose=[]
let aboutPopUp=[]
let servicesPopUp= []//[bt1,bt2, bt3].id=null--> servicesPopUp[0]-->btn1  -->bt1.id--> 
let resutladoJugador1=0
let totalJugador1=0, totalJugador2=0
let arrayGanador=[]
let jugador1 = '',
    jugador2 = '',
    fila = 0,
    columna = 0

//algoritmo del ganador --> dialog
//finalizar                 aceptar='La rompiste kpo'  cancelar='seguimos jugan2' 
//funcion click --> dialogo: back estas seguro que quiera volver?
//
function determinarGanador(){
    arrayGanador=[]
    console.log(arrayGanador)
    for(let i=1 ;i<=22;i++){
      if ($$('#R'+i+'1').html()!==null){
        if($$('#R'+i+'1').html()!=0){arrayGanador.push($$('#R'+i+'1').html())}
      }
      if ($$('#R'+i+'2').html()!==null){
        if($$('#R'+i+'2').html()!=0){arrayGanador.push($$('#R'+i+'2').html())}
      }   
    }
    if(arrayGanador.length==22){
      if(totalJugador1>totalJugador2){
        ganste(jugador1, totalJugador1)
      }else if(totalJugador1<totalJugador2){
        ganste(jugador2, totalJugador2)
      }else{
        ganste('Na, mentira empataron', totalJugador1)
      }
    }
}
function ganste(elganador, puntos){
  $$('.dialog-title').html('Tachame la doble') ;
    app.dialog.confirm('Ganaste '+elganador+' con '+ puntos , 'Tachame la doble', function () {
      mainView.router.navigate('/index/');
    });
}
function dialog(){
  $$('.open-confirm').on('click', function () {
    sumarTotal()
    let ganadorMomentaneo='Na mentira, empataron!'
    if(totalJugador1>totalJugador2){
       ganadorMomentaneo= jugador1
    }else if(totalJugador1<totalJugador2){ 
      ganadorMomentaneo= jugador2
    }
      app.dialog.confirm('Ganaste '+ganadorMomentaneo, 'Tachame la doble', function () {//cambiar
      mainView.router.navigate('/index/');
    })
  });
}
function sumarTotal() {
    totalJugador1 = 0
    totalJugador2 = 0   
    for (let i = 1; i <= 11; i++) {
        if (!isNaN($$('#R' + i + '1').html())) { totalJugador1 += parseInt($$('#R' + i + '1').html()) }
    }
    for (let i = 1; i <= 11; i++) {
        if (!isNaN($$('#R' + i + '2').html())) { totalJugador2 += parseInt($$('#R' + i + '2').html()) }
    }
    $$('#total1').html(totalJugador1)
    $$('#total2').html(totalJugador2)
    
}

function fnActualizarDisplay() {
    $$('#R' + fila + columna).html(resutladoJugador1)
    if (isNaN(resutladoJugador1)) {
        $$('#R' + fila + columna).html('-')
    }
    determinarGanador()
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
    }
}

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
