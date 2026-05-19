import { describe, it, expect } from 'vitest'
import { getPasswordStrength } from './passwordStrength'

describe('getPasswordStrength', () => {
  it('retorna "vacía" cuando la contraseña está vacía', () => {
    expect(getPasswordStrength('')).toBe('vacía')
  })

  it('retorna "débil" cuando la contraseña tiene menos de 8 caracteres', () => {
    expect(getPasswordStrength('abc')).toBe('débil')
  })

  it('retorna "débil" para exactamente 7 caracteres', () => {
    expect(getPasswordStrength('abcdefg')).toBe('débil')
  })

  it('retorna "débil" con solo símbolos y menos de 8 caracteres', () => {
    expect(getPasswordStrength('!@#')).toBe('débil')
  })

  it('retorna "media" para exactamente 8 caracteres sin números ni símbolos', () => {
    expect(getPasswordStrength('abcdefgh')).toBe('media')
  })

  it('retorna "media" para 8+ caracteres sin números ni símbolos', () => {
    expect(getPasswordStrength('abcdefghij')).toBe('media')
  })

  it('retorna "fuerte" para 8+ caracteres con al menos un número', () => {
    expect(getPasswordStrength('abcdefg1')).toBe('fuerte')
  })

  it('retorna "muy fuerte" para 8+ caracteres con número y símbolo', () => {
    expect(getPasswordStrength('abcdefg1!')).toBe('muy fuerte')
  })

  it('una contraseña de 7 caracteres no debe ser "media"', () => {
    expect(getPasswordStrength('abcdefg')).not.toBe('media')
  })

  it('una contraseña de exactamente 8 caracteres sin números no debe ser "débil"', () => {
    expect(getPasswordStrength('abcdefgh')).not.toBe('débil')
  })
})