import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

// TODO: Add validator type
const VALIDATOR_TYPE = 'LATER_DATE';

export interface CustomArgs {
  date: Date;
}

const DEFAULT_PARAMS: CustomArgs = {
  date: new Date(),
};

const BAD_PARAMETER = 'Value must be a valid Date object';

let defaultMessage = "Date isn't previous to the one provided";
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs = DEFAULT_PARAMS,
}) => {
  const { date } = customArgs as CustomArgs;

  if (!(value instanceof Date) || !(date instanceof Date)) {
    throw new TypeError(BAD_PARAMETER);
  }

  const succeeded = !isDefined(value) || value > date;

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(
          (message as string) || defaultMessage,
          customArgs
        ),
    type: VALIDATOR_TYPE,
  };
};
