<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    console.log(process.env.VUE_APP_LOCAL_STORAGE_NAME);
  }
}
</script>
