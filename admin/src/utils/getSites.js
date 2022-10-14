import { getConfig } from "./api";

const getSites = async () => {
  const response = await getConfig();
  return response.data.sites;
}

export default getSites;
