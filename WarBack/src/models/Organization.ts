import mongoose, { Document, Schema } from 'mongoose';
import Missile, { IMissile } from './Missile';

export  interface Resource {
  name: string;
  amount: number;
};

export interface IOrganization extends Document {
  name: string;
  resources: Resource[];
  budget: number;
};

const Organization: Schema<IOrganization> = new Schema({
  name: { type: String, required: true },
  resources: { type: [{name: String, amount: Number}],  required: true },
  budget: { type: Number, required: true },
});

export default mongoose.model<IOrganization>('Organization', Organization);

