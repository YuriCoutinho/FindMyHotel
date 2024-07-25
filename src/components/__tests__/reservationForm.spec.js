import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ReservationForm from '@/components/ReservationForm.vue'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Button from 'primevue/button'

describe('ReservationForm.vue', () => {
  const createWrapper = () => {
    return mount(ReservationForm, {
      global: {
        plugins: [PrimeVue],
        components: { InputText, InputMask, Button }
      }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should initialize form fields correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.firstName).toBe('')
    expect(wrapper.vm.lastName).toBe('')
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.phoneNumber).toBe('')
    expect(wrapper.vm.documentNumber).toBe('')
    expect(wrapper.vm.payment).toBe('')
    expect(wrapper.vm.cvv).toBe('')
  })

  it('Should match the snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
