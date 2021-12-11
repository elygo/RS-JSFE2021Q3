export interface Irequest {
    resource: string;
    id: string;
    verb: string;
}
export const Utils = {
    parseRequestURL: () => {
        const url = location.hash.slice(1).toLowerCase() || '/';

        const r = url.split('/');

        const request: Irequest = {
            resource: '',
            id: '',
            verb: '',
        };

        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
    },

    sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export default Utils;
