export function floodFill(arr, initX, initY) {
  const x = arr.length;
  const y = arr[0].length;
  //out of bounds checks
  if (initX < 0 || initY < 0 || initX >= x || initY >= y) {
    return;
  }
  const cell = arr[initX][initY];
  // exit condition
  if (cell.isRevealed) {
    return;
  }
  // set cell as checked
  cell.isRevealed = true;
  //recursion
  if (cell.value === 0) {
    let n = getNeighbours(initX, initY);
    for (let k = 0; k < n.length; k++) {
      floodFill(arr, n[k].x, n[k].y);
    }
  }
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function populateMines(arr, numMines) {
  // will mutate individual array and return it populated with the number of mines specified
  const rows = arr.length;
  const cols = arr[0].length;
  const optArr = new Array(cols * rows).fill().map((x, i) => i);
  for (let i = 0; i < numMines; i++) {
    let optArrIndex = randInt(0, optArr.length - 1);
    let choice = optArr[optArrIndex];
    optArr.splice(optArrIndex, 1);
    arr[choice % rows][Math.floor(choice / rows)].isMine = true;
  }
  return arr;
}
export function getNeighbours(x, y) {
  return [
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y },
    { x: x - 1, y: y + 1 },
    { x: x, y: y - 1 },
    { x: x, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y },
    { x: x + 1, y: y + 1 },
  ];
}
export function populateValues(arr) {
  /* TODO: this function is not efficient, it checks neighbours which are already checked */
  const x = arr.length;
  const y = arr[0].length;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      // no use populating value of a mine
      if (arr[i][j].isMine) {
        arr[i][j].value = 100;
        continue;
      }

      let totalAdjMines = 0;
      let n = getNeighbours(i, j);
      for (let k = 0; k < n.length; k++) {
        //boundary conditions
        if (n[k].x < 0 || n[k].y < 0 || n[k].x >= x || n[k].y >= y) {
          continue;
        }
        // add to total adjacent mines if a mine is adjacent
        if (arr[n[k].x][n[k].y].isMine) {
          totalAdjMines++;
        }
      }
      arr[i][j].value = totalAdjMines;
    }
  }
  return arr;
}
