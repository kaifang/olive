const defaultMeta = {

    FRONT: {
        HTML: 'google/api/html.json',
        CSS: 'google/api/css.json',
        JS: 'google/api/javascript.json',
        JSP: 'google/api/jsp.json'
    },

    BACK: {
        C: 'ms/api/html.json',
        JAVA: 'sun/api/html.json'
    },

    DB: {
        SYBASE: 'sybase/api/sybase.json',
        ORACLE: 'oracle/api/oracle.json',
        MYSQL: 'open/api/mysql.json'
    }
};

// old syntax
const newMeta = JSON.parse(JSON.stringify(defaultMeta));
Object.assign(newMeta, {
    FRONT: Object.assign(newMeta.FRONT, {
        JS: 'facebook/test/javascript.json'
    })
});

// new syntax, ES6’s spread operator for objects
const newMeta2 = {
    ...defaultMeta,
    CSS: 'facebook/test/css.json',
    JS: 'facebook/test/javascript.json'
};

export default {
    get FRONT() {
        return this._getMetaObject().FRONT;
    },
    get BACK() {
        return this._getMetaObject().BACK;
    },
    get DB() {
        return this._getMetaObject().DB;
    },

    _getMetaObject() {
        let staticMeta = defaultMeta;
        if (window.test) {
            staticMeta = newMeta;
        }
        return staticMeta;
    }
};
