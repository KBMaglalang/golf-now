export const SANITY_SEARCH_QUERY = (searchTerm: string) => {
  return `*[[_type, name] match "${searchTerm}"]`;
};
