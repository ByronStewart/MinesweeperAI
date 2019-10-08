const c = require('cassowary');

let rules = [
  {
    fields: [1, 2, 3, 5, 7, 8, 9],
    value: 1,
  },
  {
    fields: [2, 3, 8, 9, 4, 6, 10],
    value: 3,
  },
  {
    fields: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    value: 6,
  },
];
const solver = new c.SimplexSolver();

let left = new c.Variable('left');
let mid = new c.Variable('mid');
let right = new c.Variable('right');

let constraint1 = new c.Equation(mid, new c.Expression());
