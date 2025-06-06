import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface Blog { 
    "id": string;
    "title": string;
    "content": string;
    "publishedAt": string;
    "author": {
        "name": string;
    }
}       
export const useBlog = (id: string) => {
     const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<Blog>();
    const [user, setUser] = useState<string>();
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(response => {
            setBlog(response.data.blog);
            setUser(response.data.user)

            setLoading(false);
        }).catch(error => { 
            console.error("Error fetching blogs:", error);
            setLoading(false);
        })
    }, [id])
    
    return { loading, blog,user}; 
}
export const useBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [user, setUser] = useState<string>();
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
            setUser(response.data.user || "Anonymous");
        }).catch(error => { 
            console.error("Error fetching blogs:", error);
            setLoading(false);
        })
    }, [])
    
    return { loading, blogs,user }; 
}