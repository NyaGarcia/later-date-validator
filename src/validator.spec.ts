import { setErrorMessage, validator } from './validator';

describe('fonk-later-date-validator specs', () => {
  it('should return succeeded validation when value is a valid Date object later than actual Date', () => {
    const value = new Date(2020, 11, 24, 10, 33, 30, 0);
    const date = new Date();

    const result = validator({ value, customArgs: { date } });

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

  it('should return succeeded validation when value is a valid Date object later than customArgs date param by one second', () => {
    const value = new Date(2019, 11, 24, 10, 33, 30, 1);
    const date = new Date(2018, 11, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year later than customArgs date param', () => {
    const value = new Date(2019);
    const date = new Date(2018);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year and month later than customArgs date param', () => {
    const value = new Date(2018, 12);
    const date = new Date(2018, 11);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month and days later than customArgs date param', () => {
    const value = new Date(2018, 11, 23);
    const date = new Date(2018, 11, 5);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month, days and hours later than customArgs date param', () => {
    const value = new Date(2018, 11, 30, 18);
    const date = new Date(2018, 11, 30, 6);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month, days, hours and minutes later than customArgs date param', () => {
    const value = new Date(2018, 12, 24, 10, 45);
    const date = new Date(2018, 12, 24, 10, 23);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object year, month, days, hours, minutes and seconds later than customArgs date param', () => {
    const value = new Date(2018, 12, 30, 15, 33, 50);
    const date = new Date(2018, 12, 30, 15, 33, 40);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object year, month, days, hours, minutes, seconds and milliseconds later than customArgs date param', () => {
    const value = new Date(2018, 12, 30, 15, 33, 45, 18);
    const date = new Date(2018, 12, 30, 15, 33, 45, 7);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'LATER_DATE',
    });
  });

  it('should return failed validation when value is a valid Date object later than customArgs date param', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: false,
      message: "Date isn't later than the one provided.",
      type: 'LATER_DATE',
    });
  });

  it('should throw an error when it feeds value equals undefined', () => {
    const value = undefined;
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);
    const validatorArgs = { value, customArgs: { date } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals null', () => {
    const value = null;
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);
    const validatorArgs = { value, customArgs: { date } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals empty string', () => {
    const value = '';
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);
    const validatorArgs = { value, customArgs: { date } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should overwrite default message when it feeds value and message', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);
    const message = 'other message';
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);

    const result = validator({ value, message, customArgs: { date } });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'LATER_DATE',
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);
    const date = new Date(2018, 12, 30, 15, 33, 30, 0);
    setErrorMessage('other message');

    const result = validator({ value, customArgs: { date } });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'LATER_DATE',
    });
  });

  describe('CustomParams boundaries', () => {
    it('Should throw an error if customArgs are not provided', () => {
      const value = new Date(2018, 11, 24, 10, 33, 30, 0);
      const validatorArgs = { value };

      expect(() => validator(validatorArgs)).toThrow(Error);
      expect(() => validator(validatorArgs)).toThrowError(
        'FieldValidationError: date option for date validation is mandatory. Example: { date: new Date() }.'
      );
    });
  });
});
