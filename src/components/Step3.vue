<template>
  <div class="flex flex-col md:flex-row justify-between h-full p-6">
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-t-2 border-b-2 border-gray-300 py-2 mb-4">
        <h3 class="text-2xl font-bold text-[#07A984]">Your Information</h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">First Name</h3>
              <input type="text" v-model="formData.first_name" placeholder="First Name" class="input-field w-full p-2 border rounded" required>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Last Name</h3>
              <input type="text" v-model="formData.last_name" placeholder="Last Name" class="input-field w-full p-2 border rounded" required>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Email</h3>
              <input type="email" v-model="formData.email" placeholder="Email" class="input-field w-full p-2 border rounded" required>
              <div class="invalid-feedback" v-if="emailError">Email is already taken</div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Phone Number</h3>
              <input type="tel" v-model="formData.phone_number" placeholder="Phone Number" class="input-field w-full p-2 border rounded" required>
              <div class="invalid-feedback" v-if="phoneError">Phone number is already taken</div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Password</h3>
              <input type="password" v-model="formData.password" placeholder="Password" class="input-field w-full p-2 border rounded" required>
              <div class="invalid-feedback" v-if="passwordError">Passwords do not match</div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Confirm Password</h3>
              <input type="password" v-model="formData.password_confirmation" placeholder="Confirm Password" class="input-field w-full p-2 border rounded" required>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2">
              <div class="wthree-text">
                <label class="anim">
                  <input type="checkbox" v-model="formData.privacy_policy_and_terms_of_use" class="checkbox required" required>
                  <span>
                    I agree to the <a href="#" target="_blank" class="text-[#07A984]">privacy policy</a>
                  </span>
                </label>
                <div class="invalid-feedback" v-if="!formData.privacy_policy_and_terms_of_use">You must agree to the privacy policy</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="w-full md:w-2/5 flex items-center justify-center md:pl-6">
      <img :src="image" alt="Step 3 Image" class="w-full h-auto rounded">
    </div>
  </div>
</template>

<script>
export default {
  props: ['formData', 'image'],
  data() {
    return {
      emailError: false,
      phoneError: false,
      passwordError: false,
    };
  },
  watch: {
    'formData.email'(newVal) {
      this.emailError = false;
    },
    'formData.phone_number'(newVal) {
      this.phoneError = false;
    },
    'formData.password'(newVal) {
      this.passwordError = false;
    },
    'formData.password_confirmation'(newVal) {
      this.passwordError = false;
    }
  },
  methods: {
    validateEmail() {
      // Add email validation logic here
    },
    validatePhoneNumber() {
      // Add phone number validation logic here
    },
    validatePassword() {
      if (this.formData.password !== this.formData.password_confirmation) {
        this.passwordError = true;
      }
    }
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full p-2 border border-gray-300 rounded;
}
.input-field:focus {
  border-color: #07A984;
  outline: none;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
.invalid-feedback {
  @apply text-red-600 text-sm;
}
</style>
