import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(date, format = DATE_TIME_FORMAT) {
  return dayjs(date).format(format)
}

export function formatToDate(date, format = DATE_FORMAT) {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs
// date转换为utc （截止时间）
export function dateToUTCForEnd(date) {
  return dayjs(date)
    .hour(+24)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString() // 2019-03-20T16:00:00.000Z    时分秒 取 0
}

// date转换为utc （开始时间）
export function dateToUTCForstart(date) {
  return dayjs(date).hour(0).minute(0).second(0).millisecond(0).toISOString() // 2019-03-20T16:00:00.000Z    时分秒 取 0
}
