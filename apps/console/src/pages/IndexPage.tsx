import { Container, Box, Typography, Toolbar, Button } from '@mui/material'
import { AddRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import SearchArticle from '@/graphql/Article/SearchArticle'

export default function IndexPage() {
  const { t } = useTranslation(['translation'])
  const navigate = useNavigate()
  return (
    <>
      <Container maxWidth="sm">
        <Box py={2}>
          <Toolbar>
            <Typography variant="h3">
              <span
                role="img"
                aria-label="Article"
                style={{ marginRight: '12px' }}
              >
                📃
              </span>
              {t('articles')}
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Button
              startIcon={<AddRounded />}
              variant="contained"
              onClick={() => {
                navigate('/create')
              }}
              color="secondary"
            >
              {t('createArticle')}
            </Button>
          </Toolbar>
        </Box>
        <Box pt={2} pb={6}>
          <SearchArticle />
        </Box>
      </Container>
    </>
  )
}
