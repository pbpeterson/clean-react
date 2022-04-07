import React from 'react'
import { render } from '@testing-library/react'
import TextField from './textfield'
import Context from '@/presentation/context/formContext'

describe('TextField', () => {
  it('should begin with readonly', () => {
    const { getByTestId } = render(
    <Context.Provider value={{
      formState: {}
    }}>
      <TextField name='field'/>
    </Context.Provider>)

    const input = getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
