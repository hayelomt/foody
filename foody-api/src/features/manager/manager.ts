import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Document, Schema } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/appconstants';
import authConfig from '../auth/_lib/auth-config';

export interface IManager extends Document {
  email: string;
  password: string;

  profile: {
    name: string;
  };

  comparePassword: (password: string) => Promise<boolean>;
}

const ProfileSchema = new Schema({
  name: String,
});

const ManagerSchema = new Schema(
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
  },
  {
    timestamps: true,
  },
);

ManagerSchema.pre('save', async function (next: NextFunction): Promise<void> {
  const manager: IManager = this;

  if (!manager.isModified('password')) {
    next();
  }

  try {
    const salt: string = await bcrypt.genSalt(authConfig.saltRounds);
    const hash: string = await bcrypt.hash(manager.password, salt);

    manager.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

ManagerSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return err;
  }
};

const Manager = db.model<IManager>(appConstants.models.manager, ManagerSchema);

export default Manager;
