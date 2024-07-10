"use client";

import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";

/**
 * Form component for user registration and login.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of form (either "register" or "login").
 * @returns {JSX.Element} The rendered form component.
 */
const Form = ({ type }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === "register") {
      // Send a POST request to the "/api/auth/register" endpoint with the form data
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // If the registration is successful, redirect to the home page
        router.push("/");
      }

      if (res.error) {
        // If there is an error during registration, display an error toast
        toast.error("Something went wrong");
      }
    }

    if (type === "login") {
      // Sign in using the "credentials" provider with the form data
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res.ok) {
        // If the login is successful, redirect to the chats page
        router.push("/Dashboard");
      }

      if (res.error) {
        // If the login is unsuccessful, display an error toast
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 max-w-md p-4 bg-white rounded shadow-md">
        <Image
          src="/path/to/image.jpg"
          alt="logo"
          className="mb-4 w-16 h-16 mx-auto"
        />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <input
                  defaultValue=""
                  {...register("username", {
                    required: "First and Lastname is required",
                    validate: (value) => {
                      if (value.length < 5) {
                        return "First and Lastname must be at least 5 characters";
                      }
                    },
                  })}
                  type="text"
                  placeholder="First and Lastname"
                  className="w-full py-2 px-4 text-gray-700"
                />
                <SunIcon sx={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <input
                defaultValue=""
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="w-full py-2 px-4 text-gray-700"
              />
              <ImageIcon sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <input
                defaultValue=""
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be at least 5 characters and contain at least one special character";
                    }
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-full py-2 px-4 text-gray-700"
              />
              <FaceIcon sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            type="submit"
          >
            {type === "register" ? "Submit" : "Login"}
          </button>
        </form>

        {type === "register" ? (
          <Link href="/" className="link">
            <p className="text-center">Already have an account? Login here</p>
          </Link>
        ) : (
          <Link href="/register" className="link">
            <p className="text-center">
              Don&apos;t have an account? Register here
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;

// Pseudocode:
// Define a Form component that takes a type prop

//   Initialize form handling using useForm hook and destructure register, handleSubmit, watch, and formState from it
//   Initialize routing using useRouter hook

//   Define an onSubmit function that takes form data as a parameter
//     If the form type is "register"
//       Send a POST request to the "/api/auth/register" endpoint with the form data
//       If the response is successful
//         Redirect to the home page
//       If there is an error
//         Display an error toast
//     If the form type is "login"
//       Sign in using the "credentials" provider with the form data
//       If the response is successful
//         Redirect to the chats page
//       If there is an error
//         Display an error toast

//   Return a form element
//     If the form type is "register"
//       Render an input field for username with validation
//     Render an input field for email with validation
//     Render an input field for password with validation
//     Render a submit button with text that changes based on the form type
//     Render a link that allows users to switch between the registration and login forms
