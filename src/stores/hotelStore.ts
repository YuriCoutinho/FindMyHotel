import { defineStore } from 'pinia'
import axios from 'axios'
import { hotels as initialHotels } from '@/utils/constants'

export const useHotelStore = defineStore('hotelStore', {
  state: () => ({
    selectedState: null as { name: string; abbreviation: string } | null,
    selectedCity: '' as string | null,
    cities: [] as string[],
    checkInDate: '' as string | null,
    checkOutDate: '' as string | null,
    guests: 1,
    rooms: 1,
    searchIsLoading: false as boolean,
    hotels: [] as any[],
    originalHotels: [] as any[]
  }),
  getters: {
    getSelectedState: (state) => state.selectedState,
    getSelectedCity: (state) => state.selectedCity,
    getCheckInDate: (state) => state.checkInDate,
    getCheckOutDate: (state) => state.checkOutDate,
    getGuests: (state) => state.guests,
    getRooms: (state) => state.rooms,
    getSearchIsLoading: (state) => state.searchIsLoading,
    getHotels: (state) => state.hotels,
    getCities: (state) => state.cities,
    isCitySelectionEnabled: (state) => state.cities.length > 0,
    isFormValid: (state) => {
      return (
        state.selectedState !== null &&
        state.selectedCity !== '' &&
        state.checkInDate !== '' &&
        state.checkOutDate !== '' &&
        state.guests > 0 &&
        state.rooms > 0
      )
    }
  },
  actions: {
    setState(state: { name: string; abbreviation: string } | null) {
      this.selectedState = state
      if (state) {
        this.searchCities(state.abbreviation)
      }
    },
    setCity(city: string | null) {
      this.selectedCity = city
    },
    setCheckInDate(checkInDate: string | null) {
      this.checkInDate = checkInDate
    },
    setCheckOutDate(checkOutDate: string | null) {
      this.checkOutDate = checkOutDate
    },
    setGuests(selectedGuests: number) {
      this.guests = selectedGuests
    },
    setRooms(selectedRooms: number) {
      this.rooms = selectedRooms
    },
    setSearchIsLoading(searchIsLoading: boolean) {
      this.searchIsLoading = searchIsLoading
    },
    setHotels(hotels: any[]) {
      this.hotels = hotels
    },
    sortHotelsByPriceAsc() {
      const sortedHotels = [...this.hotels].sort((a, b) => a.price - b.price)
      this.setHotels(sortedHotels)
    },
    sortHotelsByPriceDesc() {
      const sortedHotels = [...this.hotels].sort((a, b) => b.price - a.price)
      this.setHotels(sortedHotels)
    },
    sortHotelsByStarsAsc() {
      const sortedHotels = [...this.hotels].sort((a, b) => a.stars - b.stars)
      this.setHotels(sortedHotels)
    },
    sortHotelsByStarsDesc() {
      const sortedHotels = [...this.hotels].sort((a, b) => b.stars - a.stars)
      this.setHotels(sortedHotels)
    },
    resetHotels() {
      this.setHotels([...this.originalHotels])
    },
    async searchCities(stateAbbreviation: string) {
      this.selectedCity = null
      this.cities = []
      if (stateAbbreviation) {
        try {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbreviation}/municipios`
          )
          this.cities = response.data.map((municipality: any) => municipality.nome)
        } catch (error) {
          console.error('Error fetching municipalities:', error)
          this.cities = []
        }
      }
    },
    async searchHotels() {
      this.setSearchIsLoading(true)
      try {
        setTimeout(() => {
          this.hotels = [...initialHotels]
          this.originalHotels = [...initialHotels]
          this.setSearchIsLoading(false)
        }, 3000)
      } catch (error) {
        console.error('Error searching hotels:', error)
        this.setSearchIsLoading(false)
      }
    }
  }
})
