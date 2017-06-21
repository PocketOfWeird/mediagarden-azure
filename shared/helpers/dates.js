// shared/helpers/dates.js
const currentSemester = () => {
    const d = new Date(Date.now())
    const month = d.getMonth()
    const year = d.getFullYear()
    var semester = ''
    if (month >= 0 && month <= 4) {
      semester += 'SP'
    } else if (month === 5 || month === 6) {
      semester += 'SUM'
    } else {
      semester += 'FA'
    }
    semester += year
    return semester
}

module.exports = {
  currentSemester
}
