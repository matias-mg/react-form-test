import { describe, test, expect, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import App from '../App'

afterEach(() => {
  cleanup()
})

describe('<App />', () => {
  test('should render', () => {
    render(<App />)
    screen.debug()

    expect(
      screen.getByText('New Element')
    ).toBeDefined()
  })

  test('should add and remove items', async () => {
    const itemRandomText = crypto.randomUUID()
    const noResultsText = 'Your list is empty'
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    const button = screen.getByRole('button')
    expect(button).toBeDefined()

    await user.type(input, itemRandomText)
    await user.click(button)

    const list = screen.getByRole('list')
    expect(list).toBeDefined()
    expect(list.childNodes.length).toBe(1)

    const item = screen.getByText(itemRandomText)
    expect(item).toBeDefined()

    const removeButton = item.querySelector('button')
    expect(removeButton).toBeDefined()
    await user.click(removeButton!)

    const noResults = screen.getByText(noResultsText)
    expect(noResults).toBeDefined()
  })
})
