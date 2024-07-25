import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import StateInput from '@/components/SearchBarStateInput.vue'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import { brazilStates } from '@/utils/constants'

describe('StateInput.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const createWrapper = () => {
    return mount(StateInput, {
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
    expect(wrapper.findComponent(AutoComplete).props('modelValue')).toBe(null)
  })

  it('Should matches snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should filter states based on search query', async () => {
    const wrapper = createWrapper()
    const autoCompleteComponent = wrapper.findComponent(AutoComplete)
    autoCompleteComponent.vm.$emit('complete', { query: 'São' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredStates.length).toBeGreaterThan(0)
    expect(wrapper.vm.filteredStates[0].name).toContain('São')
  })

  it('Should update the store when a state is selected', async () => {
    const wrapper = createWrapper()
    const autoCompleteComponent = wrapper.findComponent(AutoComplete)

    autoCompleteComponent.vm.$emit('update:modelValue', brazilStates[0])
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedState).toStrictEqual(brazilStates[0])
  })
})
