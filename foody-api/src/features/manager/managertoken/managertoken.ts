import { Schema } from 'mongoose';
import { db } from '../../../core/db/connection';
import appConstants from '../../../core/utils/appconstants';

export interface IManagerToken extends Document {
  managerId: string;
  token: string;
  createdAt: string;
}

const managerTokenSchema = new Schema({
  managerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: appConstants.models.manager,
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

const ManagerToken = db.model<IManagerToken>(
  appConstants.models.managerToken,
  managerTokenSchema,
);

export default ManagerToken;
