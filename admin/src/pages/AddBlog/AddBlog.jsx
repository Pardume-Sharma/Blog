import { useState } from 'react';
import './AddBlog.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';
import { Link} from "react-router-dom";

const AddBlog = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Technology"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data, [name]: value
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('image', image);
        
        const response = await axios.post(`${url}/api/blog/addblog`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                category: "Technology"
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <>
            <div className='add'>
                <form className='flex-col' onSubmit={onSubmitHandler}>
                    <div className='add-img-upload flex-col'>
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=''/>
                        </label>
                        <input onChange={(e) => {
                            setImage(e.target.files[0]);
                        }} type='file' id='image' hidden required />
                    </div>

                    <div className='add-blog-title flex-col'>
                        <p>Blog Title</p>
                        <input onChange={onChangeHandler} value={data.name} type='text' required name='name' placeholder='Enter Title Here' />
                    </div>
                    
                    <div className='add-blog-description flex-col'>
                        <p>Blog Description</p>
                        <textarea onChange={onChangeHandler} value={data.description} rows='6' required name='description' placeholder='Write Content Here' />
                    </div>
                    
                    <div className='add-category'>
                        <div className='add-category-select flex-col'>
                            <p>Blog Category</p>
                            <select onChange={onChangeHandler} required name='category'>
                                <option value='Technology'>Technology</option>
                                <option value='Health'>Health</option>
                                <option value='Food'>Food</option>
                                <option value='Travel'>Travel</option>
                                <option value='Education'>Education</option>
                                <option value='Lifestyle'>Lifestyle</option>
                                <option value='Business'>Business</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit' className='add-btn'>Add </button>
                    <Link to='/listBlogs'>
                        <button className='add-btn'>View Blogs</button>
                    </Link>
                </form>
            </div>
        </>
    );
}

export default AddBlog;
