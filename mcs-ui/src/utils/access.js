export const getModuleAccess = (access, module) => {
  if (!access?.length) {
    return {
      create: 0,
      view: 0,
      consult: 0,
      update: 0,
      delete: 0,
      report: 0,
    };
  }

  const result = access?.filter(
    (element) => parseInt(element.WebFeatureId) === module
  )[0];

  // if (result) {
  //   console.log(result);
  // }

  return {
    create: result?.Store,
    view: result?.Retrieve,
    consult: result?.Modify,
    update: result?.Modify,
    delete: result?.Destroy,
    report: result?.Report,
  };
};
