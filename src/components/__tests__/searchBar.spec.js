import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import SearchBar from '@/components/SearchBar.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'

describe('SearchBar.vue', () => {
  let searchHotelsMock

  beforeEach(() => {
    setActivePinia(createPinia())
    searchHotelsMock = vi.fn()
  })

  const createWrapper = (formValid = true, loading = false) => {
    return mount(SearchBar, {
      global: {
        plugins: [PrimeVue],
        components: { Button },
        mocks: {
          $pinia: {
            getters: {
              isFormValid: () => formValid,
              getSearchIsLoading: () => loading
            },
            actions: {
              searchHotels: searchHotelsMock
            }
          }
        }
      }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should have a disabled button when form is invalid', () => {
    const wrapper = createWrapper(false)
    const button = wrapper.findComponent(Button)
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('Should have an enabled button when form is valid', () => {
    const wrapper = createWrapper(true)
    const button = wrapper.findComponent(Button)
    expect(button.attributes('disabled')).toBeFalsy()
  })
})
