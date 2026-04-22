import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import BlogCard from "@/react-app/components/blog/BlogCard";
import { blogs } from "@/data/blogs";

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          Travel Blog
        </h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}