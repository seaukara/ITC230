// eslint practice file for ITC 230

let names = ['sara', 'joe', 'dave', 'ann'];
let newArray = names.map(function (item) {
    'use strict';
    return item.toUpperCase();
});
console.log(newArray);