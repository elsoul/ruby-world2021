import { useCallback } from 'react'
import { Container, Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useMutation, graphql } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'

import type { CreateArticleMutation } from '@/__generated__/CreateArticleMutation.graphql'
import useMessage from '@/hooks/useMessage'

const mutation = graphql`
  mutation CreateArticleMutation($input: CreateArticleInput!) {
    createArticle(input: $input) {
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

type CreateArticleFormInput = {
  title: string
  body: string
  slug: string
}

export default function CreateArticle() {
  const { t } = useTranslation(['translation'])
  const { addMessage } = useMessage()
  const navigate = useNavigate()

  const [commit, isInFlight] = useMutation<CreateArticleMutation>(mutation)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateArticleFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      slug: '',
    },
  })

  const onSubmit = useCallback(
    (input: CreateArticleFormInput) => {
      commit({
        variables: {
          input,
        },
        onCompleted: () => {
          addMessage('success', t('createSuccess'))
          reset()
          navigate('/')
        },
        onError: (err) => {
          console.log(err)
          if (err.message.includes('duplicate')) {
            return addMessage('error', t('duplicateNameError'))
          }
          if (err.message.includes('index_articles_on_slug')) {
            return addMessage('error', t('duplicateSlugError'))
          }
          addMessage('error', t('createError'))
        },
        updater: (store) => {
          store.invalidateStore()
        },
      })
    },
    [commit, addMessage, reset, t, navigate]
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
              {t('createConfirm')}
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  )
}
