const juego = {};
var tablai;
var ctx;
var estado; //0:espera en seleccion, 1: Seleccionada, 2: accion efectuada

function onLoad(e) {
	//var auxjug=1;
	var tablero=[]; //Fila\/, Columna<->
	for (var i=0; i<8; i++)
	{
		tablero[i]= new Array(8);	//Matriz de 8*8 Cuadro de 150*150
		if(i%2==0)
		{
			if (i<=2) {
				tablero[i][0]=tablero[i][2]=tablero[i][4]=tablero[i][6]=2;
			}
			else if(i>=5) {
				tablero[i][0]=tablero[i][2]=tablero[i][4]=tablero[i][6]=1;
			}

		}
		else
		{
			if (i<=2) {
				tablero[i][1]=tablero[i][3]=tablero[i][5]=tablero[i][7]=2;
			}
			else if(i>=5){
				tablero[i][1]=tablero[i][3]=tablero[i][5]=tablero[i][7]=1;
			}
		}
	}

	//document.body.addEventListener("keypress", dibujo);
	document.getElementById("reinicio").addEventListener("click", onLoad);
	document.getElementById("reinicio").addEventListener("click", dibujo);

	juego.tablero = tablero;
	tablai=document.getElementById("tabla");
	ctx = tablai.getContext("2d");
	tablai.addEventListener("click", mouse1);//Primer click
	juego.ctx = ctx;
	juego.play1= document.getElementById("ficha1");
	juego.play2= document.getElementById("ficha2");
	juego.play1r=document.getElementById("ficha1R");
	juego.play2r=document.getElementById("ficha2R");
	juego.turno=1;
	
	dibujo();
	estado=0;
}
//------------------------------------------------Funcion de dibujo PRincipal: LLamar esta a cada rato D,:--------------------
function dibujo(){
	ctx.clearRect(0, 0, 1200, 1200);
	var i=0;
	var j=0;
	var posx=0;
	var posy=0;
	//ctx.beginPath();
	for(const fila of juego.tablero){
		for(const columna of fila){
				if(columna==1 || columna==3)
				{
					if (columna==1)
					{
						ctx.drawImage(juego.play1, posx, posy);//Dibujar ficha de jugador uno
					}
					else{
						ctx.drawImage(juego.play1r, posx, posy);//Dibujar ficha de jugador uno REINA
					}
					
					
				}
				else if(columna==2 || columna==4){
					if (columna==2)
					{
						ctx.drawImage(juego.play2, posx, posy);//Dibujar ficha de jugador dos
					}
					else{
						ctx.drawImage(juego.play2r, posx, posy);//Dibujar ficha de jugador dos REINA
					}

				}

				posx+=150;
			}
		posx=0;
		posy+=150;
	}

	ctx.stroke();
}
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHH!!!!!!!!!!!!!!!!!!
function mouse1(e){
	var x=e.clientX;
	var y=e.clientY-80;
	//alert("Posiciones"+x+", "+y)
	var fila=Math.trunc(y/150); //<->
	var columna=Math.trunc(x/150);// \/

	if(estado==0){
			//alert("Fila:"+fila+" Columna:"+columna);
 		if (juego.tablero[fila][columna]==juego.turno || juego.tablero[fila][columna]==juego.turno+2)
 		{
 			estado=1;
 			//alert("Ficha seleccionada")
 			juego.selectX=columna;
 			juego.selectY=fila;
 		}
 		else{
 			alert("Movimiento no Valido");
 		}
	}
	else if (estado==1){

		if (juego.turno==1){
			if (juego.tablero[fila][columna]==undefined && ((juego.selectX+1)==columna||(juego.selectX-1)==columna && (juego.selectY-1)==fila))//Movimiento estandar, sin eliminacion 
				{ //solo para ficha estandar
					juego.tablero[juego.selectY][juego.selectX]=undefined;
					
					if(fila==0){
						juego.tablero[fila][columna]=3;
					}
					else{
						juego.tablero[fila][columna]=1;
					}
					dibujo();
					estado=0;
					juego.turno=2;
				}

		}
		else{//turno de jugador 2
			if (juego.tablero[fila][columna]==undefined && ((juego.selectX+1)==columna||(juego.selectX-1)==columna && (juego.selectY+1)==fila))//Movimiento estandar, sin eliminacion 
				{ //solo para ficha estandar
					juego.tablero[juego.selectY][juego.selectX]=undefined;
					
					if(fila==7){
						juego.tablero[fila][columna]=4;
					}
					else{
						juego.tablero[fila][columna]=2;
					}
					dibujo();
					estado=0;
					juego.turno=1;
				}
		}
	}

}

window.addEventListener("load",onLoad);