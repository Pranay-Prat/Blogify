import Avatar from "./Avatar";
import { Link } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    return (
    
        <div className="border-b border-gray-300 pb-4 mb-6">
            
            <div className="flex items-center text-xs text-gray-600 mb-2">
                <div className="mr-2 w-5 h-5">
                    <Avatar name={authorName} />
                </div>
                <span className="font-medium">{authorName}</span>
                <span className="mx-1">∙</span>
                <span>{publishedDate}</span>
            </div>

            <div className="text-xl font-semibold font-poppins text-gray-900 mb-1 leading-snug">
                <Link to={`/blog/${id}`} className="hover:text-gray-400 transition-colors duration-200">
                    
                {title}
                </Link>
            </div>

            <div className="text-sm font-poppins text-gray-700 mb-2">
                {content.slice(0, 100) + "..."}
            </div>

            <div className="text-xs text-gray-500">
                {`${Math.ceil(content.trim().split(/\s+/).length / 150)} min read`}
            </div>
        </div>
    );
};



export default BlogCard;