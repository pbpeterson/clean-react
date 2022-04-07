import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import TextField from './textfield'
import Context from '@/presentation/context/formContext'

const makeSut = (name: string): RenderResult => {
  const result = render(
    <Context.Provider value={{
      formState: {}
    }}>
      <TextField name={name} />
    </Context.Provider>)

  return result
}

describe('TextField', () => {
  it('should begin with readonly', () => {
    const inputName = 'field'
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
