import { InvalidFieldError } from '@/validations/errors'
import { FieldValidation } from '@/validations/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLegth: number) {}

  validate (value: string): Error {
    return value.length >= this.minLegth ? null : new InvalidFieldError()
  }
}
