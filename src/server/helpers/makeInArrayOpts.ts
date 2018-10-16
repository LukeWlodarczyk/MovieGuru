export const makeInArrayOpts = (inArrayOpts: string, optsName: string) => {
  if (inArrayOpts === undefined) {
    return {};
  }

  return {
    [optsName]: {
      $in: inArrayOpts
        .replace(/_/g, " ")
        .split(",")
        .map(o => o.trim())
        .filter(o => o)
        .map(o => new RegExp(["^", o, "$"].join(""), "i"))
    }
  };
};
