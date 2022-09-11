import { Outlet, Link } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/sightings">Sightings</Link>
      <Outlet />
    </>
  );
};

export default SharedLayout;
