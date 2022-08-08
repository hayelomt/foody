import UserToken from '../src/features/user/usertoken/usertoken';

const mongoUnit = require('mongo-unit');

const clearDb = async () => {
  await UserToken.deleteMany();
  // await User.deleteMany();
};

before(async () => {
  // console.log('before globalizer');
  await mongoUnit.start();
  process.env.MONGODB_URI = mongoUnit.getUrl();
});

beforeEach(async () => {
  // console.log('before each');
  await clearDb();
});

after(async () => {
  await clearDb();
});
