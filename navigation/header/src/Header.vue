<template>
  <div id="header">
    {{ greeting }}
  </div>
</template>

<script>

module.exports = {
  name: 'header',
  data: () => ({ greeting: 'Hello world!' })
}

</script>

<style{{#sass}} lang="scss"{{/sass}}>

#header {
  display: flex;
  width: 100%;
  background: salmon;
}

</style>
