function arrayToUnique(arr) {
    var result = arr;
    if (result.length > 1) {
        for (var i = result.length - 1; i>0; i--) {
            for (var ii = i - 1; ii>=0; ii--) {
                if (result[i]===result[ii]) {
                    result.splice(i, 1);
                    break;
                }
            }
        }
    }
    return result;
}
console.log(arrayToUnique(['a', 'b', 'c', 'd', 'a', 'e', 'f', '2', 2]));