<template>
  <div class="flex flex-col md:flex-row justify-between h-full">
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-gray-300 py-2 mb-4">
        <h3 class="text-4xl font-bold text-[#1c592f]">
          {{ $t("myInfo.title") }}
        </h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.firstName") }}
              </h3>
              <input
                type="text"
                v-model="formData.first_name"
                :placeholder="$t('myInfo.firstNamePlaceholder')"
                class="input-field w-full p-2 border rounded"
                required
              />
              <div class="invalid-feedback" v-if="errors.first_name">
                {{ errors.first_name }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.lastName") }}
              </h3>
              <input
                type="text"
                v-model="formData.last_name"
                :placeholder="$t('myInfo.lastNamePlaceholder')"
                class="input-field w-full p-2 border rounded"
                required
              />
              <div class="invalid-feedback" v-if="errors.last_name">
                {{ errors.last_name }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.email") }}
              </h3>
              <input
                type="email"
                v-model="formData.email"
                :placeholder="$t('myInfo.emailPlaceholder')"
                class="input-field w-full p-2 border rounded"
                required
              />
              <div class="invalid-feedback" v-if="emailError">
                {{ emailErrorMessage }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.phoneNumber") }}
              </h3>
              <input
                type="tel"
                v-model="formData.phone_number"
                :placeholder="$t('myInfo.phoneNumberPlaceholder')"
                class="input-field w-full p-2 border rounded"
                required
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
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.password") }}
              </h3>
              <input
                type="password"
                v-model="formData.password"
                :placeholder="$t('myInfo.passwordPlaceholder')"
                class="input-field w-full p-2 border rounded"
                required
                @blur="validatePassword"
              />
              <div class="invalid-feedback" v-if="passwordError">
                {{ passwordErrorMessage }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myInfo.confirmPassword") }}
              </h3>
              <input
                type="password"
                v-model="formData.password_confirmation"
                :placeholder="$t('myInfo.confirmPasswordPlaceholder')"
                class="input-field w-full p-2 border rounded"
                required
                @blur="validatePassword"
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
                    class="checkbox required"
                    required
                  />
                  <span>
                    {{ $t("myInfo.agreeTo") }}
                    <a href="#" target="_blank" class="text-[#1c592f]">{{
                      $t("myInfo.privacyPolicy")
                    }}</a>
                    {{ $t("myInfo.and") }}
                    <a href="#" target="_blank" class="text-[#1c592f]">{{
                      $t("myInfo.termsOfUse")
                    }}</a>
                  </span>
                </label>
                <div class="invalid-feedback" v-if="showPrivacyPolicyError">
                  {{ $t("myInfo.privacyPolicyError") }}
                </div>
              </div>
            </div>
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
  ],
  data() {
    return {
      passwordError: false,
      passwordErrorMessage: "",
      errors: {},
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
  },
};
</script>

<style scoped>
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
</style>
