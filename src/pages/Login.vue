<template>
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
        <div class="flex items-center justify-center p-8">
            <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
                <div class="text-center">
                    <img class="mx-auto h-12 w-auto" src="@/assets/logo.svg" alt="Logo">
                    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('login.logIn') }}</h2>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                    <div class="rounded-md shadow-sm">
                        <div class="mb-4">
                            <label for="phone" class="block text-sm font-medium text-gray-700">{{ $t('login.phone')
                                }}</label>
                            <input id="phone" name="phone" type="tel" autocomplete="tel" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="+1 (555) 987-6543" @input="preventNonNumericInput"
                                @keypress="preventNonNumericInput">
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">{{
                                $t('login.password') }}</label>
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="Password">
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                            :disabled="isLoading">
                            <span v-if="!isLoading">{{ $t('login.logIn') }}</span>
                            <span v-else>Loading...</span>
                        </button>
                    </div>
                    <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <router-link to="/register" class="font-medium text-secondary hover:text-secondary-dark">{{
                                $t('login.register') }}</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="hidden lg:block relative">
            <img class="absolute inset-0 h-full w-full object-cover" src="@/assets/logo.svg" alt="Background">
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is imported

export default {
    name: 'Login',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.error);

        const handleLogin = async () => {
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            try {
                await store.dispatch('login', { number: phone, password });
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push('/home');
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: store.getters.error,
                });
            }
        };

        const preventNonNumericInput = (event) => {
            const char = String.fromCharCode(event.which);
            if (!/[0-9]/.test(char) && event.key !== 'Backspace' && event.key !== 'Delete') {
                event.preventDefault();
            }
        };

        return {
            isLoading,
            error,
            handleLogin,
            preventNonNumericInput,
        };
    },
};
</script>

<style scoped></style>
