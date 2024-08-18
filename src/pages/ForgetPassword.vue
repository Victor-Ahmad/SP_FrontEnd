<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="text-4xl font-bold text-[#1c592f]">
            {{ $t("forgetPassword.title") }}
          </h2>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleForgetPassword">
          <div class="form-group mb-4">
            <p class="mb-6">{{ $t("forgetPassword.instruction") }}</p>
            <label
              for="email"
              class="block text-lg font-semibold text-[#1c592f] mb-2"
            >
              {{ $t("forgetPassword.emailLabel") }}
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              class="input-field w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
              :placeholder="$t('forgetPassword.emailPlaceholder')"
            />
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="px-4 py-2 bg-[#1c592f] text-white w-full rounded-full transition duration-300 hover:bg-[#065e58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c592f]"
            >
              {{ $t("forgetPassword.submitButton") }}
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
          <div class="flex items-center justify-between mt-4">
            <router-link
              to="/register"
              class="text-sm font-medium text-[#1c592f] hover:text-[#065e58]"
            >
              {{ $t("forgetPassword.registerLink") }}
            </router-link>
            <router-link
              to="/login"
              class="text-sm font-medium text-[#1c592f] hover:text-[#065e58]"
            >
              {{ $t("forgetPassword.loginLink") }}
            </router-link>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden lg:block w-full md:w-1/2">
      <img
        class="w-8/12 h-auto rounded"
        src="@/assets/images/forget.jpg"
        :alt="$t('forgetPassword.backgroundAlt')"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";
import { getOtp } from "@/services/apiService"; // Import the getOtp function

export default {
  name: "ForgetPassword",
  setup() {
    const router = useRouter();
    const error = ref("");

    const handleForgetPassword = async () => {
      const email = document.getElementById("email").value;
      try {
        // Call the API to send the OTP
        await getOtp(email);
        Swal.fire({
          icon: "success",
          title: "OTP sent to email",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push({
            name: "OtpVerification",
            query: { email }, // Pass the email as a query parameter
          });
        });
      } catch (err) {
        error.value = "Failed to send OTP. Please try again.";
      }
    };

    return {
      error,
      handleForgetPassword,
    };
  },
};
</script>

<style scoped>
.input-field {
  @apply w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400;
}
.input-field:focus {
  border-color: #1c592f;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
</style>
