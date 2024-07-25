import { defineStore } from 'pinia'

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    selectedHotel: null as any | null,
  }),
  getters: {
    getSelectedHotel: (state) => state.selectedHotel,
  },
  actions: {
    setSelectedHotel(hotel: any) {
      this.selectedHotel = hotel
    }
  }
})
