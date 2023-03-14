import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AllowJoin } from "../Api/userApi";

function LandingPage() {
  let navigate = useNavigate();
  useEffect(() => {
    FastJoin();
  }, []);

  const FastJoin = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      await AllowJoin();
      navigate("/home");
    } catch (error) {
      toast("Login Session Expired", { type: "error" });
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="w-screen h-screen bg-landing relative flex items-center justify-center">
      <h5 className="absolute top-6 left-6 text-headline5 text-white font-bold">
        Hi
      </h5>
      <Outlet />
    </div>
  );
}

export default LandingPage;
