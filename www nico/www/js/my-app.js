  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
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
      {path: '/index/', url: 'index.html',},
      {path: '/generala/', url: 'generala.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    //console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('inicia Index');

    $$('#irAGenerala').on('click', fnIrAGenerala);
})

$$(document).on('page:init', '.page[data-name="generala"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('Anotador de Generala');

  $$('#jug1').html(jugador1);
  $$('#jug2').html(jugador2);

  $$('#irAIndex').on('click', fnIrAIndex);
  
})


var jugador1 = "";
var jugador2= "";
function fnIrAGenerala(){

  if ($$('#jugador1').val()==""){
    jugador1= 'Jugador 1';
  }else{
    jugador1= $$('#jugador1').val();
  }
  if($$('#jugador2').val()==""){
    jugador2= 'Jugador 2';
  }else{
    jugador2= $$('#jugador2').val();
  }
  mainView.router.navigate('/generala/');
}

function fnIrAIndex(){
  mainView.router.navigate('/index/');
}