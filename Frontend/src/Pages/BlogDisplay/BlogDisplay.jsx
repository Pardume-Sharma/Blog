import { useContext, useState, useEffect } from 'react';
import './BlogDisplay.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios";
import { StoreContext } from '../../components/context/StoreContext';

const BlogDisplay = () => {
    const [blogList, setBlogList] = useState([]);
    const { url } = useContext(StoreContext);
    
    // Your Unsplash Access Key
    const unsplashAccessKey = 'YOUR_UNSPLASH_ACCESS_KEY';

    // Dummy blog list with keywords for image search
    const dummyBlogs = [
        { _id: '1', name: 'Tech Trends 2024', description: 'Stay ahead with the latest technology trends for 2024.', keyword: 'technology' },
        { _id: '2', name: 'Healthy Living Guide', description: 'Explore tips and tricks for a healthier lifestyle.', keyword: 'healthy living' },
        { _id: '3', name: 'Cooking at Home', description: 'Learn simple and delicious recipes you can make at home.', keyword: 'cooking' },
        { _id: '4', name: 'Exploring Nature', description: 'Join us on adventures to the most scenic nature spots.', keyword: 'nature' },
        { _id: '5', name: 'Fashion Tips and Trends', description: 'The best fashion trends to follow this season.', keyword: 'fashion' },
        { _id: '6', name: 'Digital Marketing Strategies', description: 'Effective strategies for online marketing success.', keyword: 'digital marketing' },
        { _id: '7', name: 'Travel Essentials', description: 'What you need to know before traveling internationally.', keyword: 'travel' },
        { _id: '8', name: 'Financial Planning Tips', description: 'Smart tips for managing personal finances.', keyword: 'finance' },
        { _id: '9', name: 'Home Decor Ideas', description: 'Transform your living space with these home decor ideas.', keyword: 'home decor' },
        { _id: '10', name: 'Fitness Motivation', description: 'Stay motivated with these fitness tips and stories.', keyword: 'fitness' }
    ];

    // Function to fetch images from Unsplash based on a keyword
    const fetchImage = async (keyword) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/random?query=${keyword}&client_id=${unsplashAccessKey}&count=1`);
            return response.data[0]?.urls?.regular || 'https://via.placeholder.com/400'; // Fallback image if none found
        } catch (error) {
            console.error("Error fetching image:", error);
            return 'https://via.placeholder.com/400'; // Fallback image if the API call fails
        }
    };

    useEffect(() => {
        const fetchBlogList = async () => {
            try {
                const response = await axios.get(`${url}/api/blog/listblogs`);
                setBlogList(response.data.data);
            } catch (error) {
                console.error("Error fetching blog list:", error);
            }
        };
        fetchBlogList();
    }, []);

    // If blogList is empty, use dummy data with fetched images
    const displayBlogs = blogList.length > 0 ? blogList : dummyBlogs;

    return (
        <>
            <Navbar />
            <div className="blog-menu">
                <div className="blog-display" id="blog-display">
                    <h2 className="blog-dishes-head">Top Blogs near you</h2>
                    <div className="blog-list">
                        {displayBlogs.map((item, index) => (
                            <div className="blog-item" key={item._id || index} id={item._id}>
                                {/* Fetching image from Unsplash */}
                                <img
                                    src={item.image || fetchImage(item.keyword)} // Image fallback to Unsplash
                                    alt={item.name}
                                    className="blog-image"
                                />
                                <div className="blog-content">
                                    <h3 className="blog-title">{item.name}</h3>
                                    <p className="blog-text">
                                        {item.description || "No content available"}
                                    </p>
                                    <button className="read-more">Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ads">
                    {/* Optional: Add advertisements or extra content */}
                </div>
            </div>
        </>
    );
};

export default BlogDisplay;
