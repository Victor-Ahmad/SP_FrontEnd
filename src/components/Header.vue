<template>
    <header class="fixed top-0 left-0 w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50">
        <div class="flex items-center space-x-4">
            <img src="@/assets/logo.svg" alt="Logo" class="h-10">
            <div class="text-2xl font-bold">MyLogo</div>
        </div>
        <nav class="flex space-x-4 items-center">
            <router-link to="/" class="hover:text-orange-500 transition duration-300 ease-in-out">{{ $t('nav.home')
                }}</router-link>
            <router-link to="/swaps" class="hover:text-orange-500 transition duration-300 ease-in-out">{{ $t('nav.swaps')
                }}</router-link>
            <router-link to="/messages" class="hover:text-orange-500 transition duration-300 ease-in-out">{{
                $t('nav.messages') }}</router-link>
            <router-link to="/notifications" class="hover:text-orange-500 transition duration-300 ease-in-out">{{
                $t('nav.notifications') }}</router-link>
        </nav>
        <div class="flex space-x-4 items-center">
            <router-link to="/login" class="hover:text-orange-500 transition duration-300 ease-in-out">{{ $t('nav.login')
                }}</router-link>
            <router-link to="/register" class="hover:text-orange-500 transition duration-300 ease-in-out">{{
                $t('nav.register') }}</router-link>
            <LanguageDropdown />
        </div>
    </header>
</template>

<script>
import LanguageDropdown from '@/components/LanguageDropdown.vue';

export default {
    name: 'Header',
    components: {
        LanguageDropdown
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
