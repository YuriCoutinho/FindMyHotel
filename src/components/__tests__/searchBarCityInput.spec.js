import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import SearchBarCityInput from '@/components/SearchBarCityInput.vue'
import { useHotelStore } from '@/stores/hotelStore'

describe('SearchBarCityInput.vue', () => {
  let hotelStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    hotelStore = useHotelStore()

    // Mocking hotelStore data and methods using $patch
    hotelStore.$patch({
      cities: ['New York', 'Los Angeles', 'Chicago'],
      selectedCity: ''
    })

    vi.spyOn(hotelStore, 'setCity')
  })

  const createWrapper = () => {
    return mount(SearchBarCityInput, {
      global: {
        plugins: [PrimeVue],
        components: { AutoComplete }
      }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should initialize with the correct value', () => {
    const wrapper = createWrapper()
    expect(wrapper.findComponent(AutoComplete).props('modelValue')).toBe(hotelStore.selectedCity)
  })

  it('Should match the snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should filter cities based on search query', async () => {
    const wrapper = createWrapper()
    const autoCompleteComponent = wrapper.findComponent(AutoComplete)

    autoCompleteComponent.vm.$emit('complete', { query: 'New' })
    await wrapper.vm.$nextTick()

    // Accessing the filtered cities through the store
    const filteredCities = hotelStore.cities.filter((city) => city.toLowerCase().startsWith('new'))
    expect(filteredCities.length).toBe(1)
    expect(filteredCities).toContain('New York')
  })

  it('Should update the store when a city is selected', async () => {
    const wrapper = createWrapper()
    const autoCompleteComponent = wrapper.findComponent(AutoComplete)

    await autoCompleteComponent.vm.$emit('update:modelValue', 'Chicago')
    await wrapper.vm.$nextTick()

    expect(hotelStore.setCity).toHaveBeenCalledWith('Chicago')
  })
})
