// src/components/Profile.js
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUser, FaStoreAlt } from "react-icons/fa";

const ProfileLayout = () => {
  const location = useLocation();
  const isProfile = location.pathname === "/profile";
  const isMyPredictions = location.pathname === "/profile/my-predictions";

  return (
    <div className="container pt-2">
      <div className="row gap-2">
        <div className="col-md-12">
          <nav className="nav flex-row justify-content-end gap-2">
            <Link
              className={`text-decoration-none nav-item bg-glass px-2 py-1 rounded-4 gap-2 poppins-light text-light d-flex align-items-center ${
                isProfile ? "rgrad-3" : ""
              }`}
              to="/profile"
            >
              <FaUser className="mr-2" />
              Profile
            </Link>
            <Link
              className={`text-decoration-none nav-item bg-glass px-2 py-1 rounded-4 gap-2 poppins-light text-light d-flex align-items-center ${
                isMyPredictions ? "rgrad-3" : ""
              }`}
              to="/profile/my-predictions"
            >
              <FaStoreAlt className="mr-2" />
              My Predictions
            </Link>
          </nav>
        </div>
        <div className="col-md-12 bg-glass rounded-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
