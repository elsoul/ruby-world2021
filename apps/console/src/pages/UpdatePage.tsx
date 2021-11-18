import { useCallback, useEffect, Suspense } from 'react'
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
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { useQueryLoader } from 'react-relay'

import useMessage from '@/hooks/useMessage'

import type { UpdateArticleQuery } from '@/__generated__/UpdateArticleQuery.graphql'
import SinglePageLoading from '@/components/loading/SinglePageLoading'
import UpdateArticle, {
  updateArticleQuery,
} from '@/graphql/Article/UpdateArticle'
import SinglePageErrorBoundary from '@/components/wrap/SinglePageErrorBoundary'

export default function DetailPage() {
  const { id } = useParams()
  const { t } = useTranslation(['translation'])
  const navigate = useNavigate()

  const { addMessage } = useMessage()

  const [queryReference, loadQuery] =
    useQueryLoader<UpdateArticleQuery>(updateArticleQuery)

  useEffect(() => {
    if (id) {
      loadQuery({ id })
    }
  }, [loadQuery, id])

  const handleNotExistError = useCallback(() => {
    addMessage('error', t('notExistId'))
    navigate('/')
  }, [t, addMessage, navigate])

  const handleNetworkError = useCallback(() => {
    addMessage('error', t('networkError'))
    navigate('/')
  }, [t, addMessage, navigate])

  if (queryReference == null) {
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
                  {t('updateArticleTitle')}
                </Typography>
              </Box>
              <div style={{ flexGrow: 1 }} />
            </Toolbar>
          </Box>
          <Box pt={2} pb={6}>
            <SinglePageLoading />
          </Box>
        </Container>
      </>
    )
  }

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
                {t('updateArticleTitle')}
              </Typography>
            </Box>
            <div style={{ flexGrow: 1 }} />
          </Toolbar>
        </Box>
        <Box pt={2} pb={6}>
          <Suspense fallback={<SinglePageLoading />}>
            <SinglePageErrorBoundary
              handleNetworkError={handleNetworkError}
              handleNotExistError={handleNotExistError}
            >
              <UpdateArticle queryReference={queryReference} />
            </SinglePageErrorBoundary>
          </Suspense>
        </Box>
      </Container>
    </>
  )
}
