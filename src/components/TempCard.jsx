import React from "react";
import { Skeleton } from "@mui/material";

const TempCard = ({ count }) => {
  const renderCards = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <div key={i} className="row mb-4">
          <div className="col-12 col-md-4">
            <Skeleton variant="rectangular" width="100%" height={150} />
          </div>
          <div className="col-12 col-md-8">
            <h1>
              <Skeleton />
            </h1>
            <h2>
              <Skeleton />
            </h2>
            <p>
              <Skeleton />
            </p>
            <button className="btn btn-success-subtle w-50">
              <Skeleton width="100" />
            </button>
          </div>
        </div>
      );
    }
    return cards;
  };

  return <div className="container">{renderCards()}</div>;
};

export default TempCard;
