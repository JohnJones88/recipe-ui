export default class BaseHttpServices {
    async fetch(url: string , options: RequestInit): Promise<Response>{
        const resp = await fetch(url, options)
        if (resp.status === 401){
            console.log('Go to login Page')
        }
        return resp;
    }
}