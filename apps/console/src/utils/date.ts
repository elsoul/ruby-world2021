import {
  parse,
  parseJSON,
  format,
  eachDayOfInterval,
  endOfWeek,
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  differenceInMonths,
} from 'date-fns'
import { enUS, ja } from 'date-fns/locale'

const locales = {
  'ja-JP': ja,
  'en-US': enUS,
}

export const showDate = (dateString: string) => {
  let date
  if (dateString.length === 10) {
    date = parse(dateString, 'yyyy-MM-dd', new Date())
  } else {
    date = parseJSON(dateString)
  }
  const jpTime = new Date(
    date.valueOf() + (540 + date.getTimezoneOffset()) * 60 * 1000
  )
  const formatted = format(jpTime, 'yyyy/MM/dd kk:mm:ss')
  return formatted
}

export const showYearDay = (dateString: string) => {
  let date
  if (dateString.length === 10) {
    date = parse(dateString, 'yyyy-MM-dd', new Date())
  } else {
    date = parseJSON(dateString)
  }
  const jpTime = new Date(
    date.valueOf() + (540 + date.getTimezoneOffset()) * 60 * 1000
  )
  const formatted = format(jpTime, 'yyyy/MM/dd')
  return formatted
}

export const dateLocaleFormat = (date: Date, locale: string) => {
  if (locale == 'ja-JP' || locale == 'en-US') {
    return format(date, 'yyyy/MM/dd (EEE)', { locale: locales[locale] })
  }
}

export const dateLocaleFormatFromString = (
  dateString: string,
  locale: string
) => {
  let date
  if (dateString.length === 10) {
    date = parse(dateString, 'yyyy-MM-dd', new Date())
  } else {
    date = parseJSON(dateString)
  }
  const jpTime = new Date(
    date.valueOf() + (540 + date.getTimezoneOffset()) * 60 * 1000
  )
  if (locale == 'ja-JP' || locale == 'en-US') {
    return format(jpTime, 'yyyy/MM/dd (EEE)', { locale: locales[locale] })
  }
}

export const monthLocaleFormat = (date: Date, locale: string) => {
  if (locale == 'ja-JP') {
    return format(date, 'y年M月', { locale: locales[locale] })
  }
  if (locale == 'en-US') {
    return format(date, 'MMMM, y', { locale: locales[locale] })
  }
}

export const dateYMDFormat = (date: Date) => {
  return format(date, 'yyyy-MM-dd')
}

export const getCalendarArray = (date: Date) => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })
  return sundays.map((sunday) =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  )
}

export const getStartOfMonthString = (date: Date) => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: startOfMonth(date),
  })
  return format(sundays[0], 'yyyy-MM-dd')
}

export const isNMonthLater = (date: Date) => {
  return differenceInMonths(startOfMonth(date), startOfMonth(new Date()))
}
