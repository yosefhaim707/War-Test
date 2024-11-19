const fetchOrganizations = async (): Promise<string[]> => {
  const response = await fetch('http://localhost:7400/users/organizations');
  if (!response) {
    throw new Error('Failed to fetch organizations');
  }
  const organizations: string[] = await response.json();
  return organizations;
};

export default fetchOrganizations;
