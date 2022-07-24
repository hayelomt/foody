import { ValidationChain } from 'express-validator';

class ValidationRules {
  constructor(protected chain: ValidationChain, protected field: string) {}

  optional() {
    this.chain.optional().notEmpty().withMessage(`${this.field} is required`);
    return this;
  }

  required() {
    this.chain.notEmpty().withMessage(`${this.field} is required`);
    return this;
  }

  if(cb: any) {
    this.chain.if(cb);
    return this;
  }

  /** String validations */
  string() {
    this.chain
      .isString()
      .withMessage(`${this.field} must be a string(sentence)`);
    return this;
  }

  maxString(limit: number) {
    this.chain
      .isLength({ max: limit })
      .withMessage(`${this.field} must be under ${limit} characters long`);
    return this;
  }

  minString(limit: number) {
    this.chain
      .isLength({ min: limit })
      .withMessage(`${this.field} must be at least ${limit} characters long`);
    return this;
  }

  passwordConfirmed() {
    this.chain.custom((confirmation: string, { req }: any) => {
      if (confirmation !== req.body.password) {
        throw new Error(`${this.field} must match password`);
      }

      return true;
    });

    return this;
  }

  email() {
    this.chain.isEmail().withMessage(`${this.field} must be a valid email`);
    return this;
  }

  /** Number validations */
  integer() {
    this.chain.isInt().withMessage(`${this.field} must be a number(integer)`);
    return this;
  }

  intGt(val: number) {
    this.chain
      .isInt({ gt: val })
      .withMessage(`${this.field} must be greater than ${val}`);
    return this;
  }

  intGte(val: number) {
    this.chain
      .isInt({ min: val })
      .withMessage(`${this.field} must be greater than or equal to ${val}`);
    return this;
  }

  number() {
    this.chain.isFloat().withMessage(`${this.field} must be number`);
    return this;
  }

  numberGt(val: number) {
    this.chain
      .isFloat({ gt: val })
      .withMessage(`${this.field} must be greater than or equal to ${val}`);
    return this;
  }

  numberGte(val: number) {
    this.chain
      .isFloat({ min: val })
      .withMessage(`${this.field} must be greater than or equal to ${val}`);
    return this;
  }

  date() {
    this.chain.isDate().withMessage(`${this.field} must be a date`);
    return this;
  }

  dateAfter(_date?: string) {
    // this.chain.isAfter(date).withMessage(`${this.field} must be after ${date}`);
    return this;
  }

  array() {
    this.chain.isArray().withMessage(`${this.field} must be a list`);
    return this;
  }

  bool() {
    this.chain
      .isBoolean()
      .withMessage(`${this.field} must be either true or false`);
    return this;
  }

  location() {
    this.chain
      .isLatLong()
      .withMessage(`${this.field} must be a valid location lat,long`);
    return this;
  }

  enum(values: any[]) {
    this.chain
      .isIn(values)
      .withMessage(`${this.field} can only be ${values.join(', ')}`);
    return this;
  }

  link() {
    this.chain.isURL().withMessage(`${this.field} must be a valid url`);
    return this;
  }

  object() {
    this.chain.isObject().withMessage(`${this.field} must be an object`);

    return this;
  }

  /**
   *
   * Custom rule validation that is per module dependent
   * Eg. unique email validation during signUp
   *
   * @param assertCb : Callback functions that accepts fieldValue and req, to perform logic and return boolean value based on the custom logic
   * @param msgBuilder : Callback that accepts field value and builds custom message format
   * @returns
   */
  custom(
    assertCb: (fieldValue: any, req?: any) => boolean | Promise<boolean>,
    msgBuilder: (field: string, req?: any) => string,
  ) {
    this.chain.custom(async (fieldValue: any, { req }: any) => {
      if (!(await assertCb(fieldValue, req))) {
        throw new Error(msgBuilder(this.field, req));
      }

      return true;
    });

    return this;
  }

  // dateAfterOrEqual(dateField: string) {
  //   this.chain.custom((val, ctx: any) => {
  //     const compDate = ctx?.req?.body?.[dateField];
  //     if (dateField && compDate && moment(compDate).isAfter(moment(val))) {
  //       throw new Error(`${this.field} can't be before ${dateField}`);
  //     }

  //     return true;
  //   });
  //   return this;
  // }

  build() {
    return this.chain;
  }
}

const validationBuilder = (chain: ValidationChain, field: string) =>
  new ValidationRules(chain, field);

export default validationBuilder;
