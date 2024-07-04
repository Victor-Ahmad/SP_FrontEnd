<template>
  <div class="flex flex-col md:flex-row justify-between h-full p-6" ref="formContainer">
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-t-2 border-b-2 border-gray-300 py-2 mb-4">
        <h3 class="text-2xl font-bold text-[#07A984]">Your Wishes</h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <h3 class="text-lg font-semibold text-[#07A984] mb-2">You want to go to</h3>
          <input type="text" v-model="formData.location_names" placeholder="Enter a location of interest" class="input-field w-full p-2 border rounded">
          <div class="tags-container flex flex-wrap mt-2">
            <span v-for="(city, index) in selectedCities" :key="index" class="tag bg-gray-200 p-2 rounded-full mr-2 mb-2">
              {{ city }} <span @click="removeCity(city)" class="cursor-pointer text-red-500 ml-1">&times;</span>
            </span>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">House Type</h3>
              <div class="relative" ref="houseTypeDropdown">
                <input type="text" v-model="formData.house_type_wish" placeholder="Select an option" readonly class="input-field w-full p-2 border rounded cursor-pointer" @click="toggleDropdown('showDropdown')">
                <ul v-show="showDropdown" class="dropdown-content">
                  <li v-for="(type, index) in houseTypes" :key="index" @click="selectHouseType(type)">{{ type }}</li>
                </ul>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Max Rent Price (€)</h3>
              <input type="number" v-model="formData.price_wish" placeholder="Enter price" class="input-field w-full p-2 border rounded" step="0.01">
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Min Number of Rooms</h3>
              <ul class="flex w-full no-gap-list">
                <li v-for="(number, index) in numberOfRooms" :key="index" @click="selectNumberOfRooms(number)" class="flex-1 p-2 border border-gray-300 rounded cursor-pointer text-center room-item" :class="roomClasses(number)">
                  {{ number }}
                </li>
              </ul>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Floor</h3>
              <input type="number" v-model="formData.floor_wish" placeholder="Enter floor number" class="input-field w-full p-2 border rounded" min="0" step="1">
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">Min Area (m²)</h3>
              <div class="relative" ref="areaDropdown">
                <input type="text" v-model="formData.area_wish" placeholder="Select an option" readonly class="input-field w-full p-2 border rounded cursor-pointer" @click="toggleDropdown('showAreaDropdown')">
                <ul v-show="showAreaDropdown" class="dropdown-content">
                  <li v-for="(area, index) in areas" :key="index" @click="selectArea(area)">{{ area }}</li>
                </ul>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#07A984] mb-2">House Features</h3>
              <div class="relative" ref="featuresDropdown">
                <input type="text" v-model="formData.features_wish" placeholder="Specify house features" readonly class="input-field w-full p-2 border rounded cursor-pointer" @click="toggleDropdown('showFeaturesDropdown')">
                <ul v-show="showFeaturesDropdown" class="dropdown-content">
                  <li v-for="(feature, index) in features" :key="index" @click="toggleFeature(feature)" :class="{'bg-gray-200': formData.features_wish.includes(feature)}">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <h3 class="text-lg font-semibold text-[#07A984] mb-2">Reason for the Swap</h3>
          <textarea v-model="formData.reason_for_swap" placeholder="Explain your reason for the swap" class="input-field w-full p-2 border rounded" rows="4" style="resize: none;"></textarea>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/5 flex items-start justify-center md:pl-6">
      <img :src="image" alt="Step 1 Image" class="w-full h-auto rounded">
    </div>
  </div>
</template>
<script>
export default {
  props: ['formData', 'image'],
  data() {
    return {
      houseTypes: ['Apartment', 'House', 'Studio'],
      numberOfRooms: [1, 2, 3, 4, 5],
      areas: ['50', '100', '150', '200'],
      features: ['Balcony', 'Garage', 'Garden'],
      selectedCities: [],
      showDropdown: false,
      showAreaDropdown: false,
      showFeaturesDropdown: false
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      // Close other dropdowns before opening the clicked one
      if (dropdown === 'showDropdown') {
        this.showDropdown = !this.showDropdown;
        this.showAreaDropdown = false;
        this.showFeaturesDropdown = false;
      } else if (dropdown === 'showAreaDropdown') {
        this.showAreaDropdown = !this.showAreaDropdown;
        this.showDropdown = false;
        this.showFeaturesDropdown = false;
      } else if (dropdown === 'showFeaturesDropdown') {
        this.showFeaturesDropdown = !this.showFeaturesDropdown;
        this.showDropdown = false;
        this.showAreaDropdown = false;
      }
    },
    selectHouseType(type) {
      this.formData.house_type_wish = type;
      this.showDropdown = false;
    },
    selectNumberOfRooms(number) {
      this.formData.number_of_rooms_wish = number;
    },
    selectArea(area) {
      this.formData.area_wish = area;
      this.showAreaDropdown = false;
    },
    toggleFeature(feature) {
      const index = this.formData.features_wish.indexOf(feature);
      if (index > -1) {
        this.formData.features_wish.splice(index, 1);
      } else {
        this.formData.features_wish.push(feature);
      }
      // Do not close the dropdown for multi-select
      // this.showFeaturesDropdown = false;
    },
    removeCity(city) {
      this.selectedCities = this.selectedCities.filter(c => c !== city);
    },
    roomClasses(number) {
      return {
        'bg-white': this.formData.number_of_rooms_wish === number,
        'text-[#07A984]': this.formData.number_of_rooms_wish === number,
        'hover:bg-white': true,
        'hover:shadow-[0_0_10px_#07A984]': true,
        'hover:text-[#07A984]': true,
        'border-gray-300': true,
        'hover:border-[#07A984]': true,
        'transition': true,
        'duration-300': true,
        'ease-in-out': true,
        'selected-room': this.formData.number_of_rooms_wish === number
      };
    },
    handleClickOutside(event) {
      const houseTypeDropdown = this.$refs.houseTypeDropdown;
      const areaDropdown = this.$refs.areaDropdown;
      const featuresDropdown = this.$refs.featuresDropdown;

      if (houseTypeDropdown && !houseTypeDropdown.contains(event.target)) {
        this.showDropdown = false;
      }
      if (areaDropdown && !areaDropdown.contains(event.target)) {
        this.showAreaDropdown = false;
      }
      if (featuresDropdown && !featuresDropdown.contains(event.target)) {
        this.showFeaturesDropdown = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
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
.tags-container {
  @apply mt-2 flex flex-wrap;
}
.no-gap-list li {
  margin: 0 !important;
}
.room-item {
  transition: all 0.3s ease-in-out;
}
.room-item:hover {
  box-shadow: 0 0 10px #07A984;
  border-color: #07A984;
}
.selected-room {
  background-color: white !important;
  color: #07A984 !important;
  box-shadow: 0 0 10px #07A984 !important;
  border-color: #07A984 !important;
}
.dropdown-content,
.multi-select-content {
  @apply absolute bg-white shadow-lg max-h-48 overflow-y-auto z-10 w-full mt-1 border border-gray-300 rounded;
}
.dropdown-content li,
.multi-select-content li {
  @apply cursor-pointer p-2 hover:bg-gray-100;
}
</style>
