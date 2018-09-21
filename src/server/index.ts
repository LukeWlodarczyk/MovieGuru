import * as Loadable from "react-loadable";
import app from './app';

const PORT = process.env.PORT || 3000;


Loadable.preloadAll()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
