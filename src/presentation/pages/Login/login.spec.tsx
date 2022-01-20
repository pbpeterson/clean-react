import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  it('should start with initial state', () => {
    const { getByTestId, getByRole } = render(<Login />)
    const errorWrap = getByTestId('erroWrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByRole('button', { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
  })
})
