export const prepareDataToSave = (input: object) => {
    if (typeof input !== 'object') return input;
    if (Array.isArray(input)) return input.map(prepareDataToSave);
    return Object.keys(input).reduce((newObj:object, key:string) => {
        const val = input[key];
        const newVal = (typeof val === 'object') ? prepareDataToSave(val) : val;
        const newKey = key !== 'DVD' ? key.charAt(0).toLowerCase() + key.slice(1) : key.toLowerCase();
        newObj[newKey] = newVal;

      if(~['runtime','year','imdbVotes', 'imdbRating', 'boxOffice'].indexOf(newKey)) newObj[newKey] = Number(newObj[newKey].replace(/[^\d.-]/g, '')) || 0;


        const props = ['director', 'writer', 'actors', 'genre', 'country', 'language'];
        if(~props.indexOf(newKey)) newObj[newKey] = newObj[newKey].split(',').map(v => v.trim());

        return newObj;
    }, {});
};
