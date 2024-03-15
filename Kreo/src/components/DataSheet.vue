<template>
    <div></div>
</template>
<script>
export default {
    inject: ['classSelector'],
    mounted() {
        this.classSelector();
    }
}
</script>