<template>
    <div class="flex justify-center mb-4" @click="goToDetailPage">
        <div class="flex flex-col w-full max-w-full rounded overflow-hidden shadow-lg bg-white cursor-pointer relative house-card hover:border-2 custom_hover transition-border duration-300">
            <div class="flex-shrink-0" style="width: 100%; height: 200px;">
                <swiper :slides-per-view="1" class="swiper-container" style="height: 100%;">
                    <swiper-slide v-for="(image, index) in house.images" :key="index">
                        <img :src="getImageUrl(image.image_path)" class="w-full h-full object-cover">
                    </swiper-slide>
                    <swiper-slide v-if="house.images.length === 0">
                        <img src="@/assets/logo.svg" class="w-full h-full object-cover" alt="Placeholder">
                    </swiper-slide>
                </swiper>
            </div>
            <div class="px-4 py-2 flex flex-col justify-between w-full relative house-card-content">
                <div class="flex justify-between items-start">
                    <div>
                        <div class="font-bold text-lg">{{ house.street || '' }}</div>
                        <div class="text-xs mb-4">{{ house.location || '' }}, {{ house.post_code || '' }}</div>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-2 mb-2 house-details">
                            <div class="text-gray-700 text-sm flex items-center user-icon">
                                <i class="fas fa-user mr-2 icon_custom_color"></i> {{ house.user.first_name || '' }} {{ house.user.last_name || '' }}
                            </div>
                            <div class="text-purple-custom text-base font-semibold flex items-center">
                                <i class="fas fa-euro-sign mr-2"></i> {{ house.price || '' }} / month
                            </div>
                            <div class="text-gray-700 text-sm flex items-center">
                                <i class="fas fa-home mr-2 icon_custom_color"></i> {{ house.house_type.type || '' }}
                            </div>
                            <div class="text-gray-700 text-sm flex items-center">
                                <i class="fas fa-door-open mr-2 icon_custom_color"></i> <strong>Kamers: </strong> {{ house.number_of_rooms || '' }}
                            </div>
                            <div class="text-gray-700 text-sm flex items-center">
                                <i class="fas fa-map-marker-alt mr-2 icon_custom_color"></i> <strong>Area: </strong> {{ house.area || '' }} (m²)
                            </div>
                        </div>
                        <div :class="{'border-t border-gray-200 pt-2': validProperties.length}" class="flex flex-wrap space-x-2">
                            <span v-for="property in validProperties" :key="property.id" class="px-3 py-1 bg-purple-custom text-white rounded-full text-xs">
                                {{ property.specific_property.name || '' }}
                            </span>
                        </div>
                    </div>
                    <button @click="handleFavoriteClick($event)" class="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none transition-transform transform">
                        <i :class="isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart'"></i>
                    </button>
                </div>
              
                <div class="flex justify-between items-center mt-2 space-x-2 border-t border-gray-200 pt-2">
                    <button @click="handleInterestedClick($event)" :class="['flex-1 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95', isInterested ? 'bg-interested-active text-white' : 'border border-interested-active text-interested-active']">
                        <i class="fas fa-thumbs-up mr-1"></i> Interested
                    </button>
                    <button @click="toggleNotInterested($event)" :class="['flex-2 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95', isNotInterested ? 'bg-red-custom text-white' : 'border border-red-custom text-red-custom']">
                        <i class="fas fa-thumbs-down mr-1"></i> Not Interested
                    </button>
                    <button @click="startChat($event)" class="px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95 bg-purple-custom2 text-white">
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
import { expressInterest, addToFavorites, sendMessage } from '@/services/apiService';

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
    created() {
        // Initialize the button states based on the house data
        this.isFavorite = this.house.is_favorite;
        this.isInterested = this.house.is_interested;
        // this.isNotInterested = !this.house.is_interested;
    },
    computed: {
        validProperties() {
            return this.house.specific_properties?.filter(property =>
                property && property.specific_property && property.specific_property.name
            ) || [];
        }
    },
    methods: {
        getImageUrl(path) {
            return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
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
        async startChat(event) {
            event.stopPropagation();
            try {
                const message = "Hi, I am interested in your house.";
                const receiverUserId = this.house.user.id;
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
        goToDetailPage() {
            this.$router.push({ name: 'HouseDetail', params: { id: this.house.id } });
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

.bg-light-orange {
    width: 500px;
    background-color: rgba(255, 166, 0, 0.2);
}

.text-purple-custom {
    color: #07A984;
}
.text-green-custom {
    color: #22893c;
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
.bg-green-custom {
    background-color: #22893c;
}
.bg-purple-custom {
    background-color: #E8FDF6;
    color:#000;
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

.user-icon i {
    color: #07A984;
}

.icon_custom_color {
    color: #07A984;
}

.house-card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.house-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px 16px;
}

.border-t {
    border-top-width: 1px;
}

.border-gray-300 {
    border-color: #D1D5DB; /* Tailwind's gray-300 color */
}

.pt-2 {
    padding-top: 0.5rem; /* Tailwind's padding top 2 */
}
</style>
