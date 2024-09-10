<template>
  <div class="flex flex-col md:flex-row justify-between h-full">
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-gray-300 py-2 mb-4">
        <h3 class="font-bold text-[#1c592f]">
          {{ $t("myInfo.title") }}
        </h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.firstName") }}
              </h3>
              <input
                type="text"
                v-model="formData.first_name"
                :placeholder="$t('myInfo.firstNamePlaceholder')"
                :disabled="disabled"
                class="input-field"
                :class="{ 'border-red-500': errors.first_name }"
                required
                @input="clearError('first_name')"
              />
              <!-- <div class="invalid-feedback" v-if="errors.first_name">
                {{ errors.first_name }}
              </div> -->
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.lastName") }}
              </h3>
              <input
                type="text"
                v-model="formData.last_name"
                :placeholder="$t('myInfo.lastNamePlaceholder')"
                :disabled="disabled"
                class="input-field"
                :class="{ 'border-red-500': errors.last_name }"
                required
                @input="clearError('last_name')"
              />
              <!-- <div class="invalid-feedback" v-if="errors.last_name">
                {{ errors.last_name }}
              </div> -->
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.email") }}
              </h3>
              <input
                type="email"
                v-model="formData.email"
                :placeholder="$t('myInfo.emailPlaceholder')"
                :disabled="disabled"
                class="input-field"
                :class="{ 'border-red-500': errors.email }"
                required
                @input="clearError('email')"
              />
              <div class="invalid-feedback" v-if="emailError">
                {{ emailErrorMessage }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.phoneNumber") }}
              </h3>
              <input
                type="tel"
                v-model="formData.phone_number"
                :placeholder="$t('myInfo.phoneNumberPlaceholder')"
                :disabled="disabled"
                class="input-field"
                :class="{ 'border-red-500': errors.phone_number }"
                required
                @input="clearError('phone_number')"
              />
              <div class="invalid-feedback" v-if="phoneError">
                {{ phoneErrorMessage }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.password") }}
              </h3>
              <input
                type="password"
                v-model="formData.password"
                :placeholder="$t('myInfo.passwordPlaceholder')"
                :disabled="disabled"
                class="input-field"
                :class="{ 'border-red-500': errors.password }"
                required
                @blur="validatePassword"
                @input="clearError('password')"
              />
              <div class="invalid-feedback" v-if="passwordError">
                {{ passwordErrorMessage }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.confirmPassword") }}
              </h3>
              <input
                type="password"
                v-model="formData.password_confirmation"
                :placeholder="$t('myInfo.confirmPasswordPlaceholder')"
                :disabled="disabled"
                class="input-field"
                :class="{ 'border-red-500': errors.password_confirmation }"
                required
                @blur="validatePassword"
                @input="clearError('password_confirmation')"
              />
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2">
              <div class="wthree-text">
                <label class="anim">
                  <input
                    type="checkbox"
                    v-model="privacyPolicyAndTerms"
                    :disabled="disabled"
                    class="checkbox required"
                    :class="{ 'border-red-500': errors.privacyPolicyAndTerms }"
                    required
                    @change="clearError('privacyPolicyAndTerms')"
                  />
                  <span>
                    {{ $t("myInfo.agreeTo") }}
                    {{ $t("myInfo.privacyPolicy") }}
                    {{ $t("myInfo.and") }}
                    {{ $t("myInfo.termsOfUse") }}
                  </span>
                </label>
                <div
                  class="invalid-feedback"
                  v-if="showPrivacyPolicyError || errors.privacyPolicyAndTerms"
                >
                  {{ $t("myInfo.privacyPolicyError") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showOtp" class="form-group mb-4 p-4 custom_border">
          <h3 class="font-semibold text-[#1c592f] mb-2">
            {{ $t("otp.title") }}
          </h3>
          <p class="mb-4">{{ $t("otp.instruction") }}</p>
          <div class="form-group mb-4 flex justify-center">
            <div class="otp-container flex justify-between">
              <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                maxlength="1"
                class="otp-input"
                v-model="otp[index]"
                :class="{ 'border-red-500': errors.otp }"
                @input="onInput(index, $event)"
                @keydown.backspace="onBackspace(index, $event)"
              />
            </div>
          </div>
          <div v-if="errors.otp" class="text-red-600 text-sm mt-2">
            {{ errors.otp }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full md:w-2/5 hidden lg:flex items-center justify-center md:pl-6"
    >
      <img
        :src="image"
        :alt="$t('myInfo.stepImageAlt')"
        class="w-9/12 h-auto rounded"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "formData",
    "image",
    "emailError",
    "emailErrorMessage",
    "phoneError",
    "phoneErrorMessage",
    "showPrivacyPolicyError",
    "showOtp",
    "otp",
    "disabled",
    "errors",
  ],

  data() {
    return {
      passwordError: false,
      passwordErrorMessage: "",
    };
  },
  computed: {
    privacyPolicyAndTerms: {
      get() {
        return (
          this.formData.agreed_privacy_policy &&
          this.formData.agreed_terms_of_use
        );
      },
      set(value) {
        this.formData.agreed_privacy_policy = value;
        this.formData.agreed_terms_of_use = value;
      },
    },
  },
  watch: {
    "formData.email"(newVal) {
      this.$emit("update:emailError", false); // reset emailError in parent
    },
    "formData.phone_number"(newVal) {
      this.$emit("update:phoneError", false); // reset phoneError in parent
    },
    "formData.password"(newVal) {
      this.passwordError = false;
    },
    "formData.password_confirmation"(newVal) {
      this.passwordError = false;
    },
    privacyPolicyAndTerms(newVal) {
      if (newVal) {
        this.$emit("update:showPrivacyPolicyError", false); // reset showPrivacyPolicyError in parent
      }
    },
  },
  methods: {
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field];
      }
    },
    validatePassword() {
      if (this.formData.password !== this.formData.password_confirmation) {
        this.passwordError = true;
        this.passwordErrorMessage = "Passwords do not match";
      } else {
        this.passwordError = false;
      }
    },
    validateForm() {
      this.showPrivacyPolicyError = !this.privacyPolicyAndTerms;
    },
    onInput(index, event) {
      this.clearError("otp");
      const value = event.target.value;
      if (!/^[0-9]$/.test(value)) {
        this.otp[index] = "";
        return;
      }
      if (index < 3 && value) {
        this.otp[index] = value;
        event.target.nextElementSibling.focus();
      }
    },
    onBackspace(index, event) {
      if (!this.otp[index] && index > 0) {
        event.target.previousElementSibling.focus();
      }
    },
  },
};
</script>
<style scoped>
.custom_border {
  box-shadow: 0 0 10px #1c592f;
}

.input-field {
  @apply w-full p-2 border border-gray-300 rounded;
}
.input-field:focus {
  border-color: #1c592f;
  outline: none;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
.invalid-feedback {
  @apply text-red-600 text-sm;
}
.otp-container {
  display: flex;
  gap: 10px;
}
.otp-input {
  @apply w-16 p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400;
}
.border-red-500 {
  border-color: red;
}
</style>
