export const imageError = {
  inserted(el, binding) {
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
