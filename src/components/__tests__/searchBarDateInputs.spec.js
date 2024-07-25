import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'
import InputMask from 'primevue/inputmask'
import DateInputs from '@/components/SearchBarDateInputs.vue'
import { useHotelStore } from '@/stores/hotelStore'

describe('DateInputs.vue', () => {
  let hotelStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    hotelStore = useHotelStore()
  })

  const createWrapper = () => {
    return mount(DateInputs, {
      global: {
        plugins: [PrimeVue],
        components: { InputMask }
      }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should initialize with the correct values', () => {
    const wrapper = createWrapper()
    const checkInComponent = wrapper.findAllComponents(InputMask)[0]
    const checkOutComponent = wrapper.findAllComponents(InputMask)[1]

    expect(checkInComponent.props('modelValue')).toBe(hotelStore.getCheckInDate || '')
    expect(checkOutComponent.props('modelValue')).toBe(hotelStore.getCheckOutDate || '')
  })

  it('Should match the snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should update the store when check-in date is changed', async () => {
    const wrapper = createWrapper()
    const checkInComponent = wrapper.findAllComponents(InputMask)[0]

    await checkInComponent.setValue('12/12/2024')
    await wrapper.vm.$nextTick()

    expect(hotelStore.getCheckInDate).toBe('12/12/2024')
  })

  it('Should update the store when check-out date is changed', async () => {
    const wrapper = createWrapper()
    const checkOutComponent = wrapper.findAllComponents(InputMask)[1]

    await checkOutComponent.setValue('13/12/2024')
    await wrapper.vm.$nextTick()

    expect(hotelStore.getCheckOutDate).toBe('13/12/2024')
  })
})
