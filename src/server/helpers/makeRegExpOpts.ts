export const makeRegExpOpts = (string: string, propName: string) =>  string ?  { [propName]: new RegExp("^" + string.replace('_', ' '), "i") } : {};
