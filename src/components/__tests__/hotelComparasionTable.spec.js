import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HotelComparisonTable from '@/components/HotelComparisonTable.vue'

describe('HotelTable.vue', () => {
  const mockHotels = [
    {
      id: '1',
      name: 'Hotel Example 1',
      price: 150,
      stars: 4,
      amenities: ['Wi-Fi', 'Breakfast', 'Pool']
    },
    {
      id: '2',
      name: 'Hotel Example 2',
      price: 250,
      stars: 5,
      amenities: ['Wi-Fi', 'Spa', 'Gym']
    }
  ]

  const createWrapper = (hotels = mockHotels) => {
    return mount(HotelComparisonTable, {
      props: { hotels }
    })
  }

  it('Should render the component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should display hotel information correctly', () => {
    const wrapper = createWrapper()
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockHotels.length)

    mockHotels.forEach((hotel, index) => {
      const columns = rows[index].findAll('td')
      expect(columns[0].text()).toBe(hotel.name)
      expect(columns[1].text()).toContain(hotel.price.toString())
      expect(columns[2].text()).toBe(hotel.stars.toString())
      expect(columns[3].text()).toBe(hotel.amenities.join(', '))
    })
  })

  it('Should emit "remove" event with hotel id when remove button is clicked', async () => {
    const wrapper = createWrapper()
    const removeButton = wrapper.findAll('button').at(0)

    await removeButton.trigger('click')

    expect(wrapper.emitted('remove')).toHaveLength(1)
    expect(wrapper.emitted('remove')[0]).toEqual([mockHotels[0].id])
  })

  it('Should match the snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
