<template>
    <div class="w-full max-w-screen-xl p-5 md:mx-auto">
      <AlertMessage v-if="!hotelsToCompare.length" type="info">
        Sem hotéis para comparar :( <br />
        <RouterLink to="/" class="text-green-800 underline">Voltar para a busca</RouterLink>
      </AlertMessage>
      <template v-else>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Comparação de Hotéis</h2>
        <HotelComparisonTable :hotels="hotelsToCompare" @remove="removeHotel" />
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  
  import { useComparisonStore } from '@/stores/comparisonStore'
  import AlertMessage from '@/components/AlertMessage.vue'
  import HotelComparisonTable from '@/components/HotelComparisonTable.vue'
  
  const comparisonStore = useComparisonStore()
  const hotelsToCompare = computed(() => comparisonStore.hotelsToCompare)
  
  function removeHotel(hotelId: string) {
    comparisonStore.removeHotel(hotelId)
  }
  </script>
  