import { useEffect, useState } from 'react';
import './ListBlogs.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListBlogs = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/blog/listblogs`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeBlog = async (_id) => {
    try{
      const response = await axios.post(`${url}/api/blog/removeblog`, { id: _id });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Error");
      }
    }
    catch(error)
    {
      console.log("Error removing Blog:",error);
      toast.error("An error while trying to remove the blog");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className='list add flex-col'>
        <p>All Blogs List</p>
        <div className='list-table'>
          <div className='list-table-format title'>
            <b>Image</b>
            <b>Title</b>
            <b>Category</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/` + item.image} alt='' />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p
                  onClick={() => {
                    removeBlog(item._id);
                  }}
                  className='cursor'
                >
                  X
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListBlogs;
