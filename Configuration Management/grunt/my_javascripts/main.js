var randomColor = require("random-color");
var rgb = randomColor().values.rgb;
 
 // as you're setting a CSS property you need to pass a string, hence the requirement of quoting 'rgb(' + ... + ')'
document.body.style.backgroundColor = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';