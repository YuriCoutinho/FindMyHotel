<template>
  <div class="w-full max-w-screen-xl p-5 md:mx-auto">
    <SearchBar @search="searchHotels" />
    <LoadingSpinner v-if="searchIsLoading" />
    <div class="flex flex-wrap gap-4 mt-4" v-else-if="hotels.length">
      <SortOptions />
      <HotelCard v-for="hotel in hotels" :key="hotel.name" :hotel="hotel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHotelStore } from '@/stores/hotelStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SearchBar from '@/components/SearchBar.vue'
import HotelCard from '@/components/HotelCard.vue'
import SortOptions from '@/components/SortOptions.vue'

const hotelStore = useHotelStore()

const searchIsLoading = computed(() => hotelStore.getSearchIsLoading)
const hotels = computed(() => hotelStore.getHotels)

const searchHotels = () => {
  hotelStore.searchHotels()
}
</script>
