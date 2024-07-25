<template>
  <div class="w-full max-w-screen-xl p-5 md:mx-auto">
    <LoadingSpinner v-if="isPaymentLoading" />

    <template v-else-if="reservationSuccess">
      <AlertMessage type="success">
        Estamos processando sua reserva. <br />
        Não se preocupe, um email de atualização será enviado para {{ email }}.
      </AlertMessage>
      <RouterLink
        to="/"
        class="mt-4 inline-block font-medium text-gray-700 underline hover:text-gray-900"
      >
        Escolha outro hotel
      </RouterLink>
    </template>

    <template v-else-if="hotel">
      <h2 class="mb-4 text-2xl font-semibold text-green-600">Reserva para {{ hotel.name }}</h2>

      <ReservationForm @reserve="handleReservation" />

      <RouterLink
        to="/"
        class="mt-4 inline-block font-medium text-gray-700 underline hover:text-gray-900"
      >
        Escolha outro hotel
      </RouterLink>
    </template>

    <AlertMessage v-else type="error">
      Hotel não encontrado. <br />Por favor, retorne e selecione um hotel válido.
      <RouterLink to="/" class="text-green-800 underline">Voltar</RouterLink>
    </AlertMessage>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useBookingStore } from '@/stores/bookingStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ReservationForm from '@/components/ReservationForm.vue'
import AlertMessage from '@/components/AlertMessage.vue'

const bookingStore = useBookingStore()
const hotel = bookingStore.getSelectedHotel
const email = ref('')

const isPaymentLoading = computed(() => bookingStore.getPaymentIsLoading)
const reservationSuccess = computed(() => bookingStore.getReservationSuccess)

const handleReservation = (reservationDetails: any) => {
  bookingStore.reserve(reservationDetails)
  email.value = reservationDetails.email
}
</script>
