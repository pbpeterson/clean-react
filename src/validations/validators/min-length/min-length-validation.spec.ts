import { InvalidFieldError } from '@/validations/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
