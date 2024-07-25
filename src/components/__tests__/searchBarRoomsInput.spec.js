import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import RoomsInput from '@/components/SearchBarRoomsInput.vue'
import PrimeVue from 'primevue/config'
import InputNumber from 'primevue/inputnumber'

describe('RoomsInput.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const createWrapper = () => {
    return mount(RoomsInput, {
      global: {
        plugins: [PrimeVue],
        components: { InputNumber }
      }
    })
  }

  it('Should renders the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should initializes with the correct value', () => {
    const wrapper = createWrapper()
    expect(wrapper.findComponent(InputNumber).props('modelValue')).toBe(1)
  })

  it('Should matches snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('updates the store when the input changes', async () => {
    const wrapper = createWrapper()
    const inputNumberComponent = wrapper.findComponent(InputNumber)
    await inputNumberComponent.setValue(3)
    expect(inputNumberComponent.props('modelValue')).toBe(3)
  })
})
