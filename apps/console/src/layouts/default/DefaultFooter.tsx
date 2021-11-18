import {
  Box,
  Container,
  Typography,
  IconButton,
  Toolbar,
  Divider,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import useColorMode from '@/hooks/useColorMode'

export default function DefaultFooter() {
  const { colorMode } = useColorMode()

  return (
    <>
      <Container maxWidth="lg">
        <Divider />
        <Box py={4}>
          <Toolbar>
            <Box>
              <Typography
                variant="body2"
                color="secondary.main"
              >{`© ${new Date().getFullYear()} ELSOUL LABO B.V.`}</Typography>
            </Box>
            <div style={{ flexGrow: 1 }} />
            <Toolbar>
              <IconButton
                color="secondary"
                href={`https://github.com/elsoul`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub link"
              >
                <FontAwesomeIcon
                  color={colorMode === 'light' ? '#424242' : '#FFFFFF'}
                  icon={faGithub}
                  size="sm"
                  aria-label="GitHub icon"
                />
              </IconButton>
              <IconButton
                color="secondary"
                href={`https://twitter.com/ELSOUL_LABO`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter link"
              >
                <FontAwesomeIcon
                  color={colorMode === 'light' ? '#424242' : '#FFFFFF'}
                  icon={faTwitter}
                  size="sm"
                  aria-label="Twitter icon"
                />
              </IconButton>
            </Toolbar>
          </Toolbar>
        </Box>
      </Container>
    </>
  )
}
