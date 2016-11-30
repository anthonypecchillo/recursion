// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


// Original Solution from Fulcrum (eeewwww!!!):
// --------------------------------------------
var stringifyJSON = function(obj) {
  
  var temp = "" + '[';
  var temp2 = "" + '{';

  var internalArrayHelper = function(inputArray, item, index) {
    if (index < inputArray.length - 1) {
      if (typeof item === 'string') {
          temp = temp + '"' + item + '"' + ',';
        } else {
          temp = temp + item + ','; 
        }
    } else {
      if (typeof item === 'string') {
          temp = temp + '"' + item + '"' + ']';
        } else {
          temp = temp + item + ']';
          console.log(temp);  
        }
    }
  };
  
  var recursiveArrayFunction = function(inputArray) {
    inputArray.forEach(function(item, index) {
      if (Array.isArray(item)) {
        if (item.length === 0) {
          temp += '[],';
          // return temp;
        } else {
          temp += '[';
          recursiveArrayFunction(item);
          if (index < item.length) {
            temp += ']';
          } else {
            temp +=  ',';
          }
        }
      } else if (typeof item === 'object') {
        temp += recursiveObjectFunction(item);  // could also just use 'item' as the function parameter?
        if (index < inputArray.length - 1) {
          temp += ',';
        } else {
          temp += ']';
        }

        temp2 = '{';

      } else {
        internalArrayHelper(inputArray, item, index);
      }
    });
    console.log('temp is:' + temp);
    return temp;
  };

  var recursiveObjectFunction = function(inputObject) {

    (Object.keys(inputObject)).forEach(function(item, index) {
      if (typeof inputObject[item] === 'function' || inputObject[item] === undefined) {
        if (index >= Object.keys(inputObject).length - 1) {
          temp2 += '}';
        }

      } else if (Array.isArray(inputObject[item])) {
        temp2 += '"' + item + '"' + ':';

        if (inputObject[item].length === 0) {
          temp2 += '[]'; 
        } else {
          temp2 += recursiveArrayFunction(inputObject[item]);
        }

        if (index < Object.keys(inputObject).length - 1) {
          temp2 += ',';
        } else {
          temp2 += '}';
        }
      
      } else if (typeof inputObject[item] === 'object') {
        if (inputObject[item] === null) {
          if (index < Object.keys(inputObject).length - 1) {
            temp2 += '"' + item + '"' + ':' + null + ',';
          } else {
            temp2 += '"' + item + '"' + ':' + null + '}';
          }
        } else if (Object.keys(inputObject[item]).length === 0) {
          if (index < Object.keys(inputObject).length - 1) {
            temp2 += '"' + item + '"' + ':' + '{}' + ',';
          } else {
            temp2 += '"' + item + '"' + ':' + '{}';
          }
        } else {  
          temp2 += '"' + item + '"' + ':' + '{';
          recursiveObjectFunction(inputObject[item]);
          temp2 += '}';
        }
      
      } else {
        // console.log(temp2);
        if (index < Object.keys(inputObject).length - 1) {
          if (typeof inputObject[item] === 'string') {
            temp2 += '"' + item + '"' + ':' + '"' + inputObject[item] + '"' + ',';
          } else {
            temp2 += '"' + item + '"' + ':' + inputObject[item] + ',';
          }
        } else {
          if (typeof inputObject[item] === 'string') {
            temp2 += '"' + item + '"' + ':' + '"' + inputObject[item] + '"' + '}';
          // } else if (inputObject[item] === null) {
          //  temp2 += '"' + item + '"' + ':' + null + '}';
          } else {
            temp2 += '"' + item + '"' + ':' + inputObject[item] + '}';
          }
        }
      }
    });
    console.log(temp2);
    return temp2;
  };


    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj.toString();
    
    } else if (obj === null) {
      return 'null';
    
    } else if (typeof obj === 'string') {
      return '"' + obj + '"';

    } else if (Array.isArray(obj)) {
    // var temp = '\'' + '[';
    if (obj.length === 0) {
      return '[]';
    } else {
      recursiveArrayFunction(obj);
    }

    temp += "";
    return temp;

    } else {
      if (Object.getOwnPropertyNames(obj).length < 1) {
        return '{}';
      } else {
        return recursiveObjectFunction(obj);
      }
    }
};
