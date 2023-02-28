import { Form, Link } from "react-router-dom";

function Register() {
  return (
    <div className="max-h-[754px] h-[754px] w-[576px] max-w-[576px] p-[40px] rounded shadow-2xl m-[24px] bg-white">
      <h1 className="text-headline3 font-bold">Hi There!</h1>
      <p className="text-body1 font-normal mt-[20px] text-gray1 mb-[48px]">
        Register a new account
      </p>
      <Form>
        <input
          placeholder="Enter Username Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2"
          type={"text"}
          required={true}
        />
        <input
          placeholder="Enter Email Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2 mt-[24px] "
          type={"email"}
          required={true}
        />
        <input
          placeholder="Enter Password Here"
          className="w-full h-[72px] border border-default rounded-[4px] p-[16px] outline-none focus:border-active focus:border-2 mt-[24px]"
          type={"password"}
          required={true}
        />
        <button className="w-full h-[72px] bg-primary rounded-[4px] mt-[48px] shadow-md text-white text-headline5 font-bold">
          Register
        </button>
      </Form>
      <p className="text-body1 font-normal mt-[140px] text-gray1 ">
        Already have account?{" "}
        <Link className="text-yellow-600" to={"/"}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
