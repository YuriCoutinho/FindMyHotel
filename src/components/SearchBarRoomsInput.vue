<template>
  <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
    <label for="rooms">Quartos</label>
    <InputNumber
      id="rooms"
      v-model="rooms"
      :min="1"
      :max="6"
      class="w-32 md:w-8 border rounded-lg"
      inputClass="w-full text-gray-700 font-medium  pl-2 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InputNumber from 'primevue/inputnumber'

import { useHotelStore } from '@/stores/hotelStore'

const hotelStore = useHotelStore()

const rooms = computed({
  get: () => hotelStore.getRooms,
  set: (value: number) => hotelStore.setRooms(value)
})
</script>
