import React from "react";
import Process1 from "../assets/img/process1.png";
import Process2 from "../assets/img/process2.png";
import Process3 from "../assets/img/process3.png";
const Delivery = () => {
  return (
    <div className="container px-4 py-5 delivery-process">
      <h2 className="text-center display-4 mt-2 fw-bold mb-10">
        How farm direct works
      </h2>
      <div className="row g-3 py-3 row-cols-1 row-cols-sm-2 row-cols-md-3">
        <div className=" col px-5 text-center">
          <div className="mb-3">
            <img src={Process1} className="w-50 h-50" alt="" />
          </div>
          <h2>Pick your Farm</h2>
          <p>
            Paragraph of text beneath the heading to explain the heading.
            We&apos;ll add onto it with another sentence and probably just keep
            going until we run out of words.
          </p>
        </div>
        <div className="col px-5 text-center">
          <div className="mb-3">
            <img src={Process2} className="w-50 h-50" alt="" />
          </div>
          <h2>Pick your Veg</h2>
          <p>
            Paragraph of text beneath the heading to explain the heading.
            We&apos;ll add onto it with another sentence and probably just keep
            going until we run out of words.
          </p>
        </div>
        <div className="col px-5 text-center">
          <div className="mb-3">
            <img src={Process3} className="w-50 h-50" alt="" />
          </div>
          <h2>We deliver the Bag</h2>
          <p>
            Paragraph of text beneath the heading to explain the heading.
            We&apos;ll add onto it with another sentence and probably just keep
            going until we run out of words.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
