import { RequiredFieldError } from '@/validations/errors'
import { RequiredFieldValidation } from './required-field-validation'
import faker from 'faker'

describe('RequiredField', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
  it('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.random.words())
    expect(error).toBeFalsy()
  })
})
