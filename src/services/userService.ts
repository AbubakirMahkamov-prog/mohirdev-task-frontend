import httpClient from "./httpClient";
const endPoint = '/user'


export function getAll() {
    return httpClient.get(endPoint).then((res) => {
        return res.data
    })
}

export function deleteItem(id: string) {
    return httpClient.delete(endPoint + `/${id}`).then((res) => {
        return res.data;
    })
}

export function createItem(data: any) {
    return httpClient.post(endPoint + `/`, data).then((res) => {
        return res.data;
    })
}