<template>
  <form
    class="bg-white gap-4 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-row lg:justify-between"
  >
    <StateInput />
    <CityInput />
    <DateInputs />
    <GuestsInput />
    <RoomsInput />
  </form>

  <Button
    class="flex items-center w-32 bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-900 text-white font-medium rounded-lg gap-4 cursor-pointer mt-3 p-3"
    :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || searchIsLoading }"
    :disabled="!isFormValid || searchIsLoading"
    icon="pi pi-search"
    label="Buscar"
    @click="$emit('search')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHotelStore } from '@/stores/hotelStore'
import Button from 'primevue/button'

import StateInput from '@/components/SearchBarStateInput.vue'
import CityInput from '@/components/SearchBarCityInput.vue'
import DateInputs from '@/components/SearchBarDateInputs.vue'
import GuestsInput from '@/components/SearchBarGuestsInput.vue'
import RoomsInput from '@/components/SearchBarRoomsInput.vue'

const hotelStore = useHotelStore()
defineEmits(['search'])

const searchIsLoading = computed(() => hotelStore.getSearchIsLoading)
const isFormValid = computed(() => hotelStore.isFormValid)
</script>
