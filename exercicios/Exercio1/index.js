// index.js
const prompt = require("prompt-sync")();
const calc = require("./calculadora");

console.log("=== Calculadora Node.js ===");
console.log("Escolha a operação:");
console.log("1 - Somar");
console.log("2 - Subtrair");
console.log("3 - Multiplicar");
console.log("4 - Dividir");
console.log("5 - Ao Quadrado");
console.log("6 - Raiz Quadrada");

const opcao = parseInt(prompt("Digite o número da operação: "));

let a, b, resultado;

switch (opcao) {
  case 1:
    a = parseFloat(prompt("Digite o primeiro número: "));
    b = parseFloat(prompt("Digite o segundo número: "));
    resultado = calc.somar(a, b);
    break;
  case 2:
    a = parseFloat(prompt("Digite o primeiro número: "));
    b = parseFloat(prompt("Digite o segundo número: "));
    resultado = calc.subtrair(a, b);
    break;
  case 3:
    a = parseFloat(prompt("Digite o primeiro número: "));
    b = parseFloat(prompt("Digite o segundo número: "));
    resultado = calc.multiplicar(a, b);
    break;
  case 4:
    a = parseFloat(prompt("Digite o primeiro número: "));
    b = parseFloat(prompt("Digite o segundo número: "));
    resultado = calc.dividir(a, b);
    break;
  case 5:
    a = parseFloat(prompt("Digite o número: "));
    resultado = calc.aoQuadrado(a);
    break;
  case 6:
    a = parseFloat(prompt("Digite o número: "));
    resultado = calc.raizQuadrada(a);
    break;
  default:
    resultado = "Opção inválida!";
}

console.log("Resultado:", resultado);
