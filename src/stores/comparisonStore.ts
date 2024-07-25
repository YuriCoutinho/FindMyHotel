import { defineStore } from 'pinia'

export const useComparisonStore = defineStore('comparisonStore', {
  state: () => ({
    hotelsToCompare: [] as any[]
  }),
  actions: {
    addHotel(hotel: any) {
      if (!this.hotelsToCompare.find((h) => h.id === hotel.id)) {
        this.hotelsToCompare.push(hotel)
      }
    },
    removeHotel(hotelId: string) {
      this.hotelsToCompare = this.hotelsToCompare.filter((hotel) => hotel.id !== hotelId)
    }
  }
})
