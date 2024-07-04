<template>
    <div class="min-h-screen p-8">
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
      <div v-else class="house-detail-page flex flex-col items-center">
        <div class="house-detail-images-container w-full pt-4 px-10">
          <div v-if="house.images.length" class="images-grid grid grid-cols-5 mb-10 gap-2 w-full">
            <div class="leading-image col-span-2 row-span-2 relative w-full pb-[66.66%] overflow-hidden rounded-lg shadow-lg">
              <img :src="getImageUrl(house.images[0].image_path)" class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer" alt="Leading Image" @click="openImage(getImageUrl(house.images[0].image_path))">
            </div>
            <div v-for="(image, index) in house.images.slice(1, 7)" :key="index" class="secondary-image relative w-full pb-[66.66%] overflow-hidden rounded-lg shadow-lg">
              <img :src="getImageUrl(image.image_path)" class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer" alt="House Image" @click="openImage(getImageUrl(image.image_path))">
            </div>
          </div>
          <hr class="border-t-2 border-[#07A984] mb-10 rounded-full" v-if="house.images.length">
        </div>
  
        <div class="house-detail-info-wrapper flex justify-between w-[75vw] mb-10 p-4">
          <div class="house-detail-info-container bg-white p-5 w-[74%] ">
            <div class="house-detail-header flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <div class="text-2xl font-bold text-gray-700">{{ house.street }}, {{ house.location }}</div>
              <div class="text-lg text-[#07A984] font-bold">{{ house.price }} / month</div>
            </div>
            <div class="house-detail-info mt-5">
              <div class="info-section p-4 rounded-lg">
                <h2 class="text-xl font-bold text-gray-800 mb-4">House Details</h2>
                <div class="info-item py-2 grid grid-cols-2">
                  <span class="font-medium text-gray-700">Type:</span>
                  <span>{{ house.house_type.type }}</span>
                </div>
                <hr class="border-t border-gray-300 my-2">
                <div class="info-item py-2 grid grid-cols-2">
                  <span class="font-medium text-gray-700">Number of Rooms:</span>
                  <span>{{ house.number_of_rooms }}</span>
                </div>
                <hr class="border-t border-gray-300 my-2">
                <div class="info-item py-2 grid grid-cols-2">
                  <span class="font-medium text-gray-700">Area:</span>
                  <span>{{ house.area || 'N/A' }} m²</span>
                </div>
              </div>
            </div>
  
            <div class="house-detail-info mt-5">
              <div class="info-section p-4 rounded-lg">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Description</h2>
                <div class="info-item py-2">
                  <span>{{ house.description || 'No description available' }}</span>
                </div>
              </div>
            </div>
  
            <div class="house-detail-info mt-5">
              <div class="info-section p-4 rounded-lg">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Wishes</h2>
                <div v-for="wish in houseOwner.wishes" :key="wish.id" class="wish-item mt-3">
                  <div class="info-item py-2 grid grid-cols-2">
                    <span class="font-medium text-gray-700">House Type:</span>
                    <span>{{ wish.house_type ? wish.house_type.type : 'N/A' }}</span>
                  </div>
                  <hr class="border-t border-gray-300 my-2">
                  <div class="info-item py-2 grid grid-cols-2">
                    <span class="font-medium text-gray-700">Number of Rooms:</span>
                    <span>{{ wish.number_of_rooms || 'N/A' }}</span>
                  </div>
                  <hr class="border-t border-gray-300 my-2">
                  <div class="info-item py-2 grid grid-cols-2">
                    <span class="font-medium text-gray-700">Price:</span>
                    <span>{{ wish.price || 'N/A' }} / month</span>
                  </div>
                  <hr class="border-t border-gray-300 my-2">
                  <div class="info-item py-2 grid grid-cols-2">
                    <span class="font-medium text-gray-700">Area:</span>
                    <span>{{ wish.area || 'N/A' }} m²</span>
                  </div>
                  <hr class="border-t border-gray-300 my-2">
                  <div v-if="wish.wish_locations.length" class="info-item py-2 grid grid-cols-2">
                    <span class="font-medium text-gray-700">Preferred Locations:</span>
                    <div>
                      <ul class="list-disc pl-5">
                        <li v-for="location in wish.wish_locations" :key="location.id">{{ location.location }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="contact-info-container bg-white p-5 rounded-lg shadow-lg w-[25%] self-start">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Contact Info</h2>
              <button 
                class="favorite-button w-10 h-10 bg-white text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                @click="handleFavoriteClick($event)"
              >
                <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>
            <div class="info-item py-2 flex justify-between">
              <span class="font-medium text-gray-700">Name:</span>
              <span>{{ houseOwner.first_name }} {{ houseOwner.last_name }}</span>
            </div>
            <hr class="border-t border-gray-300 my-2">
            <div class="info-item py-2">
              <button class="chat-button w-full py-3 bg-[#07A984] text-white rounded-lg hover:bg-green-600 mb-4" @click="startChat($event)">Chat</button>
            </div>
            <div class="info-item py-2 flex justify-between space-x-2">
              <button 
                class="interest-button w-1/2 py-3 flex items-center justify-center rounded-lg transition"
                :class="[isInterested ? 'bg-interested-active text-white' : 'bg-white text-[#07A984] border border-[#07A984] hover:bg-[#07A984] hover:text-white']"
                @click="handleInterestedClick($event)"
              >
                Interested
              </button>
              <button 
                class="not-interest-button w-1/2 py-3 flex items-center justify-center rounded-lg transition"
                :class="[isNotInterested ? 'bg-red-custom text-white' : 'bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white']"
                @click="toggleNotInterested($event)"
              >
                Not Interested
              </button>
            </div>
            <div class="info-item py-2 mt-4">
              <button class="share-button w-full py-3 bg-[#07A984] text-white rounded-lg hover:bg-green-600 flex items-center justify-center">
                <i class="fas fa-share-alt mr-2"></i> Share
              </button>
            </div>
          </div>
        </div>
        <ImagePopup :imageSrc="selectedImage" :visible="isPopupVisible" @close="isPopupVisible = false" />
      </div>
    </div>
  </template>
  
  <script>
  import { getHouseById, sendMessage, expressInterest, addToFavorites } from '@/services/apiService';
  import ImagePopup from '@/components/ImagePopup.vue'; // Adjust the import path as necessary
  
  export default {
    name: 'HouseDetail',
    components: {
      ImagePopup
    },
    data() {
      return {
        house: {},
        houseOwner: {},
        isFavorite: false,
        isInterested: false,
        isNotInterested: false,
        selectedImage: '',
        isPopupVisible: false,
        isLoading: true,
        error: null
      };
    },
    async created() {
      const houseId = this.$route.params.id;
      try {
        const response = await getHouseById(houseId);
        if (response.success) {
          this.house = response.result.house;
          this.houseOwner = response.result.house_owner;
        } else {
          this.error = 'Failed to fetch house details: ' + response.message;
        }
      } catch (error) {
        this.error = 'API call failed: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    methods: {
      getImageUrl(path) {
        return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
      },
      async startChat(event) {
        event.stopPropagation();
        try {
          const message = "Hi, I am interested in your house.";
          const receiverUserId = this.houseOwner.id;
          const response = await sendMessage(message, receiverUserId);
          if (response.success) {
            this.$router.push({ name: 'ChatPage' });
          } else {
            console.error('Failed to send message:', response.message);
          }
        } catch (error) {
          console.error('Failed to start chat:', error);
        }
      },
      async handleFavoriteClick(event) {
        event.stopPropagation();
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
          try {
            const response = await addToFavorites(this.house.id);
            console.log('Added to favorites successfully:', response);
          } catch (error) {
            console.error('Error adding to favorites:', error);
          }
        }
      },
      async handleInterestedClick(event) {
        event.stopPropagation();
        this.isInterested = !this.isInterested;
        if (this.isInterested) {
          this.isNotInterested = false;
          try {
            const response = await expressInterest(this.house.id);
            console.log('Interest expressed successfully:', response);
          } catch (error) {
            console.error('Error expressing interest:', error);
          }
        }
      },
      toggleNotInterested(event) {
        event.stopPropagation();
        this.isNotInterested = !this.isNotInterested;
        if (this.isNotInterested) {
          this.isInterested = false;
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
  .leading-image img,
  .secondary-image img {
    object-fit: cover;
    cursor: pointer;
  }
  
  .bg-purple-custom {
    background-color: #E8FDF6;
    color: #000;
  }
  
  .bg-purple-custom2 {
    background-color: #07A984;
    color: #fff;
  }
  
  .bg-red-custom {
    background-color: #FF0000;
    border: solid #FF0000;
  }
  
  .border-interested-active {
    border-color: #07A984;
  }
  
  .text-interested-active {
    color: #07A984;
  }
  
  .bg-interested-active {
    background-color: #07A984;
  }
  
  .text-red-custom {
    color: #FF0000;
  }
  
  .border-red-custom {
    border: solid #FF0000;
  }
  
  .custom_hover:hover {
    border-color: #07A984;
  }
  
  .loading-spinner {
    font-size: 1.5rem;
    color: #07A984;
    margin-top: 20px;
  }
  </style>
  