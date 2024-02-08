// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Breed from '@/interfaces/BreedInterface'
import callApi from '@/utilities/axiosUtility'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<Breed>) => await callApi(req, res, 'GET', 'breeds')
  
export default handler