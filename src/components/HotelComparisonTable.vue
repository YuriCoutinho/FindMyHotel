<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-emerald-500 text-white">
        <tr>
          <th class="p-3 border border-gray-300 text-left">Hotel</th>
          <th class="p-3 border border-gray-300 text-left">Preço</th>
          <th class="p-3 border border-gray-300 text-left">Estrelas</th>
          <th class="p-3 border border-gray-300 text-left">Comodidades</th>
          <th class="p-3 border border-gray-300 text-left">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hotel in hotels" :key="hotel.id" class="hover:bg-gray-100">
          <td class="p-3 border border-gray-300">{{ hotel.name }}</td>
          <td class="p-3 border border-gray-300">R$ {{ hotel.price }}</td>
          <td class="p-3 border border-gray-300">{{ hotel.stars }}</td>
          <td class="p-3 border border-gray-300">{{ hotel.amenities.join(', ') }}</td>
          <td class="p-3 border border-gray-300">
            <button @click="$emit('remove', hotel.id)" class="text-red-500 hover:text-red-700">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Hotel {
  id: string
  name: string
  price: number
  stars: number
  amenities: string[]
}

defineProps<{
  hotels: Hotel[]
}>()
</script>
