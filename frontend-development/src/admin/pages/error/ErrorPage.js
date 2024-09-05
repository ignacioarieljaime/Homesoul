import React from "react";
import Header from "../../component/Header";
import bottomImage from "../../assets/images/error/error-bottom.png";
import rightImage from "../../assets/images/error/error-right.png";

const ErrorPage = () => {
  return (
    <div>
      <Header />

      <div
        className="w-100 d-flex justify-content-center "
      >
        <div
          className="row justify-content-center"
        >
          <div
            style={{paddingLeft: "111px" }}
            className="col-md-6"
          >
            <p
              style={{
                fontFamily: "Work Sans",
                color: "#1EAF67",
                fontSize: "50px",
                fontWeight: 600,
                marginBottom: "12px",
                marginTop: "50px",
              }}
            >
              ERROR 404
            </p>
            <p
              style={{
                fontFamily: "Work Sans",
                fontWeight: "500",
                fontSize: "30px",
              }}
            >
              PAGE NOT FOUND!
            </p>
            <p
              style={{
                fontFamily: "Work Sans",
                fontStyle: "italic",
                fontSize: "24px",
                marginTop: "15px",
                color: "#707070",
              }}
            >
              Oops! Looks like something wrong. We are working on it. Sorry!
            </p>
          </div>

          <img
            className="col-md-6"
            style={{
              maxWidth:"370px",
              objectFit:'contain'
            }}
            src={rightImage}
          />
        </div>
      </div>
      <div>
        <img
          style={{
            width:"50%",
            maxWidth:"470px",
            marginLeft: "20%",
            objectFit:"contain"
          }}
          src={bottomImage}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
