<template>
  <div v-if="isLoading" class="text-center">
    <div class="spinner"></div>
    {{ $t("stepper.checkingEmailPhone") }}
  </div>
  <div v-else class="w-full p-6 pb-20 flex flex-col min-h-screen">
    <div class="stepper-wrapper mb-6 flex justify-between relative">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          'stepper-item relative flex flex-col items-center flex-1 text-center',
          currentStep >= index ? 'completed' : '',
          currentStep === index ? 'active' : '',
        ]"
      >
        <div
          class="step-counter relative inline-block p-2 md:px-8 bg-gray-300 text-white font-bold text-lg transition duration-300 border-2 border-transparent"
        >
          <span class="inline md:hidden lg:hidden">{{ index + 1 }}</span>
          <span class="hidden md:inline">{{ step.name }}</span>
          <div
            v-if="index > 0"
            class="absolute top-1/2 left-0 w-0 h-0 transform -translate-y-1/2 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[12px] border-l-white"
            :class="
              currentStep >= index ? 'border-l-[#1c592f]' : 'border-l-white'
            "
          ></div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <component
        :is="steps[currentStep].component"
        :formData="formData"
        :image="steps[currentStep].image"
        :errors="errors"
        :showOtp="showOtp"
        :otp="otp"
        :key="currentStep"
        v-bind="getStepProps()"
      ></component>
    </transition>
    <div
      class="form-navigation flex w-full md:w-3/5 justify-between p-6 space-x-4"
    >
      <button
        @click="prevStep"
        :disabled="currentStep === 0"
        class="px-4 py-2 bg-gray-300 text-white w-40 rounded-full transition duration-300 hover:bg-gray-400 disabled:opacity-50"
      >
        {{ $t("stepper.previous") }}
      </button>
      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        :disabled="isLoading"
        class="px-4 py-2 bg-[#1c592f] text-white w-40 rounded-full transition duration-300 hover:bg-[#065e58]"
      >
        {{ $t("stepper.next") }}
      </button>
      <button
        v-if="currentStep === steps.length - 1"
        @click="handleFinalStep"
        class="px-4 py-2 bg-[#1c592f] text-white w-40 rounded-full transition duration-300 hover:bg-[#065e58]"
      >
        {{ $t("stepper.submit") }}
      </button>
    </div>
    <div class="text-sm text-center">
      <router-link
        to="/login"
        class="font-medium text-[#1c592f] hover:text-secondary-dark"
        >{{ $t("register.login") }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { markRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";
import Step4 from "./Step4.vue";
import {
  validateEmailAndPhone,
  verifyOtpRegister,
  updateDescriptionAndImages,
} from "@/services/apiService";
import step1Image from "@/assets/images/step1.png";
import step2Image from "@/assets/images/step2.png";
import step3Image from "@/assets/images/step3.png";
import step4Image from "@/assets/images/step4.png";

export default {
  components: {
    Step1: markRaw(Step1),
    Step2: markRaw(Step2),
    Step3: markRaw(Step3),
    Step4: markRaw(Step4),
  },
  data() {
    return {
      currentStep: 0,
      formData: {
        location_names: "",
        wish: {
          house_type_id: "",
          price: "",
          number_of_rooms: "",
          area: "",
          features: [],
          floor_number: "",
          locations: [],
        },
        reason_for_swap: "",
        post_code: "",
        house_number: "",
        location_name: "",
        street: "",
        house_type: "",
        price: "",
        number_of_rooms: "",
        area: "",
        features: [],
        floor: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        agreed_privacy_policy: false,
        agreed_terms_of_use: false,
        house_description: "",
        gallery: [],
      },
      errors: {},
      emailError: false,
      emailErrorMessage: "",
      phoneError: false,
      phoneErrorMessage: "",
      showPrivacyPolicyError: false,
      isLoading: false,
      showOtp: false,
      otp: ["", "", "", ""],
      steps: [
        {
          name: "Step 1",
          component: markRaw(Step1),
          image: step1Image,
        },
        {
          name: "Step 2",
          component: markRaw(Step2),
          image: step2Image,
        },
        {
          name: "Step 3",
          component: markRaw(Step3),
          image: step3Image,
        },
        {
          name: "Step 4",
          component: markRaw(Step4),
          image: step4Image,
        },
      ],
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);

    return {
      store,
      router,
      isLoading,
      error,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async nextStep() {
      if (this.currentStep === 2) {
        if (!this.showOtp) {
          // Email and phone validation step
          if (this.formData.email && this.formData.phone_number) {
            this.isLoading = true;
            try {
              const response = await validateEmailAndPhone(
                this.formData.email,
                this.formData.phone_number
              );
              this.isLoading = false;
              if (response.success === 1) {
                this.emailError = false;
                this.phoneError = false;

                await this.submitForm();
                // Scroll to top after navigating to the next step
              } else {
                this.handleValidationErrors(response.message);
              }
            } catch (error) {
              console.error("Validation error:", error);
              this.isLoading = false;
              alert("Error validating email and phone number");
            }
          } else {
            alert("Please enter both email and phone number");
          }
        } else {
          const otpValue = this.otp.join("");
          await this.verifyOtp(otpValue);
        }
      } else {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
          this.scrollToTop();
        }
      }
    },
    async verifyOtp(otpValue) {
      this.isLoading = true;
      try {
        const response = await verifyOtpRegister(otpValue);
        this.isLoading = false;
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "OTP verified",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.showOtp = false;
            this.currentStep++;
            this.scrollToTop();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "OTP verification failed",
            text: response.message,
          });
        }
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          icon: "error",
          title: "OTP verification failed",
          text: error.message,
        });
      }
    },
    handleValidationErrors(message) {
      if (message.includes("Both")) {
        this.emailError = true;
        this.emailErrorMessage = "Both Email and Number already exist";
        this.phoneError = true;
        this.phoneErrorMessage = "Both Email and Number already exist";
      } else if (message.includes("email")) {
        this.emailError = true;
        this.emailErrorMessage = "This email already exists";
        this.phoneError = false; // reset phone error
        this.phoneErrorMessage = "";
      } else if (message.includes("number")) {
        this.phoneError = true;
        this.phoneErrorMessage = "This number already exists";
        this.emailError = false; // reset email error
        this.emailErrorMessage = "";
      }
    },
    getStepProps() {
      if (this.currentStep === 2) {
        return {
          emailError: this.emailError,
          emailErrorMessage: this.emailErrorMessage,
          phoneError: this.phoneError,
          phoneErrorMessage: this.phoneErrorMessage,
          showPrivacyPolicyError: this.showPrivacyPolicyError,
          disabled: this.isLoading || this.showOtp,
        };
      }
      return {};
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.scrollToTop(); // Scroll to top after navigating to the previous step
      }
    },
    async handleFinalStep() {
      const description = this.formData.house_description;
      const images = this.formData.gallery;
      const hasDescription = description && description.trim() !== "";
      const hasImages = images && images.length > 0;

      if (hasDescription || hasImages) {
        try {
          this.isLoading = true;
          const response = await updateDescriptionAndImages(
            description,
            images,
            null
          );
          this.isLoading = false;
          Swal.fire({
            icon: "success",
            title: "Update successful",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.goToHome();
          });
        } catch (error) {
          console.log(error);
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "Update failed",
            text: error.message,
          });
        }
      } else {
        this.goToHome();
      }
    },
    goToHome() {
      this.router.push("/home");
    },
    async submitForm() {
      if (
        !this.formData.agreed_privacy_policy ||
        !this.formData.agreed_terms_of_use
      ) {
        this.showPrivacyPolicyError = true;
        alert("You must agree to the privacy policy and terms of use");
        return;
      }

      this.isLoading = true;
      try {
        await this.store.dispatch("registerUser", this.formData);
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.showOtp = true;
          this.scrollToTop();
          // this.router.push("/home");
        });
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: this.store.getters.error,
        });
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.stepper-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
}
.stepper-item::before,
.stepper-item::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-top: 2px solid #ccc;
  width: 100%;
  height: 0;
  z-index: 1;
  transition: border-color 0.3s ease;
}
.stepper-item::before {
  left: -50%;
}
.stepper-item::after {
  left: 50%;
}
.stepper-item.completed::before,
.stepper-item.completed::after,
.stepper-item.active::before,
.stepper-item.active::after {
  border-top-color: #1c592f;
}
.step-counter {
  z-index: 5;
  width: 105%;
  clip-path: polygon(
    0 0,
    calc(100% - 20px) 0,
    100% 50%,
    calc(100% - 20px) 100%,
    0 100%,
    20px 50%
  );
}
.stepper-item.active .step-counter,
.stepper-item.completed .step-counter {
  background-color: #1c592f;
}
.stepper-item:first-child .step-counter::before,
.stepper-item:last-child .step-counter::after {
  border-color: transparent #1c592f transparent transparent;
}
.stepper-item:first-child::before,
.stepper-item:last-child::after {
  content: none;
}
.form-navigation button:hover:not([disabled]) {
  transform: scale(1.05);
}
.form-navigation button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #1c592f;
  animation: spin 1s ease infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
