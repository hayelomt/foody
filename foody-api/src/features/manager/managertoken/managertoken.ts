import { Schema } from 'mongoose';
import { db } from '../../../core/db/connection';

export interface IManagerToken extends Document {
  managerId: string;
  token: string;
  createdAt: string;
}

const managerTokenSchema = new Schema({
  managerId: {
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

const ManagerToken = db.model<IManagerToken>(
  'managertoken',
  managerTokenSchema,
);

export default ManagerToken;
