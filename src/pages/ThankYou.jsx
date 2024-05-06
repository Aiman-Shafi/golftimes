export default function ThankYou() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 py-10">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md">
        <div className="h-40 bg-indigo-500 pt-10 sm:h-56">
          <img
            className="h-full w-full object-contain"
            src="http://localhost:1337/uploads/a9a95fba6e8b7fa47067bf308087c6f1_793874c1c6.png"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center bg-white px-4 py-10">
          <h2 className="mb-2 text-3xl font-bold text-indigo-500 sm:text-4xl">
            Thank you!
          </h2>
          <p className="mb-8 font-medium text-gray-500">For your order!</p>
          <p className="mb-8 font-medium text-gray-500">
            We will contact you soon
          </p>
          <div className="flex items-center rounded-xl bg-indigo-500 p-4">
            <div className="ml-4 w-56">
              <p className="text-xs font-medium text-gray-100">From</p>
              <p className="font-medium text-white">GolfTimes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
