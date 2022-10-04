export const toUpperCaseWords = (router) => {
  if (!router?.query?.category) return;

  return router?.query?.category
    .split("-")
    .map((e) => {
      return e.charAt(0).toUpperCase() + e.slice(1);
    })
    .join(" ");
};
