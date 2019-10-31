import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace laterDate {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
