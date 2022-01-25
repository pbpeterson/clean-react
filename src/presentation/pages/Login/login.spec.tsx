import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('erroWrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByRole('button', {
      name: /entrar/i
    }) as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })
  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })
  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })
  it('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
  it('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })
  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('email')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = sut.getByRole('button', {
      name: /entrar/i
    }) as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })
})
