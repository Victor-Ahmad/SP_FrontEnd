<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="text-4xl font-bold text-[#1c592f]">
            {{ $t("login.logIn") }}
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="form-group mb-4">
            <label
              for="email"
              class="block text-lg font-semibold text-[#1c592f] mb-2"
              >{{ $t("login.email") }}</label
            >
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="input-field w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
              placeholder="example@example.com"
              @input="validateEmail"
            />
          </div>
          <div class="form-group mb-4">
            <label
              for="password"
              class="block text-lg font-semibold text-[#1c592f] mb-2"
              >{{ $t("login.password") }}</label
            >
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="input-field w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
              placeholder="Password"
            />
          </div>
          <div v-if="validationError" class="text-red-600 text-sm mt-2">
            {{ validationError }}
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="px-4 py-2 bg-[#1c592f] text-white w-full rounded-full transition duration-300 hover:bg-[#065e58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c592f]"
              :disabled="isLoading || validationError"
            >
              <span v-if="!isLoading">{{ $t("login.logIn") }}</span>
              <span v-else>Loading...</span>
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <router-link
                to="/register"
                class="font-medium text-[#1c592f] hover:text-[#065e58]"
                >{{ $t("login.register") }}</router-link
              >
            </div>
            <div class="text-sm">
              <router-link
                to="/forgot-password"
                class="font-medium text-[#1c592f] hover:text-[#065e58]"
                >Forgot Password?</router-link
              >
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden lg:block w-full md:w-1/2">
      <img
        class="w-full h-auto rounded"
        src="@/assets/images/login.png"
        alt="Background"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const email = ref("");
    const password = ref("");
    const validationError = ref(null);

    const validateEmail = () => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validationError.value = re.test(String(email.value).toLowerCase())
        ? null
        : "Please enter a valid email.";
    };

    const handleLogin = async () => {
      validateEmail();
      if (validationError.value) return;

      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/home");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: store.getters.error,
        });
      }
    };

    return {
      isLoading,
      error,
      email,
      password,
      validationError,
      handleLogin,
      validateEmail,
    };
  },
};
</script>

<style scoped>
.input-field:focus {
  border-color: #1c592f;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
</style>
