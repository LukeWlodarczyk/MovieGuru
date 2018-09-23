export const makeComparisonOpts = (filterObj: object, optsName: string) => {
    if(filterObj !== Object(filterObj)) {
        return {}
    }

    const comaprisonProps:string[] = ['gt', 'gte', 'lt', 'lte'];

    return Object.keys(filterObj).reduce((obj, key) => {
        if(~comaprisonProps.indexOf(key)) {
            obj[optsName]['$'+key] = filterObj[key];
        }
        return obj
    }, { [optsName]: {}})
}
