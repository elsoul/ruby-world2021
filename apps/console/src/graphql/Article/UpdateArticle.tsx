import { useCallback, useMemo } from 'react'
import { Container, Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { usePreloadedQuery, useMutation, graphql } from 'react-relay'
import type { PreloadedQuery } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'

import type { UpdateArticleMutation } from '@/__generated__/UpdateArticleMutation.graphql'
import type { UpdateArticleQuery } from '@/__generated__/UpdateArticleQuery.graphql'
import useMessage from '@/hooks/useMessage'

export const updateArticleQuery = graphql`
  query UpdateArticleQuery($id: String!) {
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
  mutation UpdateArticleMutation($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      articleEdge {
        node {
          id
          title
          body
          slug
          createdAt
          updatedAt
        }
      }
    }
  }
`

const titleMaxString = 100
const bodyMaxString = 1000
const slugMaxString = 100

const schema = z.object({
  title: z.string().max(titleMaxString).nonempty({ message: 'Required' }),
  body: z.string().max(bodyMaxString).nonempty({ message: 'Required' }),
  slug: z.string().max(slugMaxString).nonempty({ message: 'Required' }),
})

type UpdateArticleInput = {
  title: string
  body: string
  slug: string
}

type Props = {
  queryReference: PreloadedQuery<UpdateArticleQuery, Record<string, unknown>>
}

export default function UpdateArticle({ queryReference }: Props) {
  const { t } = useTranslation(['translation'])
  const { addMessage } = useMessage()
  const navigate = useNavigate()

  const data = usePreloadedQuery<UpdateArticleQuery>(
    updateArticleQuery,
    queryReference
  )

  const article = useMemo(() => {
    return data && data.article
      ? {
          id: data.article.id,
          title: data.article.title ?? '',
          body: data.article.body ?? '',
          slug: data.article.slug ?? '',
        }
      : {
          title: '',
          body: '',
          slug: '',
        }
  }, [data])

  const [commit, isInFlight] = useMutation<UpdateArticleMutation>(mutation)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateArticleInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article.title,
      body: article.body,
      slug: article.slug,
    },
  })

  const onSubmit = useCallback(
    (input: UpdateArticleInput) => {
      if (article.id) {
        commit({
          variables: {
            input: {
              ...input,
              id: article.id,
            },
          },
          onCompleted: () => {
            addMessage('success', t('updateSuccess'))
            navigate(-1)
          },
          onError: (err) => {
            console.log(err)
            if (err.message.includes('duplicate')) {
              return addMessage('error', t('duplicateNameError'))
            }
            addMessage('error', t('updateError'))
          },
        })
      }
    },
    [commit, article, addMessage, t, navigate]
  )

  const titleErrorHelperText = useCallback(
    (error: FieldError | undefined) => {
      if (!error) return ''
      if (error.type === 'too_big') {
        return t('tooLongMessage', { length: titleMaxString })
      }
      if (error.type === 'too_small') {
        return t('requiredMessage')
      }
      return t('pleaseCheckValue')
    },
    [t]
  )

  const bodyErrorHelperText = useCallback(
    (error: FieldError | undefined) => {
      if (!error) return ''
      if (error.type === 'too_big') {
        return t('tooLongMessage', { length: bodyMaxString })
      }
      if (error.type === 'too_small') {
        return t('requiredMessage')
      }
      return t('pleaseCheckValue')
    },
    [t]
  )

  const slugErrorHelperText = useCallback(
    (error: FieldError | undefined) => {
      if (!error) return ''
      if (error.type === 'too_big') {
        return t('tooLongMessage', { length: slugMaxString })
      }
      if (error.type === 'too_small') {
        return t('requiredMessage')
      }
      return t('pleaseCheckValue')
    },
    [t]
  )

  const handleUserKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit(onSubmit)()
      }
    },
    [handleSubmit, onSubmit]
  )

  return (
    <>
      <Container maxWidth="md" disableGutters>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box py={2}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label={t('articleTitle')}
                  margin="normal"
                  error={!!errors.title}
                  helperText={titleErrorHelperText(errors.title)}
                />
              )}
            />
          </Box>
          <Box py={2}>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label={t('articleSlug')}
                  margin="normal"
                  error={!!errors.slug}
                  helperText={slugErrorHelperText(errors.slug)}
                />
              )}
            />
          </Box>
          <Box py={2}>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={20}
                  label={t('articleBody')}
                  margin="normal"
                  error={!!errors.body}
                  helperText={bodyErrorHelperText(errors.body)}
                  onKeyPress={handleUserKeyPress}
                />
              )}
            />
            <Typography variant="caption" color="secondary.light">
              {t('shiftEnterBreak')}
            </Typography>
          </Box>
          <Box py={4}>
            <LoadingButton
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
              loading={isInFlight}
            >
              {t('updateConfirm')}
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  )
}
