import { useState } from "react"
import { Item, ItemId } from "../App"

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([])

  const addItem = (text: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text,
    }

    setItems(s => [...s, newItem])
  }

  const removeItem = (id: ItemId) => {
    setItems(s => s.filter(item => item.id !== id))
  }

  return {items, addItem,removeItem }
}
