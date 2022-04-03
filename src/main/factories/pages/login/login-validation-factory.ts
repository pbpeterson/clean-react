import { EmailValidation } from '@/validations/validators/email/email-validation'
import { MinLengthValidation } from '@/validations/validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '@/validations/validators/required-field/required-field-validation'
import { ValidationComposite } from '@/validations/validators/validation-composite/validation-composite'

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new EmailValidation('email'),
    new RequiredFieldValidation('email'),
    new MinLengthValidation('email', 5),
    new MinLengthValidation('password', 5),
    new RequiredFieldValidation('password')
  ])
}
