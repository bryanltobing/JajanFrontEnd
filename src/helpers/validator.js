export const isEmpty = (value, setFormValid) => {
  if (!value || value.length < 1) {
    if (setFormValid) {
      setFormValid(false)
    }
    return true
  }
  if (setFormValid) {
    setFormValid(true)
  }
  return false
}

export const isEmptyNotValidForm = (formInput = []) => {
  let error = []
  formInput.forEach((form, index) => {
    if (isEmpty(form)) {
      error.push(`error ${index}`)
    }
  })

  return error.length > 0 ? true : false
}
