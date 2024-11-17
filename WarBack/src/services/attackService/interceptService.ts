import Attack from "../../models/Attack";
import { IAttack } from "../../models/Attack";



const interceptService = async (attack: IAttack): Promise<IAttack> => {
    let updatedAttack: IAttack | null = null;
    if (attack.status === 'intercepted') {
        updatedAttack = await Attack.findByIdAndUpdate(attack._id, { $set: { status: 'intercepted', intercepts: attack.intercepts } }, { new: true });
    } else {
        updatedAttack = await Attack.findByIdAndUpdate(attack._id, { $set: { status: attack.status } }, { new: true });
    }
    if (!updatedAttack) {
        throw new Error('Attack not found');
    }
    await updatedAttack.populate('target');
    await updatedAttack.populate('source');
    return updatedAttack;
};

export default interceptService;
