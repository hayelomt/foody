export default class Money {
  constructor(protected amountInCoin: number) {}

  get amount() {
    return this.amountInCoin;
  }

  static fromBill(amountInBill: number) {
    return new Money(Math.floor(amountInBill * 100));
  }
}
