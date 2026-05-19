export function getPasswordStrength(password) {
  if (password === '') return 'vacía'
  if (password.length < 8) return 'débil'

  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  if (hasNumber && hasSymbol) return 'muy fuerte'
  if (hasNumber) return 'fuerte'

  return 'media'
}