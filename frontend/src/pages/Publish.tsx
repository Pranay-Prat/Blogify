import { useEffect, useRef, useState } from "react";
import AppBar from "../components/Appbar";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Publish = () => {
  const [title, setTitle] = useState("");
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Tell your story...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
  const text = quillInstance.current?.getText();
  
  if (text !== undefined) {
    setContent(text.trim()); 
  }
});
    }
  }, []);
const name = localStorage.getItem("name");
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <AppBar authorName={name || "Anonymous"} />

      <div className="flex justify-center items-start pt-10 px-4">
        <div className="w-full max-w-4xl ml-4">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Title"
              className="text-3xl font-serif text-gray-600 dark:text-gray-200 placeholder-gray-400 focus:outline-none border-none mb-4 bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div
              ref={quillRef}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 h-[60vh]"
            />
            <div className="mt-6">
              <button onClick={async()=>{
                console.log(content);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {
                    title,
                    content},{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`}
                    })
                if (response.status === 200) {
                    setTitle("");
                    if (quillInstance.current) {
                        quillInstance.current.setText("");
                    }
                    setContent("");
                    toast.success("Blog published successfully!");
                    navigate(`/blog/${response.data.id}`);
                }                    
                    }} type="submit" className="btn btn-outline btn-success">Publish Blog</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
