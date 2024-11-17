import Attack, { IAttack } from "../../models/Attack";




const launchService = async (attack: IAttack): Promise<IAttack> => {
    const newAttack = new Attack(attack);
    const savedAttack = await newAttack.save();
    await savedAttack.populate('target');
    await savedAttack.populate('source');
    return savedAttack;
};

export default launchService;

