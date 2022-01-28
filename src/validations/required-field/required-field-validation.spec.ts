import { RequiredFieldError } from '@/validations/errors'
import { RequiredFieldValidation } from './required-field-validation'
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredField', () => {
  it('should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
  it('should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.words())
    expect(error).toBeFalsy()
  })
})
