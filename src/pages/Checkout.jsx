import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [total, setTotal] = useState(0);
  const { cart } = CartState();
  const navigate = useNavigate();

  const totalCost = () => {
    let VAT = 20;

    let price = cart.length === 0 ? 0 : cart[0].price;
    let totalPrice = price + VAT;

    setTotal(() => String(totalPrice));
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "",
    serviceName: "",
    packageType: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const postContactData = (e) => {
    e.preventDefault();

    const orderData = {
      data: {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        order_notes: formData.notes,
        payment_method: formData.paymentMethod,
        service_name: cart[0].service_name,
        package_type: cart[0].package_type,
        price: total,
      },
    };

    console.table(orderData);

    axios
      .post(`${import.meta.env.VITE_APP_URL}/api/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Order Placed Successfully");
          setFormData({
            name: "",
            phone: "",
            email: "",
            notes: "",
            paymentMethod: "",
          });
          navigate("/thank-you");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong! Please try again later");
        console.error(error);
      });
  };

  useEffect(() => {
    totalCost();
  }, []);

  return (
    <section>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Checkout
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.length !== 0 ? (
                <li
                  className="flex items-center gap-4"
                  key={cart[0].package_type}
                >
                  <img
                    src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                    alt=""
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">
                      {cart[0].service_name}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline font-semibold">
                          {cart[0].package_type}
                        </dt>
                      </div>
                    </dl>
                  </div>
                </li>
              ) : (
                <div className="font-semibold text-center">
                  Opps... No Product In Cart 🛒
                </div>
              )}
            </ul>

            {cart.length !== 0 ? (
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${cart[0].price}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>$20</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${total}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">Offer Ongoing</p>
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Checkout Form  */}
        {cart.length !== 0 ? (
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <h2 className="text-center text-2xl capitalize font-semibold my-4">
                  Continue to Payment
                </h2>
                <form
                  action="#"
                  className="space-y-4"
                  onSubmit={postContactData}
                >
                  <div>
                    <label className="sr-only" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 border-2 p-3 text-sm"
                      placeholder="Customer Name"
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 border-2 p-3 text-sm"
                        placeholder="Customer Email address"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 border-2 p-3 text-sm"
                        placeholder="Phone Number"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="notes">
                      Order Notes if any
                    </label>

                    <textarea
                      className="w-full rounded-lg border-gray-200 border-2 p-3 text-sm"
                      placeholder="Order Notes"
                      rows="3"
                      name="notes"
                      id="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <label
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        required
                        value={"Make Payment Later"}
                        className="size-4 rounded border-gray-300"
                        id="Option1"
                        name="paymentMethod"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        Make Payment Later
                      </strong>

                      <p className="mt-1 text-pretty text-sm text-gray-700">
                        (We will send you the payment link later on through
                        email)
                      </p>
                    </div>
                  </label>

                  <label
                    htmlFor="Option2"
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="Option2"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        Credit Card / Debit Cart
                      </strong>

                      <p className="mt-1 text-pretty text-sm text-gray-700">
                        (Make Payment Online)
                      </p>
                    </div>
                  </label>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className=" w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
