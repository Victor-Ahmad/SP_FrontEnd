<template>
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
        <div class="flex items-center justify-center p-8">
            <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
                <div class="text-center">
                    <img class="mx-auto h-12 w-auto" src="@/assets/logo.svg" alt="Logo">
                    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('register.signUp') }}</h2>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
                    <div class="rounded-md shadow-sm">
                        <div class="mb-4">
                            <label for="first_name" class="block text-sm font-medium text-gray-700">{{
                                $t('register.firstName') }}</label>
                            <input id="first_name" name="first_name" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="First Name">
                        </div>
                        <div class="mb-4">
                            <label for="last_name" class="block text-sm font-medium text-gray-700">{{
                                $t('register.lastName') }}</label>
                            <input id="last_name" name="last_name" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="Last Name">
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('register.email')
                                }}</label>
                            <input id="email" name="email" type="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="Email">
                        </div>
                        <div class="mb-4">
                            <label for="phone" class="block text-sm font-medium text-gray-700">{{ $t('register.phone')
                                }}</label>
                            <input id="phone" name="phone" type="tel" autocomplete="tel" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="+1 (555) 987-6543" @input="preventNonNumericInput"
                                @keypress="preventNonNumericInput">
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">{{
                                $t('register.password') }}</label>
                            <input id="password" name="password" type="password" autocomplete="new-password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                placeholder="Password">
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                            :disabled="isLoading">
                            <span v-if="!isLoading">{{ $t('register.signUp') }}</span>
                            <span v-else>Loading...</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <router-link to="/login" class="font-medium text-secondary hover:text-secondary-dark">{{
                                $t('register.login') }}</router-link>
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
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
    name: 'Register',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.error);

        const handleRegister = async () => {
            const firstName = document.getElementById('first_name').value;
            const lastName = document.getElementById('last_name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            try {
                // Implement the register function in your Vuex store
                await store.dispatch('register', { firstName, lastName, email, phone, password });
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push('/login');
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: error.message || store.getters.error,
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
            handleRegister,
            preventNonNumericInput,
        };
    },
};
</script>

<style scoped></style>