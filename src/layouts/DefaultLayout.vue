<template>
    <div class="flex flex-col min-h-screen">
        <Header />
        <main class="flex-grow pb-10 pt-20 ">
            <router-view></router-view>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'DefaultLayout',
    components: {
        Header,
        Footer
    }
};
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>