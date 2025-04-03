//Lienzo del canvas
const canvas = document.getElementById("lineChart");
const ctx = canvas.getContext("2d");

//Datos que se van a graficar
const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const sanSalvador = [30, 32, 34, 35, 36, 37, 36, 35, 34, 32, 31, 30];
const santaTecla = [25, 26, 28, 29, 31, 32, 32, 31, 30, 28, 27, 26];

//Márgenes de bordes izquierdo y derecho
const marginLeft = 50;
const marginRight = 50;

//Función para dibujar la línea con etiquetas
function drawLineWithLabels(data, color){
    ctx.beginPath(); //Se coloca el puntero en el lienzo
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    for(let i=0; i<data.length; i++){
        //Iniciar y finalizar en los bordes establecidos del lienzo (es decir, que no se salga de los bordes)
        const x = (i/(data.length - 1)) * (canvas.width - marginLeft - marginRight) + marginLeft;
        const y = canvas.height - (data[i] - 15) * 10; //Escalado vertical
                                //Arreglo - 15 pixeles * 10 pixeles

        //Dibujar la línea
        if (i === 0){
            ctx.moveTo(x,y); //Ubicar posición del puntero
        }else{
            ctx.lineTo(x,y); //Trazar línea a posición calculada en "x" e "y"
        }

        //Asignar el color a la línea
        ctx.fillStyle = color;
        ctx.font = "12px Arial"; //Estilo de texto (por etiquetas que se mostrarán en la gráfica)
        ctx.fillText(data[i] + "°C", x+5, y-5); //Valor a mostrar en etiqueta, posición en eje "x", posición en eje "y"
    }

    ctx.stroke(); //Dibujar
}

// Función para dibujar las etiquetas y los ejes
function drawAxes(){
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    //Eje x
    ctx.moveTo(50, canvas.height - 50); //Ubicar la posición del puntero en eje "x" e "y"
    ctx.lineTo(canvas.width - 50, canvas.height - 50); //Trazar la línea a posición específica (800 - 50), (400 - 50) de acuerdo con el html

    //Eje y
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(50, 50);

    //Dibujar
    ctx.stroke();

    //Etiquetas en eje x
    for (let i=0; i<labels.length; i++){ //Se recorre el arreglo en etiquetas
        const x = (i/(labels.length - 1)) * (canvas.width - 100) + 50; //La etiqueta estará en la misma posición del punto graficado
        ctx.fillText(labels[i], x, canvas.height - 30); //Mostrar el texto del arreglo "labels" en la posición calculada en x pero 30 px superior
    }

    //Etiquetas en eje y
    for (let i=20; i<=40; i+=5){ //En el eje y se mostrará un rango desde los 20°C hasta los 40°C con saltos de 5°C
        const y = canvas.height - 50 - (i-20) * 10; //Posición de cada grado centígrado, irá decrementando
        ctx.fillText(i+"°C",20, y+5); //Dibujar
    }
}

drawAxes(); //Dibujar los ejes "x" e "y"
drawLineWithLabels(sanSalvador, 'red'); //Línea de color rojo para la gráfica de San Salvador
drawLineWithLabels(santaTecla, 'blue'); //Línea de color azul para la gráfica de Santa Tecla

//Leyenda de la gráfica
ctx.fillStyle = 'red';
ctx.fillRect(70,20,10,10); //Dibujar un rectángulo de 70px de ancho, 20px de alto, posición x=10, posición y=10
ctx.fillStyle = 'black';
ctx.fillText("San Salvador", 85,30); //Colocar el texto: "San Salvador" en la posición eje x=85, eje y=30

ctx.fillStyle = 'blue';
ctx.fillRect(170,20,10,10); //Dibujar un rectángulo de 170px de ancho, 20px de alto, posición x=10, y=10
ctx.fillStyle = 'black';
ctx.fillText("Santa Tecla", 185,30) //Colocar el texto "Santa Tecla" en la posición eje x=185, eje y=30