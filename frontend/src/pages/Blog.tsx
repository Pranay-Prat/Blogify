import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { formatDate } from "../components/Date";
import AppBar from "../components/Appbar";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  if (typeof id === "undefined") {
    return (

      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  const { loading, blog, user } = useBlog(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!blog) {
    return (
       <div>
        <AppBar authorName={user || "Anonymous"} />
        <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">Blog not found</span>
      </div>
       </div>
      
    );
  }

  const firstLetter = blog.author.name.charAt(0).toUpperCase();

  return (
     
    <div className="min-h-screen bg-white">
       <AppBar authorName={user || "Anonymous"} />
      <div className="w-full h-[1px] bg-gray-300"></div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex gap-12">
          <div className="flex-1">
            <h1 className="text-5xl font-poppins font-bold text-black mb-2 leading-tight">{blog.title}</h1>
            <p className="text-gray-600 text-base font-poppins mb-6">Posted on {formatDate(blog.publishedAt)}</p>
            <div className="text-gray-800 leading-relaxed space-y-4">
              <p className="whitespace-pre-wrap font-poppins">{blog.content}</p>
            </div>
          </div>
          <div className="w-80">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-poppins font-semibold text-gray-500 uppercase tracking-wide mb-2">Author</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-poppins font-medium text-lg">{firstLetter}</span>
                </div>
                <div>
                  <h4 className="font-bold font-poppins text-black text-lg">{blog.author.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>

    </div>
  );
};

export default Blog;
