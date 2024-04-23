import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function BlogCard({ blog }) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <img
        alt={blog.attributes.Title}
        src={`${import.meta.env.VITE_APP_URL}${
          blog?.attributes.Image.data[0].attributes.url
        }`}
        className="h-56 w-full object-cover"
      />

      <div className="bg-white p-4 sm:p-6">
        {/* <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          {" "}
          10th Oct 2022{" "}
        </time> */}

        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">
            {blog.attributes.Title}
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {blog.attributes.Excerpt.slice(0, 120)}....
        </p>

        <Link to={`/blog/${blog.id}`}>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-md mt-4 duration-500 hover:bg-black">
            Read Blog
          </button>
        </Link>
      </div>
    </article>
  );
}
