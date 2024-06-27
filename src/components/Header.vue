<template>
    <header class="fixed top-0 left-0 w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50">
        <div class="flex items-center space-x-4">
            <img src="@/assets/logo.svg" alt="Logo" class="h-10">
            <div class="text-2xl font-bold">MyLogo</div>
        </div>
        <nav class="flex space-x-4 items-center">
            <router-link to="/home" class="hover-color transition duration-300 ease-in-out" active-class="active">{{ $t('nav.home') }}</router-link>
            <router-link to="/swaps" class="hover-color transition duration-300 ease-in-out" active-class="active">{{ $t('nav.swaps') }}</router-link>
            <router-link to="/messages" class="hover-color transition duration-300 ease-in-out" active-class="active">{{ $t('nav.messages') }}</router-link>
        </nav>
        <div class="flex space-x-4 items-center">
            <NotificationDropdown />
            <router-link to="/login" class="hover-color transition duration-300 ease-in-out" active-class="active">{{ $t('nav.login') }}</router-link>
            <router-link to="/register" class="hover-color transition duration-300 ease-in-out" active-class="active">{{ $t('nav.register') }}</router-link>
            <LanguageDropdown />
        </div>
    </header>
</template>

<script>
import LanguageDropdown from '@/components/LanguageDropdown.vue';
import NotificationDropdown from '@/components/NotificationDropdown.vue';

export default {
    name: 'Header',
    components: {
        LanguageDropdown,
        NotificationDropdown
    }
};
</script>

<style scoped>
/* Add any custom styles here */
.active {
    color: #c36087; /* Highlight color for active link */
    font-weight: bold;
}

.hover-color:hover {
    color: #5e1675; /* Hover color */
}
</style>
