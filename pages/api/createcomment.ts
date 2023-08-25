// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import  {createClient}  from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config ={

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn:process.env.NODE_ENV==='production',
    token: process.env.SANITY_TOKEN,
}
const client =  createClient(config)


export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    console.log(req.body)
    const {_id,name,email,comment} = JSON.parse(req.body)
    try {
        
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment
        })
    

    } catch (error) {
        res.status(500).json({message:'error occured '+error})
    }

    console.log('submitted');
    
  res.status(200).json({message:'Submitted'})
}
