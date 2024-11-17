import axios from "axios";



const fetchOrganizations = async (): Promise<string[]> => {
    const response: string[] | null = await axios.get(
      'http://localhost:7400/users/organizations'
    );
    if (!response) {
        throw new Error("Failed to fetch organizations");
    }
    return response;
};

export default fetchOrganizations;

