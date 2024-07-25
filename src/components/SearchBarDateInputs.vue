<template>
  <div class="flex flex-row items-center gap-4 justify-between md:justify-start">
    <label for="CheckIn">CheckIn</label>
    <InputMask
      id="CheckIn"
      v-model="checkIn"
      mask="99/99/9999"
      placeholder="dd/mm/yyyy"
      :class="[
        'w-32 text-gray-700 font-medium focus:outline-none focus:ring-1 border rounded-lg px-3 py-2',
        checkInInvalid ? 'border-red-500 focus:ring-red-500' : 'focus:ring-emerald-500'
      ]"
      @blur="validateCheckInDate"
    />
  </div>

  <div class="flex flex-row items-center gap-4 justify-between md:justify-start">
    <label for="CheckOut">CheckOut</label>
    <InputMask
      id="CheckOut"
      v-model="checkOut"
      mask="99/99/9999"
      placeholder="dd/mm/yyyy"
      :class="[
        'w-32 text-gray-700 font-medium focus:outline-none focus:ring-1 border rounded-lg px-3 py-2',
        checkOutInvalid ? 'border-red-500 focus:ring-red-500' : 'focus:ring-emerald-500'
      ]"
      @blur="validateCheckOutDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputMask from 'primevue/inputmask'

import { useHotelStore } from '@/stores/hotelStore'

const hotelStore = useHotelStore()

const checkIn = computed({
  get: () => hotelStore.getCheckInDate ?? '',
  set: (value: string) => hotelStore.setCheckInDate(value)
})

const checkOut = computed({
  get: () => hotelStore.getCheckOutDate ?? '',
  set: (value: string) => hotelStore.setCheckOutDate(value)
})

const checkInInvalid = ref(false)
const checkOutInvalid = ref(false)

const validateDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 10) return false
  const [day, month, year] = dateStr.split('/').map(Number)
  return day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 2024
}

const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

const validateCheckInDate = () => {
  const isValid = validateDate(checkIn.value)
  checkInInvalid.value = !isValid
  if (!isValid) {
    hotelStore.setCheckInDate('')
  }
  validateCheckOutDate()
}

const validateCheckOutDate = () => {
  const isValid = validateDate(checkOut.value)
  const checkInDate = parseDate(checkIn.value)
  const checkOutDate = parseDate(checkOut.value)

  if (isValid && checkInDate && checkOutDate && checkOutDate <= checkInDate) {
    checkOutInvalid.value = true
    hotelStore.setCheckOutDate('')
  } else {
    checkOutInvalid.value = !isValid
    if (!isValid) {
      hotelStore.setCheckOutDate('')
    }
  }
}
</script>
