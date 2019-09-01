import { languagesEnEs } from "./daysOfTheWeek";

export default getLanguagesEnES = (language = 'hair', lng = 'es') => {
  const newLang = languagesEnEs[language][lng]
  return newLang
}