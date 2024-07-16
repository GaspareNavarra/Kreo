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
    props: ['empty_subject', 'empty_mail_text'],
    mounted() {
      this.classSelector(1);
    }
}
</script>