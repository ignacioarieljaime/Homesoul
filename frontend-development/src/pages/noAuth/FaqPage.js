import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CollapseItem from "../../admin/component/mpPlan/CollapseItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, Collapse } from "reactstrap";

const FaqPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: 180, marginBottom: 50 }}>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div
            style={{
              width: "5px",
              height: "30px",
              background: "#707070 0% 0% no-repeat padding-box",
            }}
          ></div>
          <p
            style={{
              color: "#2B2A29",
              fontSize: "30px",
              fontFamily: "Work Sans",
              fontWeight: 500,
              textAlign: "center",
              margin: 0,
            }}
          >
            Frequently Asked Questions
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div style={{ width: "70%" }}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
            <CollapseItem key={index}>
              {({ isOpen, toggleCollapse }) => (
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "10px 10px 10px #0000000D",
                    borderColor: "black",
                    borderRadius: "20px",
                    width: "100%",
                    display: "flex",
                    padding: "27px",
                    flexDirection: "column",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                  onClick={toggleCollapse}
                >
                  <div className="d-flex justify-content-between ">
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "22px",
                        fontWeight: 500,
                        color: "#2B2A29",
                      }}
                    >
                      * Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry?
                    </p>
                    <div color="primary" style={{ marginBottom: "1rem" }}>
                      <FontAwesomeIcon
                        style={{
                          color: "#AEADAD",
                          height: "1.5rem",
                        }}
                        icon={isOpen ? faCircleChevronUp : faCircleChevronDown}
                      />
                    </div>
                  </div>
                  <Collapse isOpen={isOpen}>
                    <Card
                      style={{
                        border: "none",
                      }}
                    >
                      <CardBody
                        style={{ fontSize: "20px", fontFamily: "Work Sans" }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              )}
            </CollapseItem>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FaqPage;
