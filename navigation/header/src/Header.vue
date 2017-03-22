<template>
  <div id="header-template" class="header-wrapper">
    {{ greeting }}
  </div>
</template>

<script>

module.exports = {
  name: 'header',
  data: () => ({ greeting: 'Hello world!' })
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  cursor: default;
  margin: 0;
  padding: 0;
}

.header-wrapper {
  display: flex;
  background: black;
  color: white;
  width: 100%;
}
</style>
