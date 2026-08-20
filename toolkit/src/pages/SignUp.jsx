import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import {
  resetErrors,
  resetSign,
  validateForm,
  updateSignField,
} from "../redux/slices/signUpSlice";

export function SignUp() {
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_MAINURL;

  const { signUser, errors } = useSelector((state) => state.signUser);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSignField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(validateForm());
    setSubmitted(true);
  };

  // Send only if no errors and form was submitted
  if (submitted && Object.keys(errors).length === 0) {
    fetch(`${URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(signUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Registered:", data);
        dispatch(resetSign());
        dispatch(resetErrors());
        setSubmitted(false);
      })
      .catch((err) => {
        console.error("❌ Error:", err);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            {/* Name */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              name="name"
              value={signUser.name}
              onChange={handleChange}
              placeholder="John"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            {/* Email */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              type="email"
              value={signUser.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            {/* Password */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              name="password"
              value={signUser.password}
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

          {/* Terms Checkbox (Optional UI) */}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button type="submit" className="mt-6" fullWidth>
            Sign Up
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
