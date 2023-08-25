export interface post{
    _id:string,
    _createdAt:string,
    title:string,
    mainImage:string
    comment:[comment]
    slug:{
        current:string,
    }
    author:{
        name:string,
        image:string
    }
    description:string
    body:[object]
}

export interface comment{
    approved:boolean
    post: {
        _type:string,
        _ref: string
    },
    _id:string,
    rev:string,
    name:string,
    email:string,
    comment:string
    _type:string,
    _createdAt:string,
    _updatedAt:string
}