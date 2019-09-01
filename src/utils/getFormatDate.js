import { monthsOfTheYear } from "./daysOfTheWeek";
import moment from 'moment'

export default formatDateEnEs = (date = '2019-08-22', lng = 'es') => {
  const month = moment(date, 'YYYY-MM-DD').format('MMM')
  const day = moment(date, 'YYYY-MM-DD').format('DD')
  const year = moment(date, 'YYYY-MM-DD').format('YYYY')
  const monthNewLng = monthsOfTheYear[month][lng]
  const finalDate = `${day} ${monthNewLng} ${year}`
  return finalDate
}