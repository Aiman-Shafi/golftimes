import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Tag from "./Tag";

export default function SingleBlogPage() {
  const { id } = useParams();
  const {
    data: blog,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_APP_URL}/api/blogs/${id}?populate=*`);

  if (loading) {
    return (
      <div className="max-w-6xl text-center mx-auto py-40">
        <h2 className="text-center text-xl text-indigo-400 uppercase">
          loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl text-center mx-auto py-40">
        <h2 className="text-center text-xl text-slate-700 uppercase">
          Something Went Wrong!
        </h2>
      </div>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 lg:px-8 lg:py-20">
        <p className="py-2 px-4 rounded-lg inline-block bg-indigo-100 text-indigo-600 mb-4 text-sm md:text-lg">
          {blog.attributes.Category}
        </p>
        <h2 className="text-2xl font-bold sm:text-4xl text-indigo-700 mb-6 md:text-4xl">
          {blog.attributes.Title}
        </h2>
        <div>
          <img
            src={`${import.meta.env.VITE_APP_URL}${
              blog?.attributes.Image.data[0].attributes.url
            }`}
            alt={blog.attributes.Title}
            className="h-[200px] w-full object-cover drop-shadow-xl duration-500 hover:grayscale rounded-xl md:h-[400px]"
          />
        </div>
        <article className="prose mx-auto mt-10">
          <BlocksRenderer content={blog.attributes.Description} />
        </article>
        <div className="mt-10">
          <h3 className="mb-4">Tags</h3>
          <div className="flex gap-2">
            {blog.attributes.Tags?.map((tag) => (
              <Tag key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
