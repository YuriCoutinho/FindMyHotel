<template>
  <div
    class="flex w-full bg-white text-gray-800 border border-gray-300 rounded-lg overflow-hidden mb-4 flex-col md:flex-row transition-transform duration-200 hover:transform hover:-translate-y-1"
  >
    <img :src="hotel.image" alt="Hotel image" class="w-full md:w-48 object-cover" loading="lazy" />
    <div class="p-4 flex-1">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-2xl">{{ hotel.name }}</h3>
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="isSelected"
            @change="toggleCompare"
            class="form-checkbox h-5 w-5 text-emerald-500 cursor-pointer"
          />
          <label class="ml-2 text-gray-600">Comparar</label>
        </div>
      </div>
      <p class="mb-2">{{ hotel.stars }} estrelas</p>
      <p class="text-xl font-bold mb-2">R$ {{ hotel.price }}</p>
      <p class="mb-2">Check-in: {{ hotel.checkin }} | Check-out: {{ hotel.checkout }}</p>
      <Button
        label="Contratar"
        @click="goToBooking"
        class="w-full md:w-28 bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-900 text-white font-medium rounded-lg cursor-pointer p-3 mt-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'
import { useComparisonStore } from '@/stores/comparisonStore'
import Button from 'primevue/button'

interface Hotel {
  id: string
  image: string
  name: string
  stars: number
  price: number
  checkin: string
  checkout: string
}

const props = defineProps<{
  hotel: Hotel
}>()

const router = useRouter()
const bookingStore = useBookingStore()
const comparisonStore = useComparisonStore()

const isSelected = computed(() => comparisonStore.hotelsToCompare.includes(props.hotel))

const goToBooking = () => {
  bookingStore.setSelectedHotel(props.hotel)
  router.push({ name: 'booking' })
}

const toggleCompare = () => {
  if (isSelected.value) {
    comparisonStore.removeHotel(props.hotel.id)
  } else {
    comparisonStore.addHotel(props.hotel)
  }
}
</script>
