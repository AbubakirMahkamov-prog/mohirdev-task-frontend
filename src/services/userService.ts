import httpClient from "./httpClient";
const endPoint = '/user'


export function getAll() {
    return httpClient.get(endPoint).then((res) => {
        return res.data
    })
}
