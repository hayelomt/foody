import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Document, Schema, Types } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/appconstants';
import authConfig from '../auth/_lib/auth-config';

export interface IDriver extends Document {
  email: string;
  password: string;

  profile: {
    name: string;
  };
  restaurantId: string;

  comparePassword: (password: string) => Promise<boolean>;
}

const ProfileSchema = new Schema({
  name: String,
});

const DriverSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      transform: (val: string) => val.toLowerCase(),
    },
    password: {
      type: String,
      required: true,
    },
    profile: ProfileSchema,
    restaurantId: { type: Types.ObjectId, ref: appConstants.models.restaurant },
  },
  {
    timestamps: true,
  },
);

DriverSchema.pre('save', async function (next: NextFunction): Promise<void> {
  const driver: IDriver = this;

  if (!driver.isModified('password')) {
    next();
  }

  try {
    const salt: string = await bcrypt.genSalt(authConfig.saltRounds);
    const hash: string = await bcrypt.hash(driver.password, salt);

    driver.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

DriverSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return err;
  }
};

const Driver = db.model<IDriver>(appConstants.models.driver, DriverSchema);

export default Driver;
