<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="text-4xl font-bold text-[#1c592f]">Verify OTP</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleVerifyOtp">
          <div class="form-group mb-4 flex justify-center">
            <div class="otp-container flex justify-between">
              <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                maxlength="1"
                class="otp-input w-16 p-2 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
                v-model="otp[index]"
                @input="onInput(index, $event)"
                @keydown.backspace="onBackspace(index, $event)"
              />
            </div>
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="px-4 py-2 bg-[#1c592f] text-white w-full rounded-full transition duration-300 hover:bg-[#065e58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c592f]"
            >
              Verify
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";

export default {
  name: "OtpVerification",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const error = ref("");
    const otp = ref(["", "", "", ""]);

    const handleVerifyOtp = async () => {
      const otpValue = otp.value.join("");
      try {
        // Dummy function to simulate OTP verification
        await verifyOtp(route.params.email, otpValue);
        Swal.fire({
          icon: "success",
          title: "OTP verified",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push({
            name: "ResetPassword",
            params: { email: route.params.email },
          });
        });
      } catch (err) {
        error.value = "Invalid OTP. Please try again.";
      }
    };

    const verifyOtp = (email, otp) => {
      // Dummy function to be replaced with actual API call
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          otp === "1234" ? resolve(true) : reject(false);
        }, 1000);
      });
    };

    const onInput = (index, event) => {
      const value = event.target.value;
      if (!/^[0-9]$/.test(value)) {
        otp.value[index] = "";
        return;
      }
      if (index < 3 && value) {
        otp.value[index] = value;
        event.target.nextElementSibling.focus();
      }
    };

    const onBackspace = (index, event) => {
      if (!otp.value[index] && index > 0) {
        event.target.previousElementSibling.focus();
      }
    };

    return {
      otp,
      error,
      handleVerifyOtp,
      onInput,
      onBackspace,
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
.otp-container {
  display: flex;
  gap: 10px;
}
.otp-input {
  width: 4rem;
  text-align: center;
}
</style>
