import { useContext } from 'react'
import { MessageContext } from '@/components/notifier/MessageProvider'

export default function useMessage() {
  const { message, addMessage, removeMessage } = useContext(MessageContext)
  return { message, addMessage, removeMessage }
}
