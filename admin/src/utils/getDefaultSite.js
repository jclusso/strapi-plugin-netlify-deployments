import getSites from "./getSites";

const getDefaultSite = async () => {
  const sites = await(getSites());
  return sites[0];
};

export default getDefaultSite;
