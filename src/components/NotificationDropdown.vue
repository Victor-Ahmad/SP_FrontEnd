<template>
    <div class="relative" @click="toggleDropdown">
        <svg class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405C18.79 15.79 18 14.195 18 12.5V9a6 6 0 10-12 0v3.5c0 1.695-.79 3.29-2.595 4.095L3 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <div v-if="isOpen" class="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul class="py-2">
                <li v-for="(notification, index) in notifications" :key="index" class="px-4 py-2 hover:bg-gray-100 cursor-pointer" :class="{'bg-gray-100': !notification.read}">
                    <div class="flex justify-between items-center">
                        <div class="font-bold">
                            <span v-if="!notification.read" class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {{ notification.title }}
                        </div>
                        <div class="text-sm text-gray-500">{{ notification.datetime }}</div>
                    </div>
                    <div class="text-sm">{{ notification.message }}</div>
                    <div class="flex space-x-2 mt-2">
                        <button class="bg-blue-500 text-white px-2 py-1 rounded" @click.stop="markAsRead(index)">Action 1</button>
                        <button class="bg-red-500 text-white px-2 py-1 rounded" @click.stop="deleteNotification(index)">Action 2</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            notifications: [
                { datetime: '2024-06-27 10:00', title: 'Notification 1', message: 'This is the message for notification 1', read: false },
                { datetime: '2024-06-27 11:00', title: 'Notification 2', message: 'This is the message for notification 2', read: true },
                { datetime: '2024-06-27 12:00', title: 'Notification 3', message: 'This is the message for notification 3', read: false },
                { datetime: '2024-06-27 13:00', title: 'Notification 4', message: 'This is the message for notification 4', read: true }
            ]
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        closeDropdown() {
            this.isOpen = false;
        },
        markAsRead(index) {
            this.notifications[index].read = true;
        },
        deleteNotification(index) {
            this.notifications.splice(index, 1);
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.closeDropdown();
            }
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        closeDropdown() {
            this.isOpen = false;
        },
        markAsRead(index) {
            this.notifications[index].read = true;
        },
        deleteNotification(index) {
            this.notifications.splice(index, 1);
        }
    }
};
</script>

<style scoped>
/* Add any custom styles here */
.bg-gray-100 {
    background-color: #f7fafc;
}

.bg-gray-200 {
    background-color: #edf2f7;
}

.hover\:bg-gray-100:hover {
    background-color: #f7fafc;
}

.bg-blue-500 {
    background-color: #4299e1;
}

.text-white {
    color: #ffffff;
}

.bg-red-500 {
    background-color: #f56565;
}

.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}

.rounded {
    border-radius: 0.25rem;
}
</style>
