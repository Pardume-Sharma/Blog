import blogModel from '../models/blogModel.js';
import fs,{appendFile} from 'fs';

const addBlog = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const blog = new blogModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await blog.save();
        res.json({ success: true, message: 'Blog Added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

const listBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

const removeBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.body.id);
        if (!blog) {
            return res.json({ success: false, message: "Blog item not found" });
        }
        fs.unlink(`uploads/${blog.image}`, (err) => {
            if (err) {
                console.error("Error deleting the image file:", err);
            }
        });
        await blogModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Blog Removed" });
    } catch (error) {
        console.error("Error removing blog:", error);
        res.json({ success: false, message: "Error removing blog" });
    }
};

export { addBlog, listBlogs, removeBlog };
