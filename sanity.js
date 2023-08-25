import{createClient} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url'
import {suspend} from 'suspend-react'
import {_checkAuth} from '@sanity/preview-kit'

export const config ={

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion:'2022-02-03',
    useCdn:process.env.NODE_ENV==='production'
}

export const sanityClient = createClient(config)

export const urlFor = (source)=> createImageUrlBuilder(config).image(source)

const useCheckAuth = () =>
  suspend(() => _checkAuth(config, null), ['@sanity/preview-kit', 'checkAuth', config])

export default function Page() {
  const isAuthenticated = useCheckAuth()
}