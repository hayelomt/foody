import { Schema } from 'mongoose';
import { db } from '../../../core/db/connection';
import appConstants from '../../../core/utils/appconstants';

export interface IUserToken extends Document {
  userId: string;
  token: string;
  createdAt: string;
}

const userTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: appConstants.models.user,
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
  },
  {
    timestamps: true,
  },
);

const UserToken = db.model<IUserToken>(
  appConstants.models.userToken,
  userTokenSchema,
);

export default UserToken;
