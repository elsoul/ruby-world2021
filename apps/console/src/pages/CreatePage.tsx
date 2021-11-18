import {
  Container,
  Box,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Divider,
} from '@mui/material'
import { WestRounded } from '@mui/icons-material'
import CreateArticle from '@/graphql/Article/CreateArticle'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function CreatePage() {
  const { t } = useTranslation(['translation'])
  const navigate = useNavigate()

  return (
    <>
      <Container maxWidth="sm">
        <Box py={2}>
          <Toolbar>
            <Box mr={1}>
              <Tooltip title={t('goBack') || false}>
                <IconButton
                  color="secondary"
                  aria-label="Back"
                  edge="start"
                  onClick={() => navigate(-1)}
                >
                  <WestRounded />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box ml={2}>
              <Typography variant="h3">
                <span
                  role="img"
                  aria-label="Article"
                  style={{ marginRight: '12px' }}
                >
                  📃
                </span>
                {t('createArticleTitle')}
              </Typography>
            </Box>
            <div style={{ flexGrow: 1 }} />
          </Toolbar>
        </Box>
        <Box pt={2} pb={6}>
          <CreateArticle />
        </Box>
      </Container>
    </>
  )
}
