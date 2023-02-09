export default {
  method: {
    isTrue(type = '') {
      return !this.btnDisabled.includes(type)
    }
  }
}
