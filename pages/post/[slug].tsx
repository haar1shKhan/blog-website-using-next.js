import { sanityClient, urlFor } from "@/sanity";
import { post } from "../../type";
import Header from '../../component/Header'
import React, { useState } from "react";
import PortableText from "react-portable-text";
import { SubmitHandler,useForm } from "react-hook-form";

interface Props{
    post:post
}

interface submitType{
  _id:string,
  name:string,
  email:string,
  comment:string
}


 const Post = ({post}:Props) => {

    const {register,handleSubmit, formState: { errors } } = useForm<submitType>();

    const [sumbitted, setsumbitted] = useState(false)

    const onSubmit:SubmitHandler<submitType> = async (data)=>{

      await fetch("/api/createcomment", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data);
          setsumbitted(true)
        })
        .catch((errors) => {
          console.log(errors);
          setsumbitted(false)
        });
    }


    console.log(post)

    return(
        <div >
            <Header/>
           <img className='w-full h-40 object-cover' src={urlFor(post.mainImage).url()} alt="" />

            <div className="max-w-3xl mx-auto">

        
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light mb-3 text-gray-500">{post.description}</h2>

                <div className="flex space-x-3 items-center">
                  <img className='h-10 w-10 rounded-full ' src={urlFor(post.author.image).url()} alt="" />
                  <p className="font-extralight text-sm">blog by <span className="text-green-500">{post.author.name}</span> at {post._createdAt}</p>
                </div>
                <div className="mt-10">
                  <PortableText 
                    
                    className=""
                    dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={post.body}
                  serializers={{
                    h1:(props:any)=>(<h1 className="text-2xl font-bold my-5">{...props}</h1>),
                    h2:(props:any)=>(<h2 className="text-xl font-bold my-5">{...props}</h2>),
                    li:({children}:any)=>(<li className="ml-4 list-disc">{...children}</li>),
                    Link:({href,children}:any)=>(<a href={href} className="text-green-400 hover:underline">{...children}</a>),
                  }}
                  />
                </div>
                <hr className="border-yellow-400 mx-auto max-w-lg mt-3"/>
                {sumbitted?(
                <div className="flex flex-col bg-yellow-400 p-10 my-10 m-w-2xl mx-auto text-white">
                  <h2 className="text-3xl font-bold"> Summited !!</h2>
                  <p>Comment will be visible in the blog once the it is approved by the writter</p>
                </div>
                ):(
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register('_id')} type="hidden"  name="id" value={post._id}/>
                  <label className="block mb-5" >
                    <span>name</span>
                    <input {...register('name',{required:true})}  className='shadow border rounded px-3 py-2 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring' type="text" />
                    {errors.name && <p className="text-red-600" >Please enter a valid name</p>}
                  </label>
                  <label className="block mb-5" >
                    <span>Email</span>
                    <input  {...register('email',{required:true})} className='shadow border rounded px-3 py-2 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring' type="email" />
                    {errors.email && <p className="text-red-600" >Please enter a valid email </p>}
                  </label>
                  <label className="block mb-5" >
                    <span>comment</span>
                    <textarea  {...register('comment',{required:true})} className="shadow border rounded px-3 py-2 form-textarea mt-1 block w-full  ring-yellow-500 outline-none focus:ring" rows={10}></textarea>
                    {errors.comment && <p className="text-red-600">Please enter a comment</p>}
                  </label>
                  <input className='bg-yellow-400 hover:bg-yellow-600 shadow rounded outline-none px-5 py-2 w-full mb-10' type="submit" />
                </form>)}

                <div className="p-10 mb-10 shadow shadow-yellow-500 flex flex-col max-w-2xl mx-auto ">
                  <h3 className="text-2xl font-bold">Comment</h3>
                    {post.comment.map((comment)=>(
                      <p key={comment._id}><span className="text-yellow-400">{comment.name}:</span> {comment.comment}</p>
                    ))}

                  </div>

            </div>
        </div>
    )

    
}

export default Post;

export const getStaticPath = async () => {
  const query = `*[_type=="post"]{
    _id,
    slug{
      current
    }
  }
  `;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: post) => {
    return {
      params: {
        current: post.slug.current,
      },
    };
  });

  
  return{
    paths,
    fallback:'blocking'
  }
};

export const getServerSideProps = async ({params}:any)=>{

    const query = `
    *[_type=="post" && slug.current == $slug][0]{
  
      _id,
        _createdAt,
        title,  
        body,
        
        slug,
        "comment":*[_type=='comment'&&
                    post._ref==^._id&&
                    approved==true
        ],
        author->{
          name,
          image
        },
        description,
        mainImage
      
    }
    
    ` 
    
    const post = await sanityClient.fetch(query,{
        slug:params?.slug
    });


    if(!post){
        return {
            notFound:true
        }
    }

    return{
        props:{
            post
        }
    }

}
