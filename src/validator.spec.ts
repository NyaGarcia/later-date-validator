import { setErrorMessage, validator } from './validator';

describe('fonk-later-date-validator specs', () => {
  it('should return succeeded validation when value is a valid Date object later than actual Date', () => {
    const value = new Date(2020, 11, 24, 10, 33, 30, 0);

    const result = validator({ value });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object later than customArgs date param', () => {
    const value = new Date(2019, 11, 24, 10, 33, 30, 0);
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should throw an error when it feeds value equals undefined', () => {
    const value = undefined;
    const validatorArgs = { value };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals null', () => {
    const value = null;
    const validatorArgs = { value };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals empty string', () => {
    const value = '';
    const validatorArgs = { value };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should overwrite default message when it feeds value and message', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);
    const message = 'other message';

    const result = validator({ value, message });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'LATER_DATE',
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);

    setErrorMessage('other message');

    const result = validator({ value });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'LATER_DATE',
    });
  });
});
