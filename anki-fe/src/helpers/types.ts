export interface Card {
  word: string
  translate: string
  createdBy: string
  description: string
  _id: string
}

export interface Group {
  _id: string
  groupName: string
  createdBy: string
  cards: Card[]
}

export interface User {
  id: number
  username: string
  role: string
}
