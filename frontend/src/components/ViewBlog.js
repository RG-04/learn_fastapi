import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewBlog = () => {

    const [blog, setBlog] = useState({"id": "myBlog", "content": "This is my blog"});
    const [similarBlogs, setSimilarBlogs] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/docs/${id}`)
        .then((res) => {
            res.json().then ((data) => {
                console.log(data);
                if (data.status_code >= 400) {
                    console.log("Error fetching data");
                    alert("Error fetching data");
                }
                else {
                    setBlog({id: id, content: data.doc});
                }
            });
        }
        )
        .catch((err) => {
            console.log("Error connecting");
            alert("Error connecting");
        });

        fetch(`http://localhost:8000/docs/${id}/similar`)
        .then((res) => {
            res.json().then ((data2) => {
                console.log(data2);
                if (data2.status_code >= 400) {
                    console.log("Error fetching data");
                    alert("Error fetching data");
                }
                else {
                    setSimilarBlogs(data2.docs);
                }
            });
        }
        )
    }
    , [id]);

    return (
        <div className="bg-gray-100 font-sans">
            <div className="bg-white py-4">
                <h1 onClick={() => navigate("/")} className="text-3xl font-semibold text-center hover:cursor-pointer">BlogWorld</h1>
            </div>
            <div className="container mx-auto mt-8 px-4 w-full flex flex-wrap justify-around">
                <div className="w-1/2 bg-white shadow-md rounded-md p-4">
                    <h1 className="text-2xl font-semibold mb-4">{blog.id}</h1>
                    <p>{blog.content}</p>
                </div>
                
            </div>
            {similarBlogs.length > 0 ? (<div className="w-1/2 mx-auto my-4 bg-white shadow-md rounded-md p-4">
                        <h1 className="text-2xl font-semibold mb-4">Similar Blogs:</h1>
                        {similarBlogs.map((similarBlog) => (
                            <div onClick={() => navigate("/blogs/" + similarBlog.id)} key={similarBlog.id} className="mb-4 shadow-md rounded-md p-2 transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
                                <h1 className="text-xl font-semibold">{similarBlog.id}</h1>
                                <p>{similarBlog.content.length > 50 ? similarBlog.content.substring(0, 50) + "..." : similarBlog.content}</p>
                            </div>
                        ))}
                    </div>) : (<></>)}
        </div>
    );
}

export default ViewBlog;