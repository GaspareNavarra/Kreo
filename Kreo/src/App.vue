<template>
  <div id="MainBody">
    <div id="navbar" class="navbar">
      <img src="/Img/Logo.png" class="logo_size">
    </div>
    
    <DataSheet></DataSheet>
  </div>
</template>
<script>
import DataSheet from './components/DataSheet.vue';
export default {
  components: { DataSheet },
}
</script>