import { servicesType } from "./daysOfTheWeek";

export default serviceEnES = (service = 'hair', lng = 'es') => {
  const serviceNewLng = servicesType[service][lng]
  return serviceNewLng
}