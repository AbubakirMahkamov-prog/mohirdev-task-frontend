import httpClient from "./httpClient";
const endPoint = '/task'


export function getMineNew() {
    return httpClient.get(endPoint + '/get-mine-new').then((res) => {
        return res.data
    })
}

export function setNew(id: string) {
    return httpClient.post(endPoint + `/set-new/${id}`).then((res) => {
        return res.data
    })
}

export function setCompleted(id: string) {
    return httpClient.post(endPoint + `/set-completed/${id}`).then((res) => {
        return res.data
    })
}


export function getMineCompleted() {
    return httpClient.get(endPoint + '/get-mine-completed').then((res) => {
        return res.data
    })
}

export function getOne(id: string) {
    return httpClient.get(endPoint + `/${id}`).then((res) => {
        return res.data;
    })
}

export function getStatistics() {
    return httpClient.get(endPoint + `/statistics`).then((res) => {
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