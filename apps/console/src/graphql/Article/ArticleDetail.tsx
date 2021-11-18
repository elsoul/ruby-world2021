import { useCallback, useMemo } from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { DeleteRounded } from '@mui/icons-material'
import { graphql, usePreloadedQuery, useMutation } from 'react-relay'
import type { PreloadedQuery } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

import useDialog from '@/hooks/useDialog'
import useMessage from '@/hooks/useMessage'

import type { ArticleDetailMutation } from '@/__generated__/ArticleDetailMutation.graphql'
import type { ArticleDetailQuery } from '@/__generated__/ArticleDetailQuery.graphql'
import { showDate } from '@/utils/date'
import useColorMode from '@/hooks/useColorMode'

export const articleDetailQuery = graphql`
  query ArticleDetailQuery($id: String!) {
    article(id: $id) {
      id
      title
      body
      slug
      createdAt
      updatedAt
    }
  }
`

const mutation = graphql`
  mutation ArticleDetailMutation($input: DeleteArticleInput!) {
    deleteArticle(input: $input) {
      article {
        id
      }
    }
  }
`

type Props = {
  queryReference: PreloadedQuery<ArticleDetailQuery, Record<string, unknown>>
}

export default function ArticleDetail({ queryReference }: Props) {
  const { t } = useTranslation(['translation'])
  const navigate = useNavigate()
  const theme = useTheme()
  const [open, handleOpen, handleClose] = useDialog()
  const { addMessage } = useMessage()
  const { colorMode } = useColorMode()
  const data = usePreloadedQuery(articleDetailQuery, queryReference)
  const item = useMemo(() => data?.article, [data])

  const [commit, isInFlight] = useMutation<ArticleDetailMutation>(mutation)

  const handleDelete = useCallback(() => {
    if (item?.id) {
      commit({
        variables: { input: { id: item.id } },
        onCompleted: () => {
          addMessage('success', t('deleteSuccess'))
          navigate('/')
        },
        onError: () => {
          addMessage('error', t('deleteError'))
        },
        updater: (store) => {
          store.invalidateStore()
        },
      })
    }
  }, [item, commit, addMessage, navigate, t])

  return (
    <>
      <Container maxWidth="md">
        <Box pt={6}>
          <Typography variant="h4" color="secondary.dark" gutterBottom>
            {item?.title}
          </Typography>
        </Box>
        <Box py={6}>
          <Typography variant="body1" color="secondary.dark" gutterBottom>
            {item?.body}
          </Typography>
        </Box>
        <Box pt={16}>
          <Box
            sx={{
              borderRadius: '12px',
              background:
                colorMode === 'light' ? theme.palette.grey[50] : undefined,
            }}
            p={4}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box>
                  <Typography
                    variant="caption"
                    color="secondary.light"
                    gutterBottom
                  >
                    {t('articleSlug')}: {item?.slug}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box textAlign="right">
                  <Box>
                    <Typography
                      variant="caption"
                      color="secondary.light"
                      gutterBottom
                    >
                      {t('createdAt')}: {showDate(item?.createdAt as string)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="secondary.light"
                      gutterBottom
                    >
                      {t('updatedAt')}: {showDate(item?.updatedAt as string)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box pb={8}>
          <Box p={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}></Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box textAlign="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteRounded />}
                    onClick={handleOpen}
                  >
                    {t('delete')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ elevation: 0 }}
      >
        <Box p={2}>
          <DialogTitle>{t('deleteTitle')}</DialogTitle>
          <DialogContent>
            <Box mt={1}>
              <Typography variant="caption" color="error" gutterBottom>
                {t('cantBeUndone')}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={isInFlight}
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              {t('deleteConfirm')}
            </LoadingButton>
            <Button color="secondary" onClick={handleClose}>
              {t('deleteCancel')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
