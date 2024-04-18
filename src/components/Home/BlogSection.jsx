import useFetch from "../../hooks/useFetch";
import BlogCard from "../Blog/BlogCard";

export default function BlogSection() {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_URL}/api/blogs?populate=*`
  );

  if (loading) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Something Went Wrong!</h2>
      </div>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 py-10 sm:py-12 lg:px-8 lg:py-40">
        <h2 className="text-3xl font-bold sm:text-4xl text-indigo-700 mb-10">
          Our Insights
        </h2>
        <div className="grid grid-cols-3 gap-10">
          {data?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </>
  );
}
