<template>
  <div id="header-template" class="header-wrapper">
    <button class="header-button back-button" @click="onBack">
      <i class="fa fa-angle-left back-icon"></i>
    </button>

    <div class="navigation">
      <button class="header-button photo-container"></button>
      <div class="selection-container"></div>
      <div class="selection-container"></div>
    </div>

    <div class="justify-right">
      <div class="icon-container">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
    cursor: default;
    margin: 0;
    padding: 0;
    flex: 1;

    &:focus {
      outline: none;
    }
  }

  .back-button {
    background: darkturquoise;
    color: white;
    height: 100%;
    max-width: 32px;

    &:hover {
      background: darkorange;
    }

    &:active {
      box-shadow: inset 0 0 5px #000;
    }
  }

  .back-icon {
    cursor: pointer;
    font-size: 2.5em;
  }

  .header-button {
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: background 0.3s, box-shadow 0.1s ease;
  }

  .header-wrapper {
    background: black;
    display: flex;
    flex-direction: row;
    height: 65px;
    width: 100%;
  }

  .photo-container {
    background: white;
    height: 100%;
    max-width: 150px;
  }

  .justify-right {
    display: flex;
    justify-content: flex-end;
  }

  .navigation {
    display: flex;
  }

  .selection-container {
    display: flex;
    height: 100%;
    max-width: 240px;
    min-width: 150px;
    background: slategrey;
    border-right: 1px solid darkorange;
  }

  .icon-container {
    display: flex;
    height: 100%;
    max-width: 150px;
    background: slategrey;
  }
</style>

<script>

module.exports = {
  name: 'header',
  data: () => ({ hoverOnBack: false }),
  methods: {
    onBack: () => console.info('I clicked back!')
  }
}

</script>
