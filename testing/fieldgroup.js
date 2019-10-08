const _ = require('lodash');

let rules = [
  { fields: [364, 365], value: 1 },
  { fields: [364, 365], value: 1 },
  { fields: [380, 381], value: 1 },
  { fields: [364, 365], value: 1 },
  { fields: [381, 382, 383], value: 1 },
  { fields: [364, 382, 383], value: 2 },
  { fields: [364, 365, 383], value: 1 },
  { fields: [365, 367, 387], value: 1 },
  { fields: [347, 365, 367, 387], value: 1 },
  { fields: [347, 364, 365, 367, 380, 381, 382, 383, 387], value: 4 },
];

let intersections = [];
let unions = [];
for (let i = 0; i < rules.length; i++) {
  intersections.push(rules[i].fields);
  unions.push(rules[i].fields);
}
let actualIntersections = _.intersection(...intersections);
let actualUnions = _.union([364, 365], [380, 381]);
console.log(actualUnions);
