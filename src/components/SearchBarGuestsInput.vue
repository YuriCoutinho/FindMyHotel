<template>
  <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
    <label for="guests">Hóspedes</label>
    <InputNumber
      id="guests"
      v-model="guests"
      :min="1"
      :max="6"
      class="w-32 md:w-8 border rounded-lg"
      inputClass="w-full text-gray-700 font-medium  pl-2 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHotelStore } from '@/stores/hotelStore'

import InputNumber from 'primevue/inputnumber'

const hotelStore = useHotelStore()

const guests = computed({
  get: () => hotelStore.getGuests,
  set: (value: number) => hotelStore.setGuests(value)
})
</script>
