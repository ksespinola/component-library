<template>
  <div id="header-template" class="header-wrapper">
    <button class="back-button"><i class="fa fa-angle-left back-icon"></i></button>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  cursor: default;
  margin: 0;
  padding: 0;
}

.back-button {
  background: darkturquoise;
  border: none;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  transition: background 0.3s ease;
  width: 32px;

  &:hover {
    background: darkorange;
  }
}


.back-icon {
  font-size: 2.5em;
}

.header-wrapper {
  background: black;
  display: flex;
  flex-direction: row;
  height: 65px;
  width: 100%;
}
</style>

<script>

module.exports = {
  name: 'header',
  data: () => ({ hoverOnBack: false })
}

</script>
