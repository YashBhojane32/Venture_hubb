import { Link } from "react-router";
import { Calendar } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          {blog.date}
        </div>

        <p className="text-gray-600 text-sm">
          {blog.excerpt}
        </p>
      </div>
    </Link>
  );
}