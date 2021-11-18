import type { ReactNode } from 'react'
import { useState, createContext, useCallback } from 'react'

export const MessageContext = createContext<MessageContext>({
  message: null,
  addMessage: () => {},
  removeMessage: () => {},
})

type Message = {
  type: 'success' | 'info' | 'warning' | 'error' | null | undefined
  body: string | null
}

type MessageContext = {
  message: Message | null
  addMessage: (type?: Message['type'], body?: string) => void
  removeMessage: () => void
}

type Props = {
  children: ReactNode
}

export default function MessageProvider({ children }: Props) {
  const [message, setMessage] = useState<Message | null>(null)

  const removeMessage = useCallback(() => setMessage(null), [setMessage])

  const addMessage = useCallback(
    (type: Message['type'], body: string) => setMessage({ type, body }),
    [setMessage]
  )

  const contextValue = {
    message,
    addMessage: useCallback(
      (type, body) => addMessage(type, body),
      [addMessage]
    ),
    removeMessage: useCallback(() => removeMessage(), [removeMessage]),
  }

  return (
    <>
      <MessageContext.Provider value={contextValue}>
        {children}
      </MessageContext.Provider>
    </>
  )
}
