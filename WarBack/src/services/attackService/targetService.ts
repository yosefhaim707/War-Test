import Organization, { IOrganization } from '../../models/Organization';

const targetService = async (): Promise<IOrganization[]> => {
  const targets: IOrganization[] | null = await Organization.find({
    name: {
      $regex: '^IDF',
      $options: 'i',
    },
  });
  if (!targets) {
    throw new Error('No targets found');
  }
  return targets;
};

export default targetService;
