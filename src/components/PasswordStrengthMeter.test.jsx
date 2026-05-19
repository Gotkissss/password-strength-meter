import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordStrengthMeter from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  it('renderiza un input de tipo password', () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('muestra el estado inicial "vacía"', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('muestra "débil" al escribir una contraseña corta', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abc')
    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('muestra "media" para 8+ caracteres sin números ni símbolos', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.getByText('media')).toBeInTheDocument()
  })

  it('muestra "fuerte" para 8+ caracteres con al menos un número', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })

  it('muestra "muy fuerte" para 8+ caracteres con número y símbolo', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')
    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })

  it('vuelve a "vacía" al borrar completamente la contraseña', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    await user.type(input, 'abc')
    await user.clear(input)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('exactamente 8 caracteres sin números no debe ser "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.queryByText('débil')).not.toBeInTheDocument()
  })

  it('exactamente 7 caracteres no debe ser "media"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg')
    expect(screen.queryByText('media')).not.toBeInTheDocument()
  })

  it('solo símbolos con menos de 8 caracteres sigue siendo "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    await user.type(screen.getByLabelText(/contraseña/i), '!@#')
    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('el input es accesible por rol y label', () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toBeInTheDocument()
  })
})