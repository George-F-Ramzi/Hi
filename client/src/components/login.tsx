import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import { LoginApi } from "../Api/userApi";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import FormError from "./formError";
import { toast } from "react-toastify";

let loading: boolean = false;

export async function LoginAction({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  try {
    let response: AxiosResponse = await LoginApi({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    localStorage.setItem("token", response.headers["x-auth-token"]);
    loading = false;
    return redirect("/home");
  } catch (error) {
    let message: string = "";
    loading = false;
    if (error instanceof AxiosError) {
      message = error.response?.data;
      return message.toLowerCase();
    } else return "Sometihng Wrong Happen";
  }
}

function Login() {
  let message = useActionData() as string;
  const [errorMessage, setErrorMessage] = useState<string>("Hello");

  useEffect(() => {
    loading = false;
    if (typeof message === "string" && message.includes("something")) {
      toast("Something Wrong Happen", { type: "error" });
    } else setErrorMessage(message);
  }, [message]);

  return (
    <div className="max-h-[754px] h-[754px] w-[576px] max-w-[576px] p-[40px] rounded shadow-2xl m-[24px] bg-white">
      <h1 className="text-headline3 font-bold">Welcome Back!</h1>
      <p className="text-body1 font-normal mt-[20px] text-gray1 mb-[48px]">
        Login to your account
      </p>
      <Form
        onSubmit={() => {
          loading = true;
        }}
        action="/login"
        method="post"
      >
        <input
          placeholder="Enter Email Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2"
          type={"email"}
          required={true}
          name={"email"}
        />
        {typeof errorMessage === "string" && errorMessage.includes("email") ? (
          <FormError error={"Invaild Email"} />
        ) : (
          ""
        )}
        <input
          placeholder="Enter Password Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2 mt-[24px]"
          type={"password"}
          required={true}
          name={"password"}
        />
        {typeof errorMessage === "string" &&
        errorMessage.includes("password") ? (
          <FormError error={"Invaild Password"} />
        ) : (
          ""
        )}
        {loading ? (
          <button
            disabled
            className="w-full h-[72px] bg-primary rounded-[4px] mt-[48px] shadow-md text-white text-headline5 font-bold"
          >
            Loading...
          </button>
        ) : (
          <button className="w-full h-[72px] bg-primary rounded-[4px] mt-[48px] shadow-md text-white text-headline5 font-bold">
            Login
          </button>
        )}
      </Form>
      <p className="text-body1 font-normal mt-[80px] text-gray1 ">
        You Don't Have Account?{" "}
        <Link className="text-yellow-600" to={"/join"}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
