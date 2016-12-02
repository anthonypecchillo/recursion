// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


// My solution:
// ------------
var getElementsByClassName = function (className) {

  var elementsWithClass = [];
  var startPosition = document.body;

  var innerFunction = function(newPosition) {
  	if (newPosition.className.split(' ').indexOf(className) >= 0) {
  		elementsWithClass.push(newPosition);
  	}
    if (newPosition.children.length > 0) {
  	  for (var i = 0; i < newPosition.children.length; i++) {
  	  	innerFunction(newPosition.children[i]);
  	  }
  	}
  };
  innerFunction(startPosition);
  return elementsWithClass;
};


// From Fuclrum Solution Video:
// ----------------------------

// var getElementsByClassName = function(className, node){
  
//   var nodes = [];

//   node = node || document.body;
    
//   var parts = node.className.split(' ');

//   if (parts.indexOf(className) >= 0) {
//     nodes.push(node);
//   }

//   for (var i = 0; i < node.children.length; i++) {
//     var childResults = getElementsByClassName(className, node.children[i]);
//     nodes = nodes.concat(childResults);
//   }

//   return nodes;

// };