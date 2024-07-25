<template>
  <AutoComplete
    inputClass="w-full md:w-40 text-gray-700 font-medium border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    panelClass="bg-white shadow-2xl rounded-lg mt-1 p-3 cursor-pointer"
    optionLabel="name"
    placeholder="Estado de destino"
    forceSelection
    :suggestions="filteredStates"
    v-model="selectedState"
    @complete="search"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import { useHotelStore } from '@/stores/hotelStore'
import { brazilStates } from '@/utils/constants'

interface State {
  name: string
  abbreviation: string
}

const hotelStore = useHotelStore()

const filteredStates = ref<State[]>([])

const selectedState = computed<State | null>({
  get: () => hotelStore.getSelectedState,
  set: (state: State | null) => hotelStore.setState(state)
})

const search = (event: { query: string }) => {
  const query = event.query.toLowerCase()
  filteredStates.value = brazilStates.filter((state) => state.name.toLowerCase().startsWith(query))
}

const onBlur = () => {
  if (selectedState.value) {
    hotelStore.setState(selectedState.value)
  }
}
</script>
