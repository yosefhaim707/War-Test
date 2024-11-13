import mongoose, { Schema, Document } from 'mongoose';
import { IOrganization } from './Organization';

export  interface IUser extends Document {
  name: string;
  password: string;
  organization: Schema.Types.ObjectId | IOrganization;
  area?: 'north' | 'south' | 'east' | 'west';
}

const User: Schema<IUser> = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  area: { type: String, enum: ['north', 'south', 'east', 'west'] },
});

export default mongoose.model<IUser>('User', User);
