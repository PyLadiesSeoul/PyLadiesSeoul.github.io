var matchHeight = function (objects, cols, nomatch) {
  "use strict";
  if (nomatch === undefined) {
    nomatch = false;
  }

  var i, j, group, height, max, objIndex = 0;
  var objCatArr = [];
  var maxHeightArr = [];

  for (i = 0; i < objects.length; i++) {
    group = Math.floor((i)/cols);
    if (objCatArr[group] === undefined) {
      objCatArr[group] = [];
    }
    objCatArr[group].push(objects[i]);
  }

  for (i in objCatArr) {
    max = 0;
    for (j in objCatArr[i]) {
      height = $(objCatArr[i][j]).height();
      max = Math.max(max, height);
    }
    maxHeightArr.push(max);
    if (!nomatch)
      $(objCatArr[i]).height(max);
  }

  return maxHeightArr;
};