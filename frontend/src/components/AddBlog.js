import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddBlog = () => {
    const MAXLEN = 500;
    const MAXLEN_TITLE = 30;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const handleAddBlog = () => {
        if (title === '' || content === '') {
            alert("Title and Content cannot be empty");
            return;
        }

        if (content.length > MAXLEN) {
            alert("Content cannot be more than " + MAXLEN + " characters");
            return;
        }

        if (title.length > MAXLEN_TITLE) {
            alert("Title cannot be more than " + MAXLEN_TITLE + " characters");
            return;
        }   

        fetch("http://localhost:8000/docs/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": title,
                "content": content
            })
        })
        .then((res) => {
            res.json().then ((data) => {
                console.log("data", data);
                if (data.status_code >= 400) {
                    console.log("Error adding blog");
                    alert(data.message ? data.message : "Error adding blog");
                }
                else {
                    alert("Blog added successfully");
                    navigate("/");
                }
            });
        }
        )
        .catch((err) => {
            console.log("Error connecting");
            alert("Error connecting");
        });
    }

    return (
        <div className="bg-gray-100 font-sans">
            <div className="bg-white py-4">
                <h1 onClick={() => navigate("/")} className="text-3xl font-semibold text-center hover:cursor-pointer">BlogWorld</h1>
            </div>
            <div className="container mx-auto mt-8 px-4 w-full flex flex-wrap justify-around">
                <div className="w-1/2 bg-white shadow-md rounded-md p-4">
                    <h1 className="text-2xl font-semibold mb-4">Add a Blog</h1>
                    <h3 className="text-m font-semibold mb-4">Title</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500 mb-4"
                    />
                    <h3 className="text-m font-semibold mb-4">Content</h3>
                    <textarea
                        placeholder="Content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500 mb-4"
                    />
                    <button onClick={handleAddBlog} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add Blog</button>
                </div>
            </div>
        </div>
    );
}

export default AddBlog;