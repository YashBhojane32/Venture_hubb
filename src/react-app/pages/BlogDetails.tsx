import { useParams } from "react-router";
import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import { blogs } from "@/data/blogs";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {blog.title}
        </h1>

        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl mb-6"
        />

        <p className="text-gray-700 leading-relaxed">
          {blog.content}
        </p>
      </section>

      <Footer />
    </div>
  );
}