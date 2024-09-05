import React, { useState } from "react";
import Header from "../../../component/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  CardBody,
  Card,
  Collapse,
} from "reactstrap";
import CollapseItem from "../../../component/mpPlan/CollapseItem";
import SwitchButton from "../../../component/newAudit/SwitchButton";

const MyPlan = () => {


  const data = [
    {
      title: "Main Features",
      checked1: false,
      checked2: false,
      checked3: false,
      isHeading: true,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: false,
      checked2: false,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: false,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Other Perks",
      checked1: false,
      checked2: false,
      checked3: false,
      isHeading: true,
    },
    {
      title: "Lorem Ipsum",
      checked1: false,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: false,
      checked2: false,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: false,
      checked2: false,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: true,
      checked2: true,
      checked3: true,
      isHeading: false,
    },
    {
      title: "Lorem Ipsum",
      checked1: false,
      checked2: false,
      checked3: false,
      isHeading: false,
    },
  ];

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center flex-column">
        <p
          style={{
            fontSize: "33px",
            fontFamily: "Work Sans",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Adaptable packages crafted to suit your business needs.
        </p>

        <p
          style={{
            fontSize: "22px",
            fontFamily: "Work Sans",
            textAlign: "center",
          }}
        >
          "Gain the authority, management, and personalization tools needed to
          run your business."
        </p>
        <p
          style={{
            fontSize: "30px",
            fontFamily: "Work Sans",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Choose Your Plan
        </p>
        <div className="d-flex justify-content-center ">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Work Sans",
              textAlign: "center",
              width: "64%",
              marginTop: "20px",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since …"
          </p>
        </div>
        <div className="d-flex justify-content-center  flex-row mb-4  mt-4">
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "16px",
              color: "#707070",
              fontWeight: 500,
            }}
          >
            Monthly Billing
          </p>
          <div
            style={{
              margin: "0px 40px",
            }}
          >
            <SwitchButton />
          </div>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "16px",
              color: "#2B2A29",
              fontWeight: 500,
            }}
          >
            Annually Billing
          </p>
        </div>

        {/* plan box  */}

        <div
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 0px 10px #0000000D",
            borderRadius: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "27px",
            marginBottom: "50px",
          }}
          className="plan-types-cards"
        >
          <div className=" w-100 d-flex justify-content-center align-items-center">
            <div
              style={{
                width: "247px",
                height: "241px",
              }}
            ></div>
          </div>
          <div className="d-flex flex-row gap-3 myplan-box plan-types-cards">
            <div
              style={{
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "20px",
                width: "260px",
                height: "314px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "23px",
                  fontFamily: "Work Sans",
                  fontWeight: 500,
                  marginBottom: "0px",
                  marginTop: "10px",
                }}
              >
                Free
              </p>
              <div className="d-flex justify-content-center ">
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "Work Sans",
                    letterSpacing: "0px",
                    lineHeight: "18px",
                    marginTop: "30px",
                    marginBottom: "24px",
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div>
                <p
                  style={{
                    paddingBottom: "0px",
                    marginBottom: "-10px",
                    textAlign: "center",
                    fontSize: "23px",
                    fontFamily: "Work Sans",
                    fontWeight: 500,
                  }}
                >
                  $50
                </p>
                <p
                  style={{
                    paddingBottom: "0px",
                    marginBottom: "0px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontFamily: "Work Sans",
                  }}
                >
                  Per Month
                </p>
              </div>
              <div
                style={{
                  marginTop: "36px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "27px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#707070",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontFamily: "Work Sans",
                    color: "#FFFFFF",
                    padding: "6px 20px",
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div
              style={{
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "20px",
                width: "260px",
                height: "314px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "23px",
                  fontFamily: "Work Sans",
                  fontWeight: 500,
                  marginBottom: "0px",
                  marginTop: "10px",
                }}
              >
                Gold
              </p>
              <div className="d-flex justify-content-center ">
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "Work Sans",
                    letterSpacing: "0px",
                    lineHeight: "18px",
                    marginTop: "30px",
                    marginBottom: "24px",
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div>
                <p
                  style={{
                    paddingBottom: "0px",
                    marginBottom: "-10px",
                    textAlign: "center",
                    fontSize: "23px",
                    fontFamily: "Work Sans",
                    fontWeight: 500,
                  }}
                >
                  $100
                </p>
                <p
                  style={{
                    paddingBottom: "0px",
                    marginBottom: "0px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontFamily: "Work Sans",
                  }}
                >
                  Per Month
                </p>
              </div>
              <div
                style={{
                  marginTop: "36px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "27px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontFamily: "Work Sans",
                    color: "#2B2A29",
                    padding: "6px 20px",
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div
              style={{
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "20px",
                width: "260px",
                height: "314px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "23px",
                  fontFamily: "Work Sans",
                  fontWeight: 500,
                  marginBottom: "0px",
                  marginTop: "10px",
                }}
              >
                Platinum
              </p>
              <div className="d-flex justify-content-center ">
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "Work Sans",
                    letterSpacing: "0px",
                    lineHeight: "18px",
                    marginTop: "30px",
                    marginBottom: "24px",
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div>
                <p
                  style={{
                    paddingBottom: "0px",
                    marginBottom: "-10px",
                    textAlign: "center",
                    fontSize: "23px",
                    fontFamily: "Work Sans",
                    fontWeight: 500,
                  }}
                >
                  $150
                </p>
                <p
                  style={{
                    paddingBottom: "0px",
                    marginBottom: "0px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontFamily: "Work Sans",
                  }}
                >
                  Per Month
                </p>
              </div>
              <div
                style={{
                  marginTop: "36px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "27px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontFamily: "Work Sans",
                    color: "#2B2A29",
                    padding: "6px 20px",
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center ">
              <div
                style={{
                  width: "79px",
                  height: "79px",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* plan feature  */}

        <div>
          <p
            style={{
              fontSize: "30px",
              fontFamily: "Work Sans",
              fontWeight: 500,
              letterSpacing: "0px",
              paddingLeft: "35px",
              marginBottom: "18px",
            }}
          >
            What Will You Get
          </p>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 0px 10px #0000000D",
              borderRadius: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "27px",
              marginBottom: "50px",
              paddingLeft: "64px",
              paddingTop: "50px",
              paddingBottom: "50px",
            }}
            className="overflow-scroll scrollbar-hidden"
          >
            <div className="d-flex flex-column w-100">
              {data.map((value, index) => {
                return (
                  <div key={index} className="d-flex flex-row ">
                    <div className="d-flex justify-content-center align-items-center " style={{ width: "30%" }} >
                      <div
                        style={{
                          width: "100%",
                          fontSize: value.isHeading ? "25px" : "18px",
                        }}
                      >
                        {value.title}
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-3" style={{ width: "70%" }} >
                      <div
                        style={{
                          width: "26.4%",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopLeftRadius: index === 0 ? "20px" : "0px",
                          borderTopRightRadius: index === 0 ? "20px" : "0px",
                          borderBottomLeftRadius:
                            index === data.length - 1 ? "20px" : "0px",
                          borderBottomRightRadius:
                            index === data.length - 1 ? "20px" : "0px",

                          backgroundColor:
                            index % 2 === 0 ? "#F5F6F8" : "transparent",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {value.checked1 && !value.isHeading && (
                            <FontAwesomeIcon
                              color="#AEADAD"
                              style={{ height: '1.5rem' }}
                              icon={faCheck}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "26.4%",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopLeftRadius: index === 0 ? "20px" : "0px",
                          borderTopRightRadius: index === 0 ? "20px" : "0px",
                          borderBottomLeftRadius:
                            index === data.length - 1 ? "20px" : "0px",
                          borderBottomRightRadius:
                            index === data.length - 1 ? "20px" : "0px",
                          backgroundColor:
                            index % 2 === 0 ? "#F5F6F8" : "transparent",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {value.checked2 && !value.isHeading && (
                            <FontAwesomeIcon
                              color="#AEADAD"
                              style={{ height: '1.5rem' }}
                              icon={faCheck}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "26.4%",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopLeftRadius: index === 0 ? "20px" : "0px",
                          borderTopRightRadius: index === 0 ? "20px" : "0px",
                          borderBottomLeftRadius:
                            index === data.length - 1 ? "20px" : "0px",
                          borderBottomRightRadius:
                            index === data.length - 1 ? "20px" : "0px",
                          backgroundColor:
                            index % 2 === 0 ? "#F5F6F8" : "transparent",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {value.checked3 && !value.isHeading && (
                            <FontAwesomeIcon
                              color="#AEADAD"
                              style={{ height: '1.5rem' }}
                              icon={faCheck}
                            />
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center" style={{ width: "9%" }}>
                        <div
                          style={{
                            width: "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}

        <div style={{ margin: "66px 0" }}>
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

        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <CollapseItem key={index}>
            {({ isOpen, toggleCollapse }) => (
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 0px 10px #0000000D",
                  borderRadius: "20px",
                  width: "100%",
                  display: "flex",
                  padding: "27px",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
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
                  <div
                    color="primary"
                    style={{ marginBottom: "1rem" }}
                    onClick={toggleCollapse}
                  >
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
  );
};

export default MyPlan;
