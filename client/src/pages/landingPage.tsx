import { Outlet } from "react-router-dom";

function LandingPage() {
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
