import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoginField,
  validateLoginForm,
  resetLogin,
  resetLoginErrors,
} from "../redux/slices/loginSlice";
import { useState } from "react";

export function Login() {
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_MAINURL;

  const { loginUser, errors } = useSelector((state) => state.loginUser);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(validateLoginForm());
    setSubmitted(true);
  };

  // Submit only if no errors
  if (submitted && Object.keys(errors).length === 0) {
    fetch(`${URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Logged in:", data);
        dispatch(resetLogin());
        dispatch(resetLoginErrors());
        setSubmitted(false);
      })
      .catch((err) => {
        console.error("❌ Login error:", err);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your credentials to sign in.
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            {/* Name */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="lg"
              name="name"
              value={loginUser.name}
              onChange={handleChange}
              placeholder="Your name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            {/* Password */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              name="password"
              value={loginUser.password}
              onChange={handleChange}
              placeholder="********"
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
