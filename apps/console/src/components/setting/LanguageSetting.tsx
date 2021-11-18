import {
  Box,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import { TranslateRounded } from '@mui/icons-material'
import useChangeLanguage from '@/hooks/useChangeLanguage'

export default function LanguageSetting() {
  const { currentLanguage, changeLanguage } = useChangeLanguage()
  return (
    <>
      <Toolbar>
        <TranslateRounded />
        <Typography variant="h5" ml={1}>
          Language
        </Typography>
      </Toolbar>
      <Box p={2}>
        <FormControl variant="outlined">
          <Select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <MenuItem value="ja-JP">日本語</MenuItem>
            <MenuItem value="en-US">English</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  )
}
