// import { useContext, useState } from 'react';
import './BlogDisplay.css'
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
// import { StoreContext } from '../../components/context/StoreContext';

const BlogDisplay = () => {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
      const fetchBlogList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/blog/listblogs`);
            setBlogList(response.data.data);
        } catch (error) {
            console.error("Error fetching blog list:", error);
        }
    };
    fetchBlogList();
    }, [])

    return (
      <>
      <Navbar/>
        <div className="blog-menu">
          <div className="blog-display" id="blog-display">
            <h2 className="blog-dishes-head">Top Blogs near you</h2>
            <div className="blog-list">
              {blogList && blogList.length > 0 &&  (
                blogList.map((item, index) => (
                  <div className="blog-item" key={item._id || index} id={item._id}>
                    <img
                      src={`http://localhost:4000/images/${item.image}`}
                      alt={item.title}
                      className="blog-image"
                    />
                    <div className="blog-content">
                      <h3 className="blog-title">{item.name}</h3>
                        <p className="blog-text">
                        {item.description ? item.description : "No content available"}
                      </p>
                      <button className="read-more">Read More</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
  
          <div className="ads">
            
          </div>
        </div>
      </>
    );
  };
  
export default BlogDisplay;