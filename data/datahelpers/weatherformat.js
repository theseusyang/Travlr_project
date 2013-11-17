var formatdata = function() {
	var months = "jan     feb     mar     apr     may     jun     jul     aug     sep     oct     nov     dec";
  var highs = "38 40  50  61  72  80  85  84  76  65  54  43";
  var lows = "26  27  35  44  54  63  69  67  60  50  41  31";

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