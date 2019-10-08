<script>
  import MineTile from "./MineTile.svelte";
  import { onMount } from "svelte";
  import {
    floodFill,
    populateMines,
    populateValues
  } from "../lib/algorithms.js";
  import { calculateRules, chooseSimpleMove } from "../lib/ai.js";

  // board state will become a 2d array
  let boardState = [];
  let cols = 20;
  let rows = 20;
  let numMines = 50;
  let apparentMinesRemaining = numMines;
  let actualMinesRemaining = numMines;
  let intervalId;

  function resetGame() {
    startGame();
  }
  $: rules = calculateRules(boardState, actualMinesRemaining);

  function mapIdtoCoord(id) {
    return {
      y: id % rows,
      x: Math.floor(id / rows)
    };
  }
  function solveBoard() {
    intervalId = setInterval(suggestMove, 50);
  }
  function stopSolver() {
    clearInterval(intervalId);
  }

  function suggestMove() {
    console.log("solving");
    const { idArr, toFlag, toReveal } = chooseSimpleMove(rules);
    // if a simple move exists
    if (idArr) {
      for (let i = 0; i < idArr.length; i++) {
        const { x, y } = mapIdtoCoord(idArr[i]);
        if (toFlag) {
          flagCell(x, y);
        } else if (toReveal) {
          revealCell(x, y);
        }
        //console.log(`move to id ${idArr[i]}`);
        //console.log(`coordinates x: ${x}, y: ${y}`);
      }
    } else {
      alert("no simple move remaining");
      console.log(rules);
      clearInterval(intervalId);
    }
  }

  function startGame() {
    boardState = new Array(cols).fill().map((el, y) =>
      new Array(rows).fill().map((el, x) => {
        return {
          id: y * rows + x,
          isRevealed: false,
          isMine: false,
          isFlagged: false,
          value: 10
        };
      })
    );
    boardState = populateMines(boardState, numMines);
    boardState = populateValues(boardState);
    apparentMinesRemaining = numMines;
    actualMinesRemaining = numMines;
  }
  onMount(() => {
    // create an empty board
    startGame();
  });
  function flagCell(x, y) {
    if (boardState[x][y].isFlagged) {
      apparentMinesRemaining++;
    } else {
      apparentMinesRemaining--;
    }
    if (!boardState[x][y].isFlagged && boardState[x][y].isMine) {
      actualMinesRemaining--;
    } else if (boardState[x][y].isFlagged && boardState[x][y].isMine) {
      actualMinesRemaining++;
    }
    boardState[x][y].isFlagged = !boardState[x][y].isFlagged;
    boardState[x][y] = boardState[x][y];
  }

  function revealCell(x, y) {
    if (boardState[x][y].value === 0) {
      floodFill(boardState, x, y);
    }
    boardState[x][y].isRevealed = true;
    boardState[x][y] = boardState[x][y];
  }
</script>

<style>
  .game-row {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    justify-items: flex-start;
  }
  .game-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }
</style>

<div class="menu">
  <form on:submit|preventDefault={resetGame}>
    <!--     <label for="numMines">Number of Mines:</label>
    <input type="text" name="numMines" id="numMines" />
    <label for="numCols">Number of Columns:</label>
    <input type="text" name="numCols" id="numCols" />
    <label for="numRows">Number of Rows:</label>
    <input type="text" name="numRows" id="numRows" /> -->
    <button type="submit">Reset</button>
  </form>
</div>
<div>Mines remaining: {apparentMinesRemaining}</div>
<button on:click={suggestMove}>Choose Move</button>
<button on:click={solveBoard}>Solve Board</button>
<button on:click={stopSolver}>Stop Solver</button>
<div class="game-row">
  {#each boardState as row, x}
    <div class="game-col">
      {#each row as cell, y}
        <MineTile
          on:cell-clicked={() => revealCell(x, y)}
          on:cell-flagged={() => flagCell(x, y)}
          isRevealed={cell.isRevealed}
          isMine={cell.isMine}
          isFlagged={cell.isFlagged}
          value={cell.value}
          id={cell.id} />
      {/each}
    </div>
  {/each}
</div>
