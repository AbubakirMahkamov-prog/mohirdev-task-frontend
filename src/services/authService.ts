import httpClient from "./httpClient";
const endPoint = '/auth'

interface ILogin {
    email: string
    password: string
}
export function Login(data: ILogin) {
    return httpClient.post(endPoint + '/login', data).then((res) => {
        return res.data
    })
}
