<template>
    <div class="house-detail-page">
        <div class="house-detail-images-container mb-4">
            <div class="images-grid grid grid-cols-5 gap-2">
                <div class="leading-image col-span-2 row-span-2">
                    <img :src="getImageUrl(house.images[0].image_path)" class="object-cover w-full h-full" alt="Leading Image">
                </div>
                <div v-for="(image, index) in house.images.slice(1, 7)" :key="index" class="secondary-image">
                    <img :src="getImageUrl(image.image_path)" class="object-cover w-full h-full" alt="House Image">
                </div>
            </div>
        </div>
        <div class="house-detail-info-container p-4 bg-white rounded shadow-lg">
            <div class="house-detail-header flex justify-between items-center mb-4">
                <div class="text-2xl font-bold">{{ house.street }}, {{ house.location }}</div>
                <div class="text-lg">{{ house.price }} / month</div>
            </div>
            <div class="house-detail-info grid grid-cols-2 gap-4">
                <div>
                    <h2 class="text-xl font-semibold">House Details</h2>
                    <p><strong>Type:</strong> {{ house.house_type.type }}</p>
                    <p><strong>Number of Rooms:</strong> {{ house.number_of_rooms }}</p>
                    <p><strong>Area:</strong> {{ house.area || 'N/A' }} m²</p>
                    <p><strong>Description:</strong> {{ house.description || 'No description available' }}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold">Contact Info</h2>
                    <p><strong>Name:</strong> {{ houseOwner.first_name }} {{ houseOwner.last_name }}</p>
                    <p><strong>Email:</strong> {{ houseOwner.email }}</p>
                    <p><strong>Phone:</strong> {{ houseOwner.number }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getHouseById } from '@/services/apiService';

export default {
    name: 'HouseDetail',
    data() {
        return {
            house: {},
            houseOwner: {}
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
                console.error('Failed to fetch house details:', response.message);
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    },
    methods: {
        getImageUrl(path) {
            return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
        }
    }
};
</script>

<style scoped>
.house-detail-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.house-detail-images-container {
    width: 100vw; /* Full width of the viewport */
    padding: 1rem;
    background-color: #f8f8f8; /* Light background to differentiate from info section */
}

.images-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem; /* Smaller gap between images */
    width: 100%;
}

.leading-image {
    grid-column: span 2;
    grid-row: span 2;
    position: relative;
    width: 100%;
    padding-bottom: 66.66%; /* Makes it a rectangle (2:3 ratio) */
    overflow: hidden;
    border-radius: 10px;
}

.leading-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.secondary-image {
    position: relative;
    width: 100%;
    padding-bottom: 66.66%; /* Adjusted to make them rectangles (2:3 ratio) */
    overflow: hidden;
    border-radius: 10px;
}

.secondary-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.house-detail-info-container {
    width: 75vw; /* 75% of the viewport width */
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 1rem; /* Ensure a gap between the images and info section */
}

.house-detail-header {
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.house-detail-info {
    margin-top: 20px;
}

.house-detail-info h2 {
    margin-bottom: 10px;
}

.house-detail-info p {
    margin-bottom: 5px;
}
</style>
