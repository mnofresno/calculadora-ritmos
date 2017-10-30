var readline = require('readline');
var lodash   = require('lodash');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el numero:', (answer) => 
{
	console.log(obtenerSumbolosQueSumen(getCombinations(permute(obtenerSimbolos(answer).split('')))), answer);
	//console.log(permute(answer.split('')));
	//console.log(obtenerSumbolosQueSumen(answer));
});

var obtenerSumbolosQueSumen = function(posiblesValores, numero)
{
	return lodash.filter(posiblesValores, function(valorActual)
	{
		var acumulador = 0;
		for(y = 0; y < valorActual.length; y++)
		{
			acumulador += parseInt(valorActual.split(',')[y]);
		}
		
		return acumulador == numero;
	});
};

var obtenerSimbolos = function(numero)
{
	var output = "";
	
	for(var x = 1; x <= numero; x++)
	{
		output += x;
	}
	
	return output;
};


var getCombinations = function (chars) {
  var result = [];
  var f = function(prefix, chars) {
    for (var i = 0; i < chars.length; i++) {
      result.push(prefix + chars[i]);
      f(prefix + chars[i], chars.slice(i + 1));
    }
  }
  f('', chars);
  return result;
};


var permute = function(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
};
