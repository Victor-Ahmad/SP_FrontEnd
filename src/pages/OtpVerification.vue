<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="font-bold text-[#1c592f]">
            {{ $t("otp.title") }}
          </h2>
        </div>
        <p class="text-center mb-6">{{ $t("otp.instruction") }}</p>
        <form class="mt-8 space-y-6" @submit.prevent="handleVerifyOtp">
          <div class="form-group mb-4 flex justify-center">
            <div class="otp-container flex justify-between">
              <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                maxlength="1"
                class="otp-input w-16 p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400"
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
              {{ $t("otp.verify_button") }}
            </button>
          </div>
          <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
          <div v-if="timeLeft > 0" class="text-center mt-4 text-gray-500">
            {{ $t("otp.resend_wait") }} {{ timeLeft }}s
          </div>
          <div class="text-center mt-4">
            <button
              type="button"
              :disabled="isResendDisabled"
              @click="resendOtp"
              class="px-4 py-2 bg-gray-300 text-[#1c592f] w-full rounded-full transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {{ $t("otp.resend_button") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";
import { verifyOtpForForgetPassword, getOtp } from "@/services/apiService"; // Import the API functions

export default {
  name: "OtpVerification",
  setup() {
    const route = useRoute();
    const email = route.query.email; // Access the email from query parameters

    const router = useRouter();
    const error = ref("");
    const otp = ref(["", "", "", ""]);
    const isResendDisabled = ref(false);
    const timeLeft = ref(0);
    let timer;
    if (!email) {
      console.error("Email is undefined. Make sure it's passed correctly.");
      alert("Email is undefined. Make sure it's passed correctly.");
    }

    const handleVerifyOtp = async () => {
      const otpValue = otp.value.join("");
      try {
        // Verify OTP using the API
        const response = await verifyOtpForForgetPassword(email, otpValue);
        const specialCode = response.result;
        Swal.fire({
          icon: "success",
          title: "OTP verified",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push({
            name: "ResetPassword",
            query: { email, specialCode }, // Pass email and specialCode to the next page
          });
        });
      } catch (err) {
        error.value = this.$t("otp.error");
      }
    };

    const resendOtp = async () => {
      try {
        await getOtp(email);
        Swal.fire({
          icon: "success",
          title: "OTP resent",
          showConfirmButton: false,
          timer: 1500,
        });
        startTimer();
      } catch (err) {
        error.value = this.$t("otp.resend_error");
      }
    };

    const startTimer = () => {
      isResendDisabled.value = true;
      timeLeft.value = 120; // 2 minutes

      timer = setInterval(() => {
        timeLeft.value -= 1;
        if (timeLeft.value <= 0) {
          clearInterval(timer);
          isResendDisabled.value = false;
        }
      }, 1000);
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
      isResendDisabled,
      timeLeft,
      handleVerifyOtp,
      resendOtp,
      onInput,
      onBackspace,
      email,
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
