import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const [blogs, setBlogs] = useState([]);

    const [search, setSearch] = useState("");

    const searchBlog = (e) => {
        setSearch(e.target.value);
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/docs/")
        .then((res) => {
            res.json().then ((data) => {
                console.log(data);
                if (data.status_code >= 400) {
                    console.log("Error fetching data");
                    alert("Error fetching data");
                }
                else {
                    setBlogs(data.docs);
                }
            });
        }
        )
        .catch((err) => {
            console.log("Error connecting");
            alert("Error connecting");
        });
    }
    , []);

    return (
        <div className="bg-gray-100 font-sans">
    <div className="bg-white py-4">
        <h1 className="text-3xl font-semibold text-center">BlogWorld</h1>
    </div>
    <div className="flex justify-between items-center mb-10 w-1/2 mt-4 mx-auto">
            <div className="w-full max-w-md bg-white shadow-md rounded-md mr-2">
              <input
                type="text"
                placeholder="Search blogs by id ..."
                name="search"
                value={search}
                onChange={searchBlog}
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500"
              />
            </div>
    <button onClick={() => navigate("/add")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-auto block">Add Blog</button>
    </div>
    <div className="container mx-auto mt-8 px-4 w-full flex flex-wrap justify-around">
        {blogs.filter((blog) => blog.id.includes(search)).map((blog) => (
        <div onClick={() => navigate("/blogs/" + blog.id)} className="bg-white rounded-lg shadow-md p-6 mb-4 mx-2 flex-wrap w-1/4 transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
            <h2 className="text-xl font-semibold">{blog.id}</h2>
            <p className="mt-2 text-gray-700">{blog.content.length > 50 ? blog.content.substring(0, 50) + "..." : blog.content}</p>
        </div>
        ))}
    </div>
</div>
    );
    }

export default Home;