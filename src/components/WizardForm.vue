<template>
    <div class="w-full p-6 flex flex-col min-h-screen">
      <div class="stepper-wrapper mb-6 flex justify-between relative">
        <div
          v-for="(step, index) in steps"
          :key="index"
          :class="[
            'stepper-item relative flex flex-col items-center flex-1 text-center',
            currentStep >= index ? 'completed' : '',
            currentStep === index ? 'active' : ''
          ]"
        >
          <div class="step-counter relative inline-block p-2 px-8 bg-gray-300 text-white font-bold text-lg transition duration-300 border-2 border-transparent">
            {{ step.name }}
            <div
              v-if="index > 0"
              class="absolute top-1/2 left-0 w-0 h-0 transform -translate-y-1/2 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[12px] border-l-white"
              :class="currentStep >= index ? 'border-l-[#07A984]' : 'border-l-white'"
            ></div>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <component :is="steps[currentStep].component" :formData="formData" :image="steps[currentStep].image" :key="currentStep"></component>
      </transition>
      <div class="form-navigation  flex w-3/5 justify-between p-6 space-x-4">
        <button
          @click="prevStep"
          :disabled="currentStep === 0"
          class="px-4 py-2 bg-gray-300 text-white w-40 rounded-full transition duration-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          v-if="currentStep < steps.length - 1"
          @click="nextStep"
          class="px-4 py-2 bg-[#07A984] text-white w-40 rounded-full transition duration-300 hover:bg-[#065e58]"
        >
          Next
        </button>
        <button
          v-if="currentStep === steps.length - 1"
          @click="submitForm"
          class="px-4 py-2 bg-[#07A984] text-white w-40 rounded-full transition duration-300 hover:bg-[#065e58]"
        >
          Submit
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  import Step4 from './Step4.vue';
  
  export default {
    components: { Step1, Step2, Step3, Step4 },
    data() {
      return {
        currentStep: 0,
        formData: {
          location_names: '',
          house_type_wish: '',
          price_wish: '',
          number_of_rooms_wish: '',
          area_wish: '',
          features_wish: [],
          floor_wish: '',
          reason_for_swap: '',
          post_code: '',
          house_number: '',
          location_name: '',
          street: '',
          house_type: '',
          price: '',
          number_of_rooms: '',
          area: '',
          features: [],
          floor:'',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          password: '',
          password_confirmation: '',
          privacy_policy_and_terms_of_use: false,
          house_description: ''
        },
        steps: [
          { name: 'Step 1', component: Step1, image: 'https://via.placeholder.com/400x300' },
          { name: 'Step 2', component: Step2, image: 'https://via.placeholder.com/400x300' },
          { name: 'Step 3', component: Step3, image: 'https://via.placeholder.com/400x300' },
          { name: 'Step 4', component: Step4, image: 'https://via.placeholder.com/400x300' }
        ]
      };
    },
    methods: {
      nextStep() {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
        }
      },
      prevStep() {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      submitForm() {
        alert('Form submitted!');
      }
    }
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
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
    content: '';
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
    border-top-color: #07A984;
  }
  .step-counter {
    z-index: 5;
    width: 50%;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%);
  }
  .stepper-item.active .step-counter,
  .stepper-item.completed .step-counter {
    background-color: #07A984;
  }
  .stepper-item:first-child .step-counter::before,
  .stepper-item:last-child .step-counter::after {
    border-color: transparent #07A984 transparent transparent;
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
  </style>
  

  