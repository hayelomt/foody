import { Schema } from 'mongoose';
import { db } from '../../../core/db/connection';

export interface IUserToken extends Document {
  userId: string;
  token: string;
  createdAt: string;
}

const userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 3600,
  },
});

const UserToken = db.model<IUserToken>('UserToken', userTokenSchema);

export default UserToken;
