<template>
    <div id="notFoundContainer" class="row not-found-container">
        <i class="fa-regular fa-triangle-exclamation warning"></i>
        <div class="not-found-label">Pagina non trovata</div>
        <button class="warning-button col-sm-6" @click="linkTo('/')">Torna alla Home</button>
    </div>
</template>
<script>
export default {
    inject: ['classSelector', 'linkTo'],
    mounted() {
      this.classSelector(1);
    }
}
</script>