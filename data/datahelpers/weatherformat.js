var formatdata = function() {
	var months = "jan     feb     mar     apr     may     jun     jul     aug     sep     oct     nov     dec";
  var highs = "23 22.5  24.4  28.6  36.7  44.2  50.7  50.4  46  38.7  29.1  25.3";
  var lows = "13.1  12.9  14.9  19.8  27.9  33.8  38.8  38.8  35.4  29.7  19.8  15.4";

  var monthsa = months.replace(/\s+/g, " ").split(" ");
  var highsa = highs.replace(/\s+/g, " ").split(" ");
  var lowsa = lows.replace(/\s+/g, " ").split(" ");

  var string = '{';

  for (var i = 0; i < monthsa.length; i++) {
    if (i !== 0) { string += ',';}
    string += i + ':' + '['+ Math.ceil(parseInt(highsa[i])) + ',' + Math.round(parseInt(lowsa[i])) + ']';
  };
  string += '}';
  return string;
}


var formatit = function() {
  var x = {jan:[51,37],feb:[53,38],mar:[58,42],apr:[63,47],may:[70,54],jun:[78,61],jul:[84,66],aug:[83,65],sep:[77,60],oct:[68,52],nov:[58,44],dec:[53,38]};
  var i = 0;
  var string = '{';
  for (var key in x) {
    if (i !== 0) { string += ',';}
    string += i + ':'+ '[' + x[key][0] +','+x[key][1] + ']';
    i++;
  }
  string += '}';
  return string;
}