<template>
    <div id="function">
        <div class="container-funzioni">
            <div class="container-piastre">
                <div class="piastra col-sm-4">
                    <i class="fa-regular fa-file-circle-plus icona-piastra"></i>
                    <span class="piastra-label">Aggiungi Scheda</span>
                </div>
                <div class="piastra col-sm-4">
                    <i class="fa-solid fa-magnifying-glass icona-piastra"></i>
                    <span class="piastra-label">Cerca Scheda/Ingressi</span>
                </div>
            </div>
            <div class="container-piastre">
                <div class="piastra col-sm-4">
                    <i class="fa-solid fa-gear icona-piastra"></i>
                    <span class="piastra-label">Modifica Dati di Accesso</span>
                </div>
                <div class="piastra col-sm-4">
                    <i class="fa-regular fa-user-plus icona-piastra"></i>
                    <span class="piastra-label">Aggiungi Utente</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['classSelector'],
    methods: {
    },
    mounted() {
        this.classSelector();
    }
}
</script>