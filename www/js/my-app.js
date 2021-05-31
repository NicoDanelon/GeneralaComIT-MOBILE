/*
Para entender mejor el codigo sacar commentarios "//" a 
lineas: 47, 57, 76, 81, 87, 91, 94, 101, 108, 111, 131, 134, 140
*/




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
      {path:'/gamePage/', url: 'gamePage.html',},
      {path:'/index/', url: 'index.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
//inicio de index
$$(document).on('page:init','.page[data-name="index"]', function (e) {    $$('#gamePage').on('click', fnGoGamePage)})
//inicio de igamepage
$$(document).on('page:init', '.page[data-name="gamePage"]', function (e) {fnCreateGrid();saveRow();fnBtnClicks();$$('#irAIndex').on('click', fnIrAIndex);})
//variables a usar en el sistema
let player1='', player2='', currentRow=0, cantDados=0, currentCol=0, score1=0, score2=0, total1=0, total2=0,player1TotalScore= 0, player2TotalScore= 0 //declaro variables a utilizar a lo largo del programa
let primeraColumna= ['PUNTAJES','UNO', 'DOS', 'TRES', 'CUATRO','CINCO', 'SEIS', 'ESCALERA','FULL','POKER','GENERALA','D.GENERALA','TOTAL'] //array para luego completar los nombres de jugadas
let jugadasGenerala=[20,30,40,50,100]//array de valores de jugadas
//FUNCIONES
function saveRow(){                           //guarda columna (currentCol) y fila (currentRow) donde se hizo el click captando sus id
  $$('.button.borders').on('click',function(e){
    currentRow =parseInt(e.target.id[1])
    currentCol =parseInt(e.target.id[3])
    //console.log(`SaveRow: Hiciste click en: columna ${currentCol} y fila: ${currentRow}.`) //propositos de debug
    if(e.target.id.length>4){                 //Cuando el id es de 5 caracteres (porque la fila es 10 o mas)se van a tomar dos valores en fila
      currentRow =parseInt(e.target.id[1]+e.target.id[2]);
      currentCol =parseInt(e.target.id[4])
    }
  })
}
function fnBtnClicks(){                       //Cuando el popOver esta abierto:
  $$('.abou.button').on('click',function(e){  //en los elementos con dclase  abou y button
    cantDados=parseInt(e.target.id[0])        //paso el id[0] (van del 1 al 5) segun la cantidad de dados que elija el jugador
    //console.log(`Clickeaste en  ${cantDados} ahora se va a ejecutar la multiplicacion`) //propositos de debug
    fnmultiplicar()
  })
  $$('.servi.button').on('click',function(e){ //en los elementos con dclase  servi y button
    if(isNaN(parseInt(e.target.id))){         //reviso si el id no es un numero
      score1='-', score2='-'                  //como no es numero ejacuto la funcion update display con scores='-'
      updateDisplay() 
    }else{                                    //si es numero
      let indice=currentRow-7                 // le saco 7 al current row para que mi indice sea del 0 al 5
      score1=jugadasGenerala[indice]+parseInt(e.target.id) //con el indice utilizo el array de jugadas y lo sumamos al numero proveniente del id (+0 o +5)
      score2=jugadasGenerala[indice]+parseInt(e.target.id)
    }
    updateDisplay()
  })
}
function fnmultiplicar(){                     //Selecciona a quien va a sumarle los puntos segun su current col
  currentCol==1? score1=currentRow*cantDados : score2=currentRow*cantDados //si es col 1 a score1 sino a score 2
  if(isNaN(score1)){score1='-'}                //si alguno no es numero se guarda -
  if(isNaN(score2)){score2='-'}
  //console.log(`fnmultiplicar: Para multiplicar hay que saber en que columna apretaste antes, en este caso fue ${currentCol} por lo que se le multiplica a ese jugador`)//propositos de debug 
  updateDisplay()
}
function updateDisplay(){                      //Segun su columna actualiza la casilla del id seleccionado con el valor score 1 o 2 
  currentCol==1?$$('#r'+currentRow+'c'+currentCol).html(score1) : $$('#r'+currentRow+'c'+currentCol).html(score2)
  //console.log(`UpdateDisplay: Ya actualice la casilla apretada, en este caso por su id fue  fue #r${currentRow}c${currentCol}`) //propositos de debug
  totalresultados()
}

function totalresultados(){                    // actualiza la ultima columna con los resultados totalas
  player1TotalScore= 0, player2TotalScore= 0
  //console.log(`totalresultados: Ahora sumo el total recorriendo toda la columna`) //propositos de debug
  revisarTachar()
  $$('#r12c1').html(player1TotalScore)
  $$('#r12c2').html(player2TotalScore)
  //console.log(`totalresultados: ya actualice el resultado `) //propositos de debug
}
function revisarTachar(){                      //revisa las columnas completas y suma solo numeros
  //console.log(`revisarTachars: primero reviso que sean numeros`) //propositos de debug
  for(let h=1;h<12;h++){
    if(!isNaN(parseInt($$('#r'+h+'c'+1).html()))){player1TotalScore+=parseInt($$('#r'+h+'c'+1).html())}
    if(!isNaN(parseInt($$('#r'+h+'c'+2).html()))){player2TotalScore+=parseInt($$('#r'+h+'c'+2).html())}
  }
}
function fnCreateGrid(){                              //Crea la grid para no realizarla manualmente en gamePage
  console.log(`Creando grid: `)//propositos de debug
  for(let i=0;i<13;i++){                              //itera sobre filas
    let rowname= 'row '+i                             //segun i cambio de nombre a la fila (rowname)
    //if(i==5){console.log(`Ejemplo de Fila 5: nombre ${rowname}`)}//propositos de debug
    rowname=document.createElement( "div" )           //creo un elemento div llamado rowname 
    rowname.classList.add('row', 'borders')           //les agrego la clase row y borders
    $$('#grid').append(rowname)                       //coloca cada elemento en el contrainer de id grid
    //if(i==5){console.log(`Ejemplo de Fila 5: div completa (clases añadidas)${rowname}`)}//propositos de debug
    for(let j=0;j<3;j++){                             //dentro de cada fila crea 3 celdas.
      let cellname= 'grid '+j                         //con j cambia el nombre de la celda
      if(i==5 && j==1){console.log(`Ejemplo de col 1: nombre ${cellname}`)}//propositos de debug
      cellname= document.createElement( "div" )       //creo un elemento div llamado cellname
      cellname.id='r'+i.toString()+'c'+j.toString()   //le genero un id concatenando r+i+c+j 
      fnSelect(j,i,cellname)                          //ejecuto fnSelect para llenar cada celda
      rowname.append(cellname)                        //uso append para agregar la celda a la fila
      if(i==0){                                       //chequeo que la primer fila no sean popups
        cellname.classList.add('col-33', 'borders', 'players')//agrego clases
      }else if(j==0){                                 //chequeo que la primer columna no sean popups
        cellname.classList.add('col-33', 'borders')   //agrego clases
      }else if(i==12){                                //chequeo que la ultima fila no sean popups
        cellname.classList.add('col-33', 'borders', 'result')//agrego clases
      }else{                                          //si pasan esos controles
        if(i>6){                                      //se usa el data-popup =popup-services para jugadas y el popup-about para numeros, estos funcionan para saber que menu se va a abrir cuando se clickeen
          cellname.classList.add('col-33', 'borders', 'button', 'popup-open')
          cellname.setAttribute('data-popup', '.popup-services'); 
        }else{
          cellname.classList.add('col-33', 'borders', 'button', 'popup-open')
          cellname.setAttribute('data-popup', '.popup-about');  
        } 
      }
      //if(i==5 && j==1){console.log(`Ejemplo de col 1: completa (clases e id) ${cellname}`)}//propositos de debug
    }
  }
  //console.log(`ya cree la grid`)//propositos de debug
}
function fnGoGamePage(){   
  if ($$('#player1Name').val()==""){
    player1= 'Jugador 1';               //si no coloca nombre colocamos por defecto el indicado.
  }else{
    player1= $$('#player1Name').val();
  }                           //funcion para moverse de pestaña uno a dos
  if ($$('#player2Name').val()==""){
    player2= 'Jugador 2';               //si no coloca nombre colocamos por defecto el indicado.
  }else{
    player2= $$('#player2Name').val();
  }    
  mainView.router.navigate('/gamePage/')
  //console.log(`Entre a la pagina 2, guarde nombres de p1: ${player1} y p:2 ${player2}.`)
}

function fnIrAIndex(){
  mainView.router.navigate('/index/'); //para finalizar y resetear los campos.
}

function fnSelect(j,i,cellname){                                                  //funcion que llena elementos al principio
  j==0?cellname.innerHTML=primeraColumna[i] : cellname.innerHTML=0                //si es j=0 (la primer columna) lleno con el array primera columna, sino con 0
  if (i==0 && j!=0){j==1?cellname.innerHTML=player1:cellname.innerHTML=player2}   //si estoy en la primer fila coloco los nombres
}

