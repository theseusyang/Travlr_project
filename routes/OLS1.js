var findnearest = function(docs, targetdoc, limit) { //docs is a mongodb cursor
  // docs is all documents from database, targetcity's doc, and the number of results to return
  

  var targetchars = targetdoc.characteristics;
  // console.log(targetdoc.name);
  var citychars = {};
  var olsarray = [];
  var sumols = 0.0;
  var totaltarget = 0.0;

  var targetcharrank = []; // [[key, value], [key, value]]
  for (var key in targetchars) {
    totaltarget += targetchars[key];
    targetcharrank.push([key, targetchars[key]]);
  }
  targetcharrank.sort(function(a,b) { //sort the array
    return a[1] - b[1];
  });

  var charkey = '';
  var charvalue = 0;
  for (var i = 0; i < docs.length; i++) { //perform OLS calculation for each destination
    citychars = docs[i].characteristics;
    // for (var j = 0; j < targetcharrank.length; j++) {
    //   charkey = targetcharrank[j][0];
    //   charvalue = targetcharrank[j][1];
    //   // ols is the OLS weighted by the ranking of the char, the highest char of target gets 8, then 7, then 6..
    //   sumols += Math.pow(parseFloat(charvalue) - parseFloat(citychars[charkey]), 2)*(targetcharrank.length-j);
    // }
    for (var key in targetchars) {

      sumols += Math.pow(parseFloat(targetchars[key]) - parseFloat(citychars[key]), 2)*(targetchars[key]/totaltarget);
    }
    olsarray.push([i, sumols]);
    console.log('id is  ' + docs[i].name + ' and sumOLS is ' + sumols);
    sumols = 0;
  }
  olsarray.sort(function(a,b) { // sort the OLS array
    return a[1] - b[1];
  });

  var result = [];
  for (var i = 0; i < limit + 1; i++) {
    result.push(docs[olsarray[i][0]]);
    // console.log(docs[olsarray[i][0]]);
  }
  return result;
}


module.exports.findnearest = findnearest;