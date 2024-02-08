import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { NextApiRequest, NextApiResponse } from 'next/types';
import { getSession } from 'next-auth/react';
import { Session } from "inspector";

interface SessionInterface extends Session {
    accessToken: string
}

const client = axios.create({
    baseURL: process.env.API_URL
})

const getResponse = async (url: string, data: any, config: AxiosRequestConfig<any> | undefined, method: string) => {
    switch(method) {
        case 'GET': {
            return client.get(url, config)
        }
        case 'POST' : {
            return client.post(url, data, config)
        }
        case 'PUT' : {
            return client.put(url, data, config)
        }
        case 'PATCH' : {
            return client.patch(url, data, config)
        }
        case 'DELETE' : {
            return client.delete(url, config)
        }
        default : {
            throw new AxiosError('Method not found.')
        }
    }
}

const callApi = async (
    req: NextApiRequest,
    res: NextApiResponse,
    method: string,
    url: string,
    params?: any,
    data?: any,
    header?: any,
): Promise<void> => {
    try{
        if(method !== req.method) return res.status(405).json({ statusCode: 405, message: 'Method Not Allowed',})

        const session = await getSession({ req, triggerEvent: true }) as SessionInterface | null
        const accessToken = session?.accessToken

        const config = {
            params,
            header: {
                'Content-Type': 'application/json',
                ...header,
                Authorization: `Bearer ${accessToken}`,
            }
        }

        const response = await getResponse(url, data, config, method)
        res.status(response.status).send(response.data)
    } catch (error: any) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }
}

export default callApi