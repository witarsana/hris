<template>
    
</template>
<script>
export default {
    name : 'Logout',
    mounted(){        
        this.$store.dispatch('logout');
        this.$router.go('/home');
    }
}
</script>