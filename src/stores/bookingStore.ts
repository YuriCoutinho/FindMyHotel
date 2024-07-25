import { defineStore } from 'pinia'

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    selectedHotel: null as any | null,
    paymentIsLoading: false as boolean,
    reservationSuccess: false as boolean
  }),
  getters: {
    getSelectedHotel: (state) => state.selectedHotel,
    getPaymentIsLoading: (state) => state.paymentIsLoading,
    getReservationSuccess: (state) => state.reservationSuccess
  },
  actions: {
    setSelectedHotel(hotel: any) {
      this.selectedHotel = hotel
      this.reservationSuccess = false
    },
    setPaymentIsLoading(paymentIsLoading: boolean) {
      this.paymentIsLoading = paymentIsLoading
    },
    setReservationSuccess(success: boolean) {
      this.reservationSuccess = success
    },
    reserve(reservationDetails: any) {
      this.setPaymentIsLoading(true)
      try {
        setTimeout(() => {
          console.log('Reserva processada para:', reservationDetails)
          this.setReservationSuccess(true)
          this.setPaymentIsLoading(false)
        }, 3000)
      } catch (error) {
        console.error('Error in reservation:', error)
        this.setPaymentIsLoading(false)
      }
    }
  }
})
