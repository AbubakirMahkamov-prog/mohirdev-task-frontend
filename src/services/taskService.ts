import httpClient from "./httpClient";
const endPoint = '/task'


export function getMine() {
    return httpClient.get(endPoint + '/get-mine').then((res) => {
        return res.data
    })
}

export function getOne(id: string) {
    return httpClient.get(endPoint + `/${id}`).then((res) => {
        return res.data;
    })
}

export function createItem(data: any) {
    return httpClient.post(endPoint + `/`, data).then((res) => {
        return res.data;
    })
}
export function updateItem(id: string, data: any) {
    return httpClient.patch(endPoint + `/${id}`, data).then((res) => {
        return res.data;
    })
}