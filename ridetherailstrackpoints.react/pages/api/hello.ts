// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import callApi from '@/utilities/axiosUtility'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => await callApi(req, res, 'GET', 'get-name')
  
export default handler