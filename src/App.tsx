import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

const getControl = (control: unknown): HTMLInputElement | undefined => {
  if (!(control instanceof HTMLInputElement)) return undefined
  return control
}

function App() {
  const { items, addItem, removeItem } = useItems()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const itemInput = getControl(form.elements.namedItem('item'))
    if (!itemInput) return

    addItem(itemInput.value)
    form.reset()
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <form onSubmit={handleSubmit} aria-label='Add elements to list'>
          <label>
            New Element
          </label>
          <input
            required
            name='item'
            type='text'
            placeholder='E.g: Videogames'
          />
          <button type='submit'>Add element to list</button>
        </form>
      </aside>
      <section>
        <h2>Your list</h2>
        {!items.length ?
          <p>Your list is empty</p>
          :
          <ul>
            {items.map(item => (
              <Item {...item} key={item.id} handleRemove={createHandleRemoveItem(item.id)} />
            ))}
          </ul>
        }
      </section>
    </main>
  )
}

export default App
