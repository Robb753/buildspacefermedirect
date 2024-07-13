import React from "react";
import Turnip from "../assets/img/turnip.png";
import Celery from "../assets/img/Celery.png";
import Amaranth from "../assets/img/Amaranth.png";
import Veg1 from "../assets/img/veg1.jpg";
import Veg2 from "../assets/img/veg2.jpg";
import Veg3 from "../assets/img/veg3.jpg";
import HProduct from "../Components/HProduct";

const Healthy = () => {
  return (
    <div className="container-fluid px-4 py-5 healthy">
      <h2 className="text-center display-4 mt-4 fw-bold">
        It's Healthy Eating Made Easy
      </h2>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <HProduct
            Image={Veg1}
            Image2={Turnip}
            Title="Delicious"
            Description="Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce"
          />
          <HProduct
            Image={Veg2}
            Image2={Amaranth}
            Title="Delicious"
            Description="Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce"
          />
          <HProduct
            Image={Veg3}
            Image2={Celery}
            Title="Delicious"
            Description="Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce"
          />
        </div>
      </div>
    </div>
  );
};

export default Healthy;
