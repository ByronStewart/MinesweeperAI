import { getNeighbours } from './algorithms';

export function calculateRules(arr, remainingMines) {
  //initialize the rules array with the general rule
  const rulesArr = [{ fields: [], value: remainingMines }];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      //push the general all cells rule to the array
      // each cell if not revealed or flagged is added to rule, the cell is recorded with its id
      if (!arr[i][j].isRevealed && !arr[i][j].isFlagged) {
        rulesArr[0].fields.push(arr[i][j].id);
      }

      // escape conditions: do not want to calc rules for cells with value of zero, flagged cells or if not revealed
      if (!arr[i][j].isRevealed || arr[i][j].value === 0 || arr[i][j].isFlagged) {
        continue;
      }
      // create a new rule
      let newRule = {
        fields: [],
        value: arr[i][j].value,
      };

      let n = getNeighbours(i, j);
      for (let k = 0; k < n.length; k++) {
        // boundary conditions
        if (n[k].x < 0 || n[k].y < 0 || n[k].x >= arr.length || n[k].y >= arr[0].length) {
          continue;
        }
        // each neighbour if not revealed or flagged is added to rule, the cell is recorded with its id
        if (!arr[n[k].x][n[k].y].isRevealed && !arr[n[k].x][n[k].y].isFlagged) {
          newRule.fields.push(arr[n[k].x][n[k].y].id);
        }
        // if a neighbour is flagged then reduce the value stored in the rule by 1
        if (arr[n[k].x][n[k].y].isFlagged) {
          newRule.value--;
        }
      }
      // if there is a field in the rule then add it to the rule array
      if (newRule.fields.length > 0) {
        rulesArr.push(newRule);
      }
    }
  }
  rulesArr.sort((a, b) => a.fields.length - b.fields.length);
  return rulesArr;
}
export function chooseSimpleMove(rulesArr) {
  //choose the simple moves
  for (let i = 0; i < rulesArr.length; i++) {
    // if a field has a value of zero, then the cells in the rule should be revealed
    if (rulesArr[i].value == 0) {
      return {
        idArr: rulesArr[i].fields,
        toReveal: true,
        toFlag: false,
      };
    }
    // if a field length has the same value as the length of the cell then the cells should be flagged
    if (rulesArr[i].value == rulesArr[i].fields.length) {
      return {
        idArr: rulesArr[i].fields,
        toReveal: false,
        toFlag: true,
      };
    }
  }
  //should return the id of a cell chosen and if it should be revealed or flagged
  return {
    idArr: null,
    toReveal: null,
    toFlag: null,
  };
}
