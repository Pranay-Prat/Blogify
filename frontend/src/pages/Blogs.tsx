import AppBar from "../components/Appbar" 
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { formatDate } from "../components/Date"
const Blogs = () => {
    const {loading, blogs,user} = useBlogs();
    if(loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
    </div>
}
    
    return (
        <div>
            <AppBar authorName={user || "Anonymous"} /> 
            <div className="min-h-screen bg-gray-50 px-4 py-8">
                <div className="w-full max-w-4xl mx-auto">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={formatDate(blog.publishedAt)} 
                            id={blog.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blogs;