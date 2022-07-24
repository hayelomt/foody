import { expect } from 'chai';

const assertError = async (testCb: Function, assertCb: (err: any) => void) => {
  let assertedError = false;
  try {
    await testCb();
  } catch (err) {
    await assertCb(err);
    assertedError = true;
  }

  expect(assertedError).to.be.true;
};

export { assertError };
