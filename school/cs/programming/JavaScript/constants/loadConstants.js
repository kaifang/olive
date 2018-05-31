import all from 'dojo/promise/all';
import Deferred from 'dojo/Deferred';
//import someConstants from 'dumpConstants';
import someConstants from 'smartConstants';

const loadConstants = {

    //usage:  loadConstants.get(DB).then(someDfd.resolve);
    get: function (db) {
        let retrieval = null;

        if (db) {
            retrieval = this.getDatabaseMeta();
        } else {
            retrieval = this.getInitialMeta();
        }

        return retrieval;
    },

    getInitialMeta() {
        const retrieval = new Deferred();
        all([          
            this.loadMeta(someConstants.FRONT.JS),
            this.loadMeta(someConstants.BACK.JAVA),
            this.loadMeta(someConstants.DB.MYSQL)
        ]).then(() => {
            all([
                this.loadMeta(someConstants.FRONT.CSS),
                this.loadMeta(someConstants.DB.ORACLE)
            ]);
        }, retrieval.reject).then(retrieval.resolve, retrieval.reject);

        return retrieval;
    },

    loadMeta(file) {
        console.log(file);

        const methodDfd = new Deferred();

        this.remoteCall('GET', file, {
            handleAs: 'json',
            preventCache: true,
            timeout: apiConstants.DEFAULT_TIMEOUT
        }).then(data => {
            this._updateLoadedFiles(file);
            this._cachedData[file] = data;
            methodDfd.resolve(data);
        }, methodDfd.reject);

        return methodDfd;

    },

    remoteCall(method, url, options = {}) {
        return new Promise((resolve, reject) => {
            if (method === 'DELETE' || method === 'GET' || method === 'POST') {
                this.fetchURL(resolve, reject, method, url, options);
            } else {
                console.log(`Unexpected HTTP verb ${method} (${url})`);
                reject();
            }
        });
    },

    fetchURL(resolve, reject, method, updatedUrl, apiOptions, retryCount) {
        // use Promise.race to simulate a timeout since fetch does not yet support timeouts natively
        Promise.race([
            window.fetch(updatedUrl, apiOptions),
            new Promise((resolveFn, rejectFn) => {
                this.fetchTimeout = setTimeout(() => rejectFn(new Error('Timeout exceeded')), apiOptions.timeout);
            })
        ]).then(this.handleSuccess.bind(this, resolve, reject, method, updatedUrl, apiOptions, retryCount))
            .catch(this.handleFailure.bind(this, resolve, reject, method, updatedUrl, apiOptions, retryCount))
            .then(clearTimeout(this.fetchTimeout));
    }

};

export default loadConstants;

