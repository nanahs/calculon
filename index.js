const calculon = document.getElementById("calculon");
const response = document.getElementById("response");
[...calculon.getElementsByTagName("button")].map((button) => {
  button.addEventListener("click", handleButtonClick);
});

const operations = {
  x: (x, y) => {
    return x * y;
  },
  "÷": (x, y) => {
    return x / y;
  },
  "+": (x, y) => {
    return x + y;
  },
  "-": (x, y) => {
    return x - y;
  },
};

let currentBuffer = "";
let priorBuffer = "";
let operator = undefined;

function setNumber(newVal) {
  currentBuffer = currentBuffer.toString() + newVal;
  currentBuffer = currentBuffer.slice(0, 9);
}

function setOperator(op) {
  if (currentBuffer.length === 0) return;
  if (priorBuffer.length !== 0) {
    calc();
  }

  operator = op;
  priorBuffer = currentBuffer;
  currentBuffer = "";
  renderResponse(priorBuffer);
}

function calc() {
  currentBuffer = operations[operator](getBufferVal(priorBuffer), getBufferVal(currentBuffer));
  operator = undefined;
  priorBuffer = "";
}

function renderResponse(buffer) {
  let val = getBufferVal(buffer);

  if (val === Infinity) {
    response.innerText = "Undefined";
  }

  if (val.toString().length > 10) {
    response.innerText = "Error";
  } else {
    response.innerText = val;
  }
}

function clear() {
  currentBuffer = "";
  priorBuffer = "";
  operator = undefined;
  renderResponse(currentBuffer);
}

function getBufferVal(buffer) {
  let strVal = buffer.toString();
  return buffer.length === 0 ? 0 : parseFloat(strVal);
}

function handleButtonClick(event) {
  const inputVal = event.target.innerText;

  switch (inputVal) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      setNumber(inputVal);
      renderResponse(currentBuffer);
      break;
    case "÷":
    case "x":
    case "-":
    case "+":
      setOperator(inputVal);
      break;
    case "=":
      calc();
      renderResponse(currentBuffer);

      break;
    case "AC":
      clear();
      renderResponse(currentBuffer);

      break;
    default:
      console.log("should not happen");
  }
}
