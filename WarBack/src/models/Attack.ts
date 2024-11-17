import mongoose, { Schema, Document } from 'mongoose';
import { IMissile } from './Missile';
import { IOrganization } from './Organization';

export interface IAttack extends Document {
  missile: Schema.Types.ObjectId | IMissile;
  intercepts?: Schema.Types.ObjectId[] | IMissile[];
  target: Schema.Types.ObjectId | IOrganization;
  date: Date;
  source: Schema.Types.ObjectId | IOrganization;
  status: 'pending' | 'inFlight' | 'completed' | 'intercepted';
}

const Attack: Schema<IAttack> = new Schema({
  missile: { type: Schema.Types.ObjectId, ref: 'Missile', required: true },
  intercepts: { type: [Schema.Types.ObjectId], ref: 'Missile', required: false },
  target: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  date: { type: Date, required: true },
  source: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },

  status: {
    type: String,
    enum: ['pending', 'inFlight', 'completed', 'intercepted'],
    required: true,
  },
});

export default mongoose.model<IAttack>('Attack', Attack);
