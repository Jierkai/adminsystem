import moment from 'moment'

export default {
  timeFilter(value) {
    return moment(value).format('YYYY年MM月DD日')
  }
}
