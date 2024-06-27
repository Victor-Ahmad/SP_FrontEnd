<template>
    <div v-if="house && house.one_to_one_swap_house">
        <HouseCard :house="house.one_to_one_swap_house" />
    </div>
</template>

<script>
import HouseCard from '@/components/HouseCard.vue';

export default {
    name: 'HouseCardWithSwap',
    components: {
        HouseCard
    },
    props: {
        house: {
            type: Object,
            required: true
        }
    }
};
</script>
