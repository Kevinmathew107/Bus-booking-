import React from "react";
import AboutBox from "../Containers/AboutBox";

const About = () => {
  const data = [
    {
      img: "benefits.png",
      title: "UNMATCHED BENEFITS",
      description:
        "We take care of your travel beyond ticketing by providing you with innovative and unique benefits.",
    },
    {
      img: "customer_care.png",
      title: "SUPERIOR CUSTOMER SERVICE",
      description:
        "We put our experience and relationships to good use and are available to solve your travel issues.",
    },
    {
      img: "lowest_Fare.png",
      title: "LOWEST PRICES",
      description:
        "We always give you the lowest price with the best partner offers.",
    },
  ];

  return (
    <div className="container">
      {/* <div className="row justify-content-center align-items-center mb-5">
        <div className="col-sm-12 col-md-6 text-center order-2 order-md-1">
          <img
            src={require(`../Assets/Images/about image.png`)}
            className="img-fluid rounded"
            alt="About Us"
          />
        </div>
        <div className="col-sm-12 col-md-6 text-center">
          <h2 className="mb-4">Welcome to Tours & Travels</h2>
          <p className="text-justify">
            Tours & Travels is your one-stop platform for all your travel needs.
            Whether you're looking for unbeatable benefits, superior customer
            service, or the lowest prices, we've got you covered. Our dedicated
            team ensures that your travel experience is seamless and unforgettable.
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        {data.map((item, index) => (
          <div key={index} className="col-sm-6 col-md-4 mb-4 col-lg-4">
            <AboutBox item={item} />
          </div>
        ))}
      </div> */}
      <section className="my-5" id="about-us">
        <div className="container">
          <h2 className="text-center mb-5">About Us</h2>
          <div className="row">
            <div className="col-md-6">
              <p>
                We are a bus booking platform dedicated to providing a seamless
                and convenient booking experience for our customers. Our web
                software solution allows you to easily reserve seats, cancel
                reservations, and make enquiries with just a few clicks. We
                store your data, scheduled routes, and other information to make
                your future bookings even faster and more personalized.
              </p>
              <p>
                Our team is passionate about making bus travel accessible and
                enjoyable for everyone. We are constantly working to improve our
                platform and add new features to make your experience even
                better.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={require(`../Assets/Images/bus1.jpg`)}
                alt="Our team"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
