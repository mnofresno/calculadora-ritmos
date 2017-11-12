var askTheUser = function()
{
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	
	
	var permutationKey = 'p!';
	
	rl.question('Ingrese el numero (Agregar ' + permutationKey + ' al final para incluir las permutaciones):', (answer) => 
	{
		if(answer.endsWith(permutationKey))
		{
			answer = answer.substr(0, answer.length - permutationKey.length);
			console.log(getAllIncludingPermutedCombinationsThatSum(answer));
		}
		else
		{
			console.log(getCombinationsThatSum(answer));
		}
		process.exit(0);
	});
};

if(typeof window === 'undefined')
{
	var readline = require('readline');
	var _= lodash   = require('lodash');
	askTheUser();
}

var getAllIncludingPermutedCombinationsThatSum = function(number)
{
	var result = [];
	var nonPermuted = getCombinationsThatSum(number);
	
	_.forEach(nonPermuted, function(np)
	{
		heapsPermute(np, function(p)
		{
			addOnce(result, p);
		});
	});
	return result;
};

var addOnce = function(toWhere, addWhat)
{
	var exists = _.find(toWhere, function(t)
	{
		return t.toString() === addWhat.toString();
	});
	if(!exists)
	{
		toWhere.push(addWhat.slice());
	}
};

// Por el momento esta funcion no se usa
var permute = function(input)
{
	var output = [];
	
	heapsPermute(input, function(p)
	{
		output.push(p.slice());
	});
	
	return output;
};
 
var getCombinationsThatSum = function(number)
{
	if(isNaN(number))
	{
		return "El valor ingresado no es un numero.";
	}
	return  getCombinationSum(getAllNumberUpTo(number), number);
};

var getAllNumberUpTo = function(upToWhat)
{
	return getAllNumbersFromTo(1, upToWhat);
};

var getAllNumbersFromTo = function(from, to)
{
	var result = [];
	for(var i = from; i <= to; i++)
	{
		result.push(i);
	}
	return result;
};

var getCombinationSum = function(candidates, target)
{
	candidates = _.orderBy(candidates);
	
	var result = [];
	
	getResult(result, [], candidates, target, 0);
	
	return result;
};

var getResult = function(result, cur, candidates, target, start)
{
	if(target > 0)
	{
		for(var i = start; i < candidates.length && target >= candidates[i]; i++)
		{
			cur.push(candidates[i]);
			getResult(result, cur, candidates, target - candidates[i], i);
			cur.pop();
		}
	}
	else if(target == 0)
	{
		result.push(cur.slice());
	}
};

var swap = function (array, pos1, pos2)
{
	var temp = array[pos1];
	array[pos1] = array[pos2];
	array[pos2] = temp;
};

var heapsPermute = function (array, output, n)
{
	n = n || array.length; // set n default to array.length
	if (n === 1)
	{
		output(array);
	} 
	else
	{
		for (var i = 1; i <= n; i += 1)
		{
			heapsPermute(array, output, n - 1);
			if (n % 2)
			{
				var j = 1;
			}
			else
			{
				var j = i;
			}
			swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
		}
	}
};
