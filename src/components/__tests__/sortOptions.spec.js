import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import SortOptions from '@/components/SortOptions.vue'
import PrimeVue from 'primevue/config'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useHotelStore } from '@/stores/hotelStore'

describe('SortOptions.vue', () => {
  let sortHotelsByPriceAscMock,
    sortHotelsByPriceDescMock,
    sortHotelsByStarsAscMock,
    sortHotelsByStarsDescMock,
    resetHotelsMock

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    sortHotelsByPriceAscMock = vi.fn()
    sortHotelsByPriceDescMock = vi.fn()
    sortHotelsByStarsAscMock = vi.fn()
    sortHotelsByStarsDescMock = vi.fn()
    resetHotelsMock = vi.fn()

    const store = useHotelStore(pinia)
    store.sortHotelsByPriceAsc = sortHotelsByPriceAscMock
    store.sortHotelsByPriceDesc = sortHotelsByPriceDescMock
    store.sortHotelsByStarsAsc = sortHotelsByStarsAscMock
    store.sortHotelsByStarsDesc = sortHotelsByStarsDescMock
    store.resetHotels = resetHotelsMock
  })

  const createWrapper = () => {
    return mount(SortOptions, {
      global: {
        plugins: [PrimeVue],
        components: { Select, Button }
      }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should call the appropriate sort method when a sorting option is selected', async () => {
    const wrapper = createWrapper()
    const selectComponent = wrapper.findComponent(Select)

    await selectComponent.vm.$emit('update:modelValue', 'priceAsc')
    expect(sortHotelsByPriceAscMock).toHaveBeenCalled()

    await selectComponent.vm.$emit('update:modelValue', 'priceDesc')
    expect(sortHotelsByPriceDescMock).toHaveBeenCalled()

    await selectComponent.vm.$emit('update:modelValue', 'starsAsc')
    expect(sortHotelsByStarsAscMock).toHaveBeenCalled()

    await selectComponent.vm.$emit('update:modelValue', 'starsDesc')
    expect(sortHotelsByStarsDescMock).toHaveBeenCalled()
  })

  it('Should call resetHotels when reset button is clicked', async () => {
    const wrapper = createWrapper()
    const button = wrapper.findComponent(Button)

    await button.trigger('click')
    expect(resetHotelsMock).toHaveBeenCalled()
  })

  it('Should match the snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
