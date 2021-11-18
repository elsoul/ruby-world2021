import useMessage from '@/hooks/useMessage'
import { Snackbar, Alert } from '@mui/material'

export default function MessageSnackbar() {
  const { message, removeMessage } = useMessage()
  return (
    <>
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(message)}
          onClose={(_, reason) => {
            if (reason === 'clickaway') return
            removeMessage()
          }}
          message={message.body}
          key={message.body}
          autoHideDuration={3000}
        >
          <Alert
            sx={{ boxShadow: 2, fontWeight: 700, lineHeight: 1.6 }}
            severity={message.type || undefined}
            onClose={removeMessage}
          >
            {message.body}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
