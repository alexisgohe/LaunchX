const BOTON_NUMBER = document.getElementsByName("data-number");
const BOTON_OPERADOR = document.getElementsByName("data-operador");
const BOTON_EQUAL = document.getElementsByName("data-equal")[0];
const BOTON_CLEAR = document.getElementsByName("data-clear")[0];
const ELIMINAR_ULTIMO = document.getElementById("eliminar-ultimo");
const BTN_RAIZ_CUADRADA = document.getElementById("raiz-cuadrada");
const BOTON_POTENCIA = document.getElementById("boton-potencia");
const BOTON_RESIDUO = document.getElementById("boton-residuo");
const RESULT = document.getElementById("display");
let opeActual = "";
let opeAnterior = "";
let operacion = undefined;

function asignarManejadorDeEvento(elemento, funcion) {
  elemento.addEventListener("click", funcion);
}

BOTON_NUMBER.forEach((boton) =>
  asignarManejadorDeEvento(boton, () => agregarNumero(boton.innerText))
);

BOTON_OPERADOR.forEach((boton) =>
  asignarManejadorDeEvento(boton, () => selectOperacion(boton.innerText))
);

asignarManejadorDeEvento(BOTON_EQUAL, () => {
  calcular();
  actualizarDisplay();
});

asignarManejadorDeEvento(BOTON_CLEAR, () => {
  clear();
  actualizarDisplay();
});

asignarManejadorDeEvento(ELIMINAR_ULTIMO, eliminarUltimoDigito);

asignarManejadorDeEvento(BTN_RAIZ_CUADRADA, raizCuadrada);

asignarManejadorDeEvento(BOTON_POTENCIA, potencia);

asignarManejadorDeEvento(BOTON_RESIDUO, residuo);

function selectOperacion(op) {
  if (opeActual === "") return;
  if (opeAnterior !== "") {
    calcular();
  }
  operacion = op.toString();
  opeAnterior = opeActual;
  opeActual = "";
}

function calcular() {
  let calculo;
  const anterior = parseFloat(opeAnterior);
  const actual = parseFloat(opeActual);
  if (isNaN(anterior) || isNaN(actual)) return;
  switch (operacion) {
    case "+":
      calculo = anterior + actual;
      break;
    case "-":
      calculo = anterior - actual;
      break;
    case "*":
      calculo = anterior * actual;
      break;
    case "/":
      calculo = anterior / actual;
      break;
    default:
      return;
  }
  opeActual = calculo.toFixed(2);
  operacion = undefined;
  opeAnterior = "";
}

function agregarNumero(num) {
  // Si el número es un punto y el operando actual ya tiene un punto,
  // no se agrega el punto
  if (num === "." && opeActual.includes(".")) {
    return;
  }
  opeActual = opeActual.toString() + num.toString();
  actualizarDisplay();
}

function clear() {
  opeActual = "";
  opeAnterior = "";
  operacion = undefined;
}

function actualizarDisplay() {
  RESULT.value = opeActual;
}

function eliminarUltimoDigito() {
  // Si el operando actual está vacío, no hace nada
  if (opeActual === "") {
    return;
  }
  // Si el operando actual es un número entero, se elimina el último dígito
  if (opeActual.indexOf(".") === -1) {
    opeActual = opeActual.slice(0, -1);
  }
  // Si el operando actual es un número decimal, se elimina el último dígito después del punto
  else {
    const enteros = opeActual.slice(0, opeActual.indexOf("."));
    const decimales = opeActual.slice(opeActual.indexOf(".") + 1, -1);
    opeActual = enteros + "." + decimales;
  }
  actualizarDisplay();
}

function raizCuadrada() {
  if (opeActual === "") return;
  opeActual = Math.sqrt(opeActual).toFixed(2);
  actualizarDisplay();
}

function potencia() {
  // Convierte el operando actual a un número y lo eleva al cuadrado
  opeActual = (parseFloat(opeActual) ** 2).toFixed(2);
  actualizarDisplay();
}

function residuo() {
  // Convierte el operando actual a un número y calcula su residuo al dividirlo por 10
  opeActual = (parseFloat(opeActual) % 10).toFixed(2);
  actualizarDisplay();
}