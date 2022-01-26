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

import { AuthenticationSpy } from '@/presentation/test/mock-authentication'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy}/>)
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByRole('button', {
    name: /entrar/i
  })
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
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
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })
  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })
  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })
  it('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })
  it('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })
  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByRole('button', { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })
  it('should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
  it('should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
