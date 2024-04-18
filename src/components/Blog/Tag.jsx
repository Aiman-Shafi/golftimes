/* eslint-disable react/prop-types */

export default function Tag({ tag }) {
  return (
    <h4 className="py-2 px-4 rounded-lg inline-block bg-indigo-600 text-white mb-4 text-sm md:text-lg hover:bg-indigo-400 duration-500 cursor-pointer">
      {tag.name}
    </h4>
  );
}
