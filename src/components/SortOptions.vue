<template>
  <div class="flex items-center justify-between w-full">
    <Select
      class="w-44 flex items-center justify-between px-3 py-2 cursor-pointer border border-gray-300 rounded-lg"
      inputClass="w-38 text-gray-700 font-medium focus:outline-none"
      panelClass="bg-white shadow-xl rounded-lg mt-1 p-3 cursor-pointer "
      optionLabel="label"
      optionValue="value"
      placeholder="Ordenar por"
      :options="options"
      v-model="selectedOption"
    />

    <Button
      @click="resetHotels"
      label="Resetar ordem"
      icon="pi pi-refresh"
      class="flex items-center gap-2 px-3 py-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-400 active:bg-gray-500"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Select from 'primevue/select'
import Button from 'primevue/button'

import { useHotelStore } from '@/stores/hotelStore'

const hotelStore = useHotelStore()

interface Option {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Menores preços', value: 'priceAsc' },
  { label: 'Maiores preços', value: 'priceDesc' },
  { label: 'Menos estrelas', value: 'starsAsc' },
  { label: 'Mais estrelas', value: 'starsDesc' }
]

const selectedOption = ref<string>('')

watch(selectedOption, (newValue) => {
  sortHotels(newValue)
})

const sortHotels = (value: string) => {
  switch (value) {
    case 'priceAsc':
      hotelStore.sortHotelsByPriceAsc()
      break
    case 'priceDesc':
      hotelStore.sortHotelsByPriceDesc()
      break
    case 'starsAsc':
      hotelStore.sortHotelsByStarsAsc()
      break
    case 'starsDesc':
      hotelStore.sortHotelsByStarsDesc()
      break
  }
}

const resetHotels = () => {
  hotelStore.resetHotels()
  selectedOption.value = ''
}
</script>
