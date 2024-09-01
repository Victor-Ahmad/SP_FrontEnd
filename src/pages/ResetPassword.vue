<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="font-bold text-[#1c592f]">Reset Password</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
          <div class="form-group mb-4">
            <label
              for="newPassword"
              class="block font-semibold text-[#1c592f] mb-2"
              >New Password</label
            >
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              class="input-field w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
              placeholder="New Password"
            />
          </div>
          <div class="form-group mb-4">
            <label
              for="confirmPassword"
              class="block font-semibold text-[#1c592f] mb-2"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="input-field w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
              placeholder="Confirm Password"
            />
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="px-4 py-2 bg-[#1c592f] text-white w-full rounded-full transition duration-300 hover:bg-[#065e58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c592f]"
            >
              Reset Password
            </button>
          </div>
          <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";
import { resetPasswordWithSpecialCode } from "@/services/apiService"; // Import the new API function

export default {
  name: "ResetPassword",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const error = ref("");
    const specialCode = route.query.specialCode;
    const handleResetPassword = async () => {
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (newPassword !== confirmPassword) {
        error.value = "Passwords do not match.";
        return;
      }
      try {
        // Call the API to reset the password using the specialCode
        await resetPasswordWithSpecialCode(newPassword, specialCode);
        Swal.fire({
          icon: "success",
          title: "Password reset successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/login"); // Redirect to login page after successful password reset
        });
      } catch (err) {
        error.value = "Failed to reset password. Please try again.";
      }
    };

    // const resetPassword = (email, newPassword) => {
    //   // Dummy function to be replaced with actual API call
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 1000);
    //   });
    // };

    return {
      error,
      handleResetPassword,
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
