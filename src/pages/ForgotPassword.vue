<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="text-4xl font-bold text-[#1c592f]">Forgot Password</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
          <div class="form-group mb-4">
            <label
              for="email"
              class="block text-lg font-semibold text-[#1c592f] mb-2"
              >Email</label
            >
            <input
              id="email"
              name="email"
              type="email"
              required
              class="input-field w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
              placeholder="Email"
            />
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="px-4 py-2 bg-[#1c592f] text-white w-full rounded-full transition duration-300 hover:bg-[#065e58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c592f]"
            >
              Submit
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
        </form>
      </div>
    </div>
    <div class="hidden lg:block w-full md:w-1/2">
      <img
        class="w-8/12 h-auto rounded"
        src="@/assets/images/forget.jpg"
        alt="Background"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";

export default {
  name: "ForgotPassword",
  setup() {
    const router = useRouter();
    const error = ref("");

    const handleForgotPassword = async () => {
      const email = document.getElementById("email").value;
      try {
        // Dummy function to simulate sending OTP
        await sendOtp(email);
        Swal.fire({
          icon: "success",
          title: "OTP sent to email",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push({ name: "OtpVerification", params: { email } });
        });
      } catch (err) {
        error.value = "Failed to send OTP. Please try again.";
      }
    };

    const sendOtp = (email) => {
      // Dummy function to be replaced with actual API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    };

    return {
      error,
      handleForgotPassword,
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
