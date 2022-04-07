import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import TextField from './textfield'
import Context from '@/presentation/context/formContext'
import faker from 'faker'

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
    const inputName = faker.database.column()
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
  it('should remove readonly on focus', () => {
    const inputName = faker.database.column()
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })
})
