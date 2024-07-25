import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Alert from '@/components/AlertMessage.vue'

describe('Alert.vue', () => {
  const createWrapper = (type = 'info', slotContent = 'Alerta de exemplo') => {
    return mount(Alert, {
      props: { type },
      slots: { default: slotContent }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should display the correct title for success type', () => {
    const wrapper = createWrapper('success')
    expect(wrapper.find('strong').text()).toBe('Sucesso!')
  })

  it('Should display the correct title for error type', () => {
    const wrapper = createWrapper('error')
    expect(wrapper.find('strong').text()).toBe('Erro!')
  })

  it('Should display the correct title for info type', () => {
    const wrapper = createWrapper('info')
    expect(wrapper.find('strong').text()).toBe('')
  })

  it('Should apply the correct classes for success type', () => {
    const wrapper = createWrapper('success')
    expect(wrapper.classes()).toContain('bg-green-100')
    expect(wrapper.classes()).toContain('border-green-400')
    expect(wrapper.classes()).toContain('text-green-700')
  })

  it('Should apply the correct classes for error type', () => {
    const wrapper = createWrapper('error')
    expect(wrapper.classes()).toContain('bg-red-100')
    expect(wrapper.classes()).toContain('border-red-400')
    expect(wrapper.classes()).toContain('text-red-700')
  })

  it('Should apply the correct classes for info type', () => {
    const wrapper = createWrapper('info')
    expect(wrapper.classes()).toContain('bg-blue-100')
    expect(wrapper.classes()).toContain('border-blue-400')
    expect(wrapper.classes()).toContain('text-blue-700')
  })

  it('Should render the default slot content', () => {
    const slotContent = 'Este é um alerta'
    const wrapper = createWrapper('info', slotContent)
    expect(wrapper.text()).toContain(slotContent)
  })
})
