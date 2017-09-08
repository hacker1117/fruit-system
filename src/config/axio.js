import { basicUrl } from './env'
import axios from 'axios'
export default async(url='', data={}, type='GET') => {
    // let instance = axios.create({
    //     timeout: 1000,
    //     headers: {'Cache-Control': 'no-cache'}
    //   });
    type = type.toUpperCase();
    url = basicUrl + url;
    try {
        if(type === 'GET'){
            const response = axios.get(url, {params: data});
            return response;
        }else if(type === 'POST'){
            const response = axios({
                    method: 'post',
                    url: url,
                    params: data
                });
            console.log('post:' + JSON.stringify(data));
            return response;
        }else if(type === 'DELETE'){
            const response = axios({
                method: 'delete',
                url: url,
                params: data
            });
            console.log('delete:' + JSON.stringify(data));
            return response;
        }
    } catch(error) {
        throw new Error(error)
    }
}