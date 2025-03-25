import { Box, Typography } from "@mui/material";

import React from "react";
import Carousel from "react-material-ui-carousel";
import descData from "./tempdata";

const Item = (props) => {
  const cardStyles = {
    position: "relative",
    width: "100%",
    height: "110vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(rgba(0, 1, 1, 0.3), rgba(1, 0, 0.5)), url(" +
      props.item.img +
      ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff", 
  };

  const contentStyles = {
    textAlign: "center",
  };
  return (
    <Box style={cardStyles}>
      <div style={contentStyles}>
        <Typography variant="h2">Welcome to Tours & Travels Website</Typography>
        <Typography variant="h5">{props.item.subHeading}</Typography>
        <Typography variant="h6" >
          {props.item.description}
        </Typography>
      </div>
    </Box>
  );
};
const Document = () => {
  return (
    <>
      <Carousel
        indicators={true}
        animation="fade"
        autoPlay={true}
        interval={4000}
        stopAutoPlayOnHover={false}
        navButtonsAlwaysInvisible={false}
      >
        {descData.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Carousel>
    </>
  );
};

export default Document;
