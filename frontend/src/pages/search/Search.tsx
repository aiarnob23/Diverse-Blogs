import { useEffect, useState } from "react";
import { fetchBlogsBySearchTerm } from "../../services/blogService";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<any>([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (searchTerm.trim() === "") {
        setBlogs([]);
        return;
      }
        const data = await fetchBlogsBySearchTerm(searchTerm);
        setBlogs(data);
    };
    fetchBlogs();
  }, [searchTerm]);
  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for blogs..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {blogs?.length && (
          <>
            {blogs.map((blog: any) => (
              <div className="cursor-pointer" onClick={() => navigate(`/user/blog/${blog?._id}`)}>
                <div className="card glass w-96">
                  <figure>
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      alt="car!"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{blog?.title}</h2>
                    <p>How to park your car at your garage?</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Learn now!</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
