<template>
    <footer class="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md mt-auto">
        <div class="flex items-center space-x-4">
            <img src="@/assets/logo.svg" alt="Logo" class="h-10">
            <div class="text-2xl font-bold">MyLogo</div>
        </div>
        <nav class="flex space-x-4 items-center">
            <router-link to="/" class="hover:text-gray-400 transition duration-300 ease-in-out">{{ $t('nav.home')
                }}</router-link>
            <router-link to="/swaps" class="hover:text-gray-400 transition duration-300 ease-in-out">{{ $t('nav.swaps')
                }}</router-link>
            <router-link to="/chatPage" class="hover:text-gray-400 transition duration-300 ease-in-out">{{
                $t('nav.messages')
            }}</router-link>
            <router-link to="/notifications" class="hover:text-gray-400 transition duration-300 ease-in-out">{{
                $t('nav.notifications')
            }}</router-link>
            <router-link to="/privacy-policy" class="hover:text-gray-400 transition duration-300 ease-in-out">{{
                $t('nav.privacy') }}</router-link>
        </nav>
        <div class="flex space-x-4 items-center">
            <router-link to="/login" class="hover:text-gray-400 transition duration-300 ease-in-out">{{ $t('nav.login')
                }}</router-link>
            <router-link to="/register" class="hover:text-gray-400 transition duration-300 ease-in-out">{{
                $t('nav.register') }}</router-link>
            <LanguageDropdown />
        </div>
    </footer>
</template>

<script>
import LanguageDropdown from '@/components/LanguageDropdown.vue';

export default {
    name: 'Footer',
    components: {
        LanguageDropdown
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>