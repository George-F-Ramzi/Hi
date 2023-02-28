import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import { LoginApi } from "../Api/userApi";

let loading: boolean = false;

export async function LoginAction<T, G>({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  try {
    let response = await LoginApi({
      email: formData.get("email"),
      passwrod: formData.get("password"),
    });
    localStorage.setItem("token", response.headers["x-auth-token"]);
    loading = false;
    return redirect("/home") as T;
  } catch (error: any) {
    loading = false;
    return error.response.data as G;
  }
}

function Login() {
  return (
    <div className="max-h-[754px] h-[754px] w-[576px] max-w-[576px] p-[40px] rounded shadow-2xl m-[24px] bg-white">
      <h1 className="text-headline3 font-bold">Welcome Back!</h1>
      <p className="text-body1 font-normal mt-[20px] text-gray1 mb-[48px]">
        Login to your account
      </p>
      <Form>
        <input
          placeholder="Enter Email Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2"
          type={"email"}
          required={true}
          name={"email"}
        />
        <input
          placeholder="Enter Password Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2 mt-[24px]"
          type={"password"}
          required={true}
          name={"password"}
        />
        <button className="w-full h-[72px] bg-primary rounded-[4px] mt-[48px] shadow-md text-white text-headline5 font-bold">
          Login
        </button>
      </Form>
      <p className="text-body1 font-normal mt-[190px] text-gray1 ">
        You Don't Have Account?{" "}
        <Link className="text-yellow-600" to={"/join"}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
