import httpClient from "./httpClient";
const endPoint = '/auth'

interface ILogin {
    email: string
    password: string
}
interface IRegistration {
    fullname: string;
    email: string;
    password: string;
}
export function Login(data: ILogin) {
    return httpClient.post(endPoint + '/login', data).then((res) => {
        return res.data
    })
}

export function Registration(data: IRegistration) {
    return httpClient.post(endPoint + '/registration', data).then((res) => {
        return res.data
    })
}

