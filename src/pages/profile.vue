<template>
  <div class="profile-page flex flex-col items-center p-6 min-h-screen bg-white">
    <div v-if="profile" class="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-8">
        <div class="profile-header flex items-center">
          <img
            :src="profile.profile_picture || 'https://via.placeholder.com/150'"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full mr-6 border-4 border-[#07A984]"
          />
          <div>
            <h1 class="text-4xl font-bold text-[#07A984]">{{ profile.first_name }} {{ profile.last_name }}</h1>
            <p class="text-gray-700">{{ profile.email }}</p>
            <p class="text-gray-700">{{ profile.number }}</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <button @click="toggleEdit" class="bg-[#07A984] text-white px-4 py-2 rounded shadow hover:bg-[#06826e] transition">
            {{ isEditable ? 'Save' : 'Edit' }}
          </button>
          <button v-if="isEditable" @click="cancelEdit" class="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500 transition">
            Cancel
          </button>
        </div>
      </div>
      <div class="tabs flex space-x-4 mb-8">
        <button @click="setActiveTab('details')" :class="tabClass('details')">User Details</button>
        <button @click="setActiveTab('house')" :class="tabClass('house')">House Details</button>
        <button @click="setActiveTab('wishes')" :class="tabClass('wishes')">Wishes</button>
      </div>
      <div v-if="activeTab === 'details'" class="user-details">
        <h2 class="text-3xl font-semibold text-[#07A984] mb-4">User Details</h2>
        <div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">First Name:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.first_name" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Last Name:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.last_name" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Email:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.email" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Phone:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.number" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Password:</strong>
              <div class="w-2/3">******</div> <!-- Displaying password as hidden -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'house'" class="house-details">
        <h2 class="text-3xl font-semibold text-[#07A984] mb-4">House Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Type:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.one_to_one_swap_house.house_type.type" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Location:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.one_to_one_swap_house.location" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Number of Rooms:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.one_to_one_swap_house.number_of_rooms" class="input-editable w-2/3" />
            </div>
          </div>
          <div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Price:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.one_to_one_swap_house.price" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Description:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="profile.one_to_one_swap_house.description" class="input-editable w-2/3" />
            </div>
          </div>
        </div>
        <h3 class="text-2xl font-semibold text-[#07A984] mt-8 mb-4">House Gallery</h3>
        <div>
          <div class="mb-8">
            <h4 class="text-xl font-semibold text-[#07A984] mb-2">Leading Image</h4>
            <div class="relative">
              <img v-if="leadingImage" :src="leadingImage" class="w-full h-96 object-cover rounded-lg shadow-lg cursor-pointer" alt="Leading House Image" @click="openImage(leadingImage)">
              <div v-if="!leadingImage" class="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">No Leading Image</div>
              <button v-if="isEditable && leadingImage" @click="removeLeadingImage" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2">X</button>
              <input v-if="isEditable" type="file" @change="uploadLeadingImage" class="mt-4" accept="image/*">
            </div>
          </div>
          <div v-if="profile.one_to_one_swap_house.images.length > 0">
            <h4 class="text-xl font-semibold text-[#07A984] mb-2">Other Images</h4>
            <div class="images-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(image, index) in profile.one_to_one_swap_house.images" :key="image.id" class="relative w-full pb-[66.66%] overflow-hidden rounded-lg shadow-md">
                <img :src="getImageUrl(image.image_path)" class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer" alt="House Image" @click="openImage(getImageUrl(image.image_path))">
                <button v-if="isEditable" @click="removeImage(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2">X</button>
              </div>
            </div>
            <input v-if="isEditable" type="file" @change="uploadNewImages" class="mt-4" multiple accept="image/*">
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'wishes'" class="wishes">
        <h2 class="text-3xl font-semibold text-[#07A984] mb-4">Wishes</h2>
        <div v-for="(wish, index) in profile.wishes" :key="index" class="mb-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Location:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="wishLocations[index]" class="input-editable w-2/3" />
            </div>
            <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Number of Rooms:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="wish.number_of_rooms" class="input-editable w-2/3" />
            </div>
            
              <div class="flex items-center border-b py-2">
              <strong class="w-1/3">Price:</strong>
              <input :readonly="!isEditable" :class="inputClass" v-model="wish.price" class="input-editable w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg text-center">
      <p>Loading profile...</p>
    </div>
    <ImagePopup :imageSrc="selectedImage" :visible="isPopupVisible" @close="isPopupVisible = false" />
  </div>
</template>

<script>
import { getProfile, saveProfile } from '@/services/apiService';
import ImagePopup from '@/components/ImagePopup.vue'; // Adjust the import path as necessary

export default {
  name: 'ProfilePage',
  components: {
    ImagePopup
  },
  data() {
    return {
      profile: null,
      originalProfile: null,
      activeTab: 'details',
      isEditable: false,
      error: null,
      wishLocations: [],
      removedImages: [],
      removedLeadingImage: null,
      newImages: [],
      newLeadingImage: null,
      leadingImage: null,
      selectedImage: '',
      isPopupVisible: false
    };
  },
  async created() {
    try {
      const response = await getProfile();
      if (response.success) {
        this.profile = response.result;
        this.originalProfile = JSON.parse(JSON.stringify(this.profile)); // Deep copy of the profile object
        this.wishLocations = this.profile.wishes.map(wish => (wish.wish_locations.length ? wish.wish_locations[0].location : ''));
        this.leadingImage = this.profile.one_to_one_swap_house.images.length > 0 ? this.getImageUrl(this.profile.one_to_one_swap_house.images[0].image_path) : null;
      } else {
        this.error = response.message;
      }
    } catch (error) {
      this.error = 'Failed to load profile data.';
    }
  },
  computed: {
    inputClass() {
      return this.isEditable ? 'border-2 border-blue-500 bg-blue-50 shadow-md py-2 px-3' : 'bg-transparent py-2 px-3';
    }
  },
  methods: {
    getImageUrl(path) {
      // Do not add base URL for local images
      return path.startsWith('data:image') ? path : `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    tabClass(tab) {
      return this.activeTab === tab ? 'bg-[#07A984] text-white px-4 py-2 rounded shadow' : 'bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition';
    },
    toggleEdit() {
      if (this.isEditable) {
        saveProfile({
          ...this.profile,
          removedImages: this.removedImages,
          removedLeadingImage: this.removedLeadingImage,
          newImages: this.newImages,
          newLeadingImage: this.newLeadingImage
        })
          .then(response => {
            if (response.success) {
              this.profile = response.result;
              this.originalProfile = JSON.parse(JSON.stringify(this.profile)); // Update original profile with saved data
              this.removedImages = [];
              this.newImages = [];
              this.newLeadingImage = null;
              this.removedLeadingImage = null;
              this.leadingImage = this.profile.one_to_one_swap_house.images.length > 0 ? this.getImageUrl(this.profile.one_to_one_swap_house.images[0].image_path) : null;
            } else {
              this.error = response.message;
            }
          })
          .catch(() => {
            this.error = 'Failed to save profile data.';
          });
      }
      this.isEditable = !this.isEditable;
    },
    cancelEdit() {
      this.profile = JSON.parse(JSON.stringify(this.originalProfile)); // Revert to original profile
      this.removedImages = [];
      this.newImages = [];
      this.newLeadingImage = null;
      this.removedLeadingImage = null;
      this.leadingImage = this.profile.one_to_one_swap_house.images.length > 0 ? this.getImageUrl(this.profile.one_to_one_swap_house.images[0].image_path) : null;
      this.isEditable = false;
    },
    removeImage(index) {
      const removedImage = this.profile.one_to_one_swap_house.images.splice(index, 1)[0];
      this.removedImages.push(removedImage.id);
    },
    removeLeadingImage() {
      this.removedLeadingImage = this.profile.one_to_one_swap_house.images[0].id;
      this.profile.one_to_one_swap_house.images.splice(0, 1);
      this.leadingImage = null;
    },
    uploadNewImages(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.newImages.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.one_to_one_swap_house.images.push({
            id: null,
            image_path: e.target.result // Directly use base64 image path
          });
          this.$forceUpdate(); // Ensure the component updates and renders the new image
        };
        reader.readAsDataURL(file);
      }
    },
    uploadLeadingImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.newLeadingImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.leadingImage = e.target.result; // Directly use base64 image path
          this.$forceUpdate(); // Ensure the component updates and renders the new image
        };
        reader.readAsDataURL(file);
      }
    },
    openImage(image) {
      this.selectedImage = image;
      this.isPopupVisible = true;
    }
  }
};
</script>

<style scoped>
.input-editable {
  @apply border-none text-lg w-full transition duration-300;
}
.input-editable[readonly] {
  @apply bg-transparent;
}
.input-editable:focus {
  @apply outline-none bg-[#e7f7f4];
}
</style>
