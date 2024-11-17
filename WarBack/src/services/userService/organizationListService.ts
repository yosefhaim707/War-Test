import Organization from "../../models/Organization";
import { IOrganization } from "../../models/Organization";



const organizationListService = async (): Promise<string[]> => {
    const organizations: IOrganization[] = await Organization.find();
    if (!organizations) {
        throw new Error('Organizations not found');
    }
    return organizations.map((organization) => organization.name);
};

export default organizationListService;
