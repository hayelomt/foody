import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Document, Schema } from 'mongoose';
import { db } from '../../core/db/connection';
import authConfig from '../auth/lib/auth-config';

export interface IUser extends Document {
  email: string;
  password: string;

  profile: {
    name: string;
    gender: string;
    location: string;
  };

  comparePassword: (password: string) => Promise<boolean>;
}

const ProfileSchema = new Schema({
  name: String,
  gender: String,
  location: String,
  website: String,
});

const UserSchema = new Schema({
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
});

UserSchema.pre('save', async function (next: NextFunction): Promise<void> {
  const user: IUser = this;

  if (!user.isModified('password')) {
    next();
  }

  try {
    const salt: string = await bcrypt.genSalt(authConfig.saltRounds);
    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return err;
  }
};

const User = db.model<IUser>('User', UserSchema);

export default User;
