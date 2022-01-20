import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  it('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('erroWrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
