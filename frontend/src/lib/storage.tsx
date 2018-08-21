interface Storage {
    set(key: string, value: any): void,
    get(key: string): undefined | any,
    remove(key: string): void
}

const storage: Storage= {
    set: (key, object) => {
        if(!localStorage) return;
        localStorage[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
    },
    get: (key) => {
        if(!localStorage) return null;

        if(!localStorage[key]) {
            return null;
        }

        try {
            const parsed = JSON.parse(localStorage[key]);
            return parsed;
        } catch(e) {
            return localStorage[key];
        }
    },
    remove: (key): any => {
        if(!localStorage) return null;

        if(localStorage[key]) {
            localStorage.removeItem(key);
        }
    }
}

export default storage;