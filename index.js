var readline = require('readline');
var _= lodash   = require('lodash');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el numero:', (answer) => 
{
	console.log(getCombinationsThatSum(answer));	
	process.exit(1);
});

var getCombinationsThatSum = function(number)
{
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