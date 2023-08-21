import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale(ja)

export default dayjs
