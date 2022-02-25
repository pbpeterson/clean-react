import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { EmailValidation } from '@/validations/validators/email/email-validation'
import { MinLengthValidation } from '@/validations/validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '@/validations/validators/required-field/required-field-validation'
import { ValidationComposite } from '@/validations/validators/validation-composite/validation-composite'
import React from 'react'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = new ValidationComposite([
    new EmailValidation('email'),
    new RequiredFieldValidation('email'),
    new MinLengthValidation('email', 5),
    new MinLengthValidation('password', 5),
    new RequiredFieldValidation('password')
  ])

  return (
    <Login authentication={remoteAuthentication} validation={validationComposite} />
  )
}
