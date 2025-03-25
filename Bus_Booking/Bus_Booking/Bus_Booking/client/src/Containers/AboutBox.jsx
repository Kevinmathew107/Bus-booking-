import React from "react";

const AboutBox = (props) => {
  console.info(props);
  const { img, title, description } = props.item;
  return (
    <div className="col-md-4 col-lg-12">
      <div className="card bg-danger text-white p-2 d-flex flex-column" style={{height:"600px", borderRadius: "15px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center">
          <img
            src={require(`../Assets/Images/${img}`)}
            alt={title}
            className="card-img-top"
            style={{ objectFit: "contain", maxHeight: "200px" }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{title}</h5>
          <p className="card-text flex-grow-1" style={{ fontSize: "1rem" }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutBox;
