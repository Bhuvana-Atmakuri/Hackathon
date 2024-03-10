import {request, gql} from 'graphql-request'

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/cltjvqyia0kgw06w94owenkn1/master"

export const getTutorialList = async()=>{
    const query = gql`
    query TutorialList {
      tutorials {
        id
        name
        types
        time
        link
        banner {
          url
        }
      }
    }
     
      `

    const result=await request (MASTER_URL, query)
    return result
}