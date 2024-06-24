<template>
    <div class="flex justify-center mb-6">
        <div
            class="flex w-full max-w-full rounded overflow-hidden shadow-lg bg-white relative house-card hover:border-2 hover:border-blue-500 transition-border duration-300">
            <div class="flex-shrink-0" style="width: 400px; height: 300px;">
                <swiper :slides-per-view="1" class="swiper-container" style="height: 100%;">
                    <swiper-slide v-for="(image, index) in house.images" :key="index">
                        <img :src="getImageUrl(image.image_path)" class="w-full h-full object-cover">
                    </swiper-slide>
                    <swiper-slide v-if="house.images.length === 0">
                        <img src="@/assets/logo.svg" class="w-full h-full object-cover" alt="Placeholder">
                    </swiper-slide>
                </swiper>
            </div>
            <div class="px-6 py-4 flex flex-col justify-between w-full relative">
                <div class="flex justify-between items-start">
                    <div>
                        <div class="font-bold text-xl mb-8">{{ house.location }}, {{ house.street }}</div>
                        <div class="flex flex-wrap mb-2">
                            <div class="w-1/2 text-gray-700 text-base flex items-center mb-2">
                                <i class="fas fa-envelope mr-2"></i> {{ house.post_code }}
                            </div>
                            <div class="w-1/2 text-gray-700 text-base flex items-center mb-2">
                                <i class="fas fa-user mr-2"></i> {{ house.user.first_name }} {{ house.user.last_name }}
                            </div>
                            <div class="w-1/2 text-orange-500 text-xl font-semibold flex items-center mb-2">
                                <i class="fas fa-euro-sign mr-2"></i> {{ house.price }}
                            </div>
                            <div class="w-1/2 text-gray-700 text-base flex items-center mb-2">
                                <i class="fas fa-home mr-2"></i> <strong>HuisType:</strong> {{ house.house_type.type }}
                            </div>
                            <div class="w-1/2 text-gray-700 text-base flex items-center mb-2">
                                <i class="fas fa-door-open mr-2"></i> <strong>Kamers:</strong> {{ house.number_of_rooms
                                }}
                            </div>
                            <div class="w-1/2 text-gray-700 text-base flex items-center mb-2">
                                <i class="fas fa-heart mr-2"></i> <strong>Interesses:</strong> {{ house.interests }}
                            </div>
                        </div>
                    </div>
                    <button @click="toggleFavorite"
                        class="absolute top-4 right-4 text-gray-400 hover:text-red-500 focus:outline-none transition-transform transform">
                        <i :class="isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart'"></i>
                    </button>
                </div>
                <div class="flex justify-end space-x-2 mt-4">
                    <button @click="toggleInterested"
                        :class="['px-3 py-1 rounded-md flex items-center text-sm transition-transform transform active:scale-95', isInterested ? 'bg-green-500 text-white' : 'border border-green-500 text-green-500']">
                        <i class="fas fa-thumbs-up mr-1"></i> Interested
                    </button>
                    <button @click="toggleNotInterested"
                        :class="['px-3 py-1 rounded-md flex items-center text-sm transition-transform transform active:scale-95', isNotInterested ? 'bg-red-500 text-white' : 'border border-red-500 text-red-500']">
                        <i class="fas fa-thumbs-down mr-1"></i> Not Interested
                    </button>
                    <button
                        class="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center text-sm transition-transform transform active:scale-95">
                        <i class="fas fa-comment mr-1"></i> Chat
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
    name: 'HouseCard',
    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        house: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isFavorite: false,
            isInterested: false,
            isNotInterested: false
        };
    },
    methods: {
        getImageUrl(path) {
            return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
        },
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
        },
        toggleInterested() {
            this.isInterested = !this.isInterested;
            if (this.isInterested) {
                this.isNotInterested = false;
            }
        },
        toggleNotInterested() {
            this.isNotInterested = !this.isNotInterested;
            if (this.isNotInterested) {
                this.isInterested = false;
            }
        }
    }
};
</script>

<style scoped>
/* Ensure fixed height for the swiper */
.swiper-container {
    height: 100%;
}

button i.fas.fa-heart,
button i.far.fa-heart {
    transition: color 0.3s;
    font-size: 24px;
    /* Increase font size for larger icon */
}

button i.fas,
button i.far {
    font-size: 16px;
    /* Decrease icon size for smaller buttons */
}

.house-card {
    transition: border 0.3s ease;
}

button.absolute {
    padding: 8px;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: none;
}

button.absolute i {
    font-size: 24px;
}

/* Button hover effects */
button:hover {
    transform: none;
}
</style>
