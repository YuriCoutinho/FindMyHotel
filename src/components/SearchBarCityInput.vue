<template>
  <AutoComplete
    v-model="selectedCity"
    :suggestions="filteredCities"
    :disabled="!enabled"
    inputClass="w-full md:w-40 text-gray-700 font-medium border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    panelClass="bg-white shadow-2xl rounded-lg mt-1 p-3 overflow-y-auto cursor-pointer"
    placeholder="Cidade de destino"
    forceSelection
    @complete="search"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AutoComplete from 'primevue/autocomplete'

import { useHotelStore } from '@/stores/hotelStore'

const hotelStore = useHotelStore()

const query = ref<string>('')

const enabled = computed(() => hotelStore.isCitySelectionEnabled)

const filteredCities = computed(() => {
  if (hotelStore.getCities.length === 0) return []
  return hotelStore.getCities.filter((city) =>
    city.toLowerCase().startsWith(query.value.toLowerCase())
  )
})

const selectedCity = computed({
  get: () => hotelStore.getSelectedCity,
  set: (value) => hotelStore.setCity(value)
})

const search = (event: { query: string }) => {
  query.value = event.query
}

const onBlur = () => {
  if (selectedCity.value) {
    hotelStore.setCity(selectedCity.value)
  }
}
</script>
