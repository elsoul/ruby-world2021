import { useEffect, useCallback, Suspense } from 'react'
import {
  Container,
  Box,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Divider,
  Button,
} from '@mui/material'
import { WestRounded, EditRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { useQueryLoader } from 'react-relay'

import useMessage from '@/hooks/useMessage'

import type { ArticleDetailQuery } from '@/__generated__/ArticleDetailQuery.graphql'
import SinglePageLoading from '@/components/loading/SinglePageLoading'
import ArticleDetail, {
  articleDetailQuery,
} from '@/graphql/Article/ArticleDetail'
import SinglePageErrorBoundary from '@/components/wrap/SinglePageErrorBoundary'

export default function DetailPage() {
  const { t } = useTranslation(['translation'])
  const navigate = useNavigate()
  const { id } = useParams()
  const { addMessage } = useMessage()
  const [queryReference, loadQuery] =
    useQueryLoader<ArticleDetailQuery>(articleDetailQuery)

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
                  {t('articleDetailTitle')}
                </Typography>
              </Box>
              <div style={{ flexGrow: 1 }} />
              <Button
                startIcon={<EditRounded />}
                variant="contained"
                onClick={() => {
                  navigate(`/update/${id}`)
                }}
                color="secondary"
              >
                {t('updateArticle')}
              </Button>
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
                {t('articleDetailTitle')}
              </Typography>
            </Box>
            <div style={{ flexGrow: 1 }} />
            <Button
              startIcon={<EditRounded />}
              variant="contained"
              onClick={() => {
                navigate(`/update/${id}`)
              }}
              color="secondary"
            >
              {t('updateArticle')}
            </Button>
          </Toolbar>
        </Box>
        <Box pt={2} pb={6}>
          <Suspense fallback={<SinglePageLoading />}>
            <SinglePageErrorBoundary
              handleNetworkError={handleNetworkError}
              handleNotExistError={handleNotExistError}
            >
              <ArticleDetail queryReference={queryReference} />
            </SinglePageErrorBoundary>
          </Suspense>
        </Box>
      </Container>
    </>
  )
}
