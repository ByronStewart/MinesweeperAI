<script>
  import { createEventDispatcher } from "svelte";
  export let isRevealed;
  export let value;
  export let isMine;
  export let id;
  export let isFlagged;
  const dispatch = createEventDispatcher();
</script>

<style>
  .mine {
    background-color: red;
  }
  .cell {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    text-align: center;
    line-height: 180%;
  }
  .revealed {
    background-color: rgb(212, 212, 212);
  }
  .flagged {
    background-color: rosybrown;
  }
</style>

{#if isRevealed && isMine}
  <div class="cell mine">*</div>
{:else if isRevealed}
  <div class="cell revealed">{value === 0 ? '' : value}</div>
{:else if isFlagged}
  <div
    on:contextmenu|preventDefault={() => dispatch('cell-flagged')}
    on:click={() => dispatch('cell-clicked')}
    class="cell flagged">
    !!
  </div>
{:else}
  <div
    on:click={() => dispatch('cell-clicked')}
    on:contextmenu|preventDefault={() => dispatch('cell-flagged')}
    class="cell" />
{/if}
