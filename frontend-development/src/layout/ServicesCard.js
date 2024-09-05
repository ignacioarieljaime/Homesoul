import React from "react";
import homeSoul from "../assets/homeSoul.jpg";
import consulting from "../assets/images/services/consulting.jpg";
import funding from "../assets/images/services/funding.jpg";
import construction from "../assets/images/services/construction.jpg";
import constru from "../assets/images/services/constru.jpg";
import academicl from "../assets/images/services/academicl.jpg";
import learnings from "../assets/images/services/learnings.jpg";
import BeforeIcon from "../assets/svgs/before-icon.svg";

const ServicesCard = () => {
  const data = [
    {
      Image: consulting,
      title: "Consulting",
      content:
        "We offer consulting services to help customers achieve their goals. Our consultants guide clients through every step of their projects,  making the planning, construction and renovation process less daunting.",
      knowMore: "Know More...",
    },
    {
      Image: funding,
      title: "Finance and Funding",
      content:
        "We provide tailored financial support products to help customers realize their dreams and raise capital for their projects. This department also protects homeowners from unreliable contractors and also ensures that our associate contractors receive payment. Additionally, also our platform members are able to benefit to become a lender or investor by funding /lending to the platform projects",
      knowMore: "Know More...",
    },
    {
      Image: constru,
      title: "⁠Development and Construction",
      content:
        "The platform  has our corporate construction’s partner to help with performing the work to help the development and construction. This department ensures projects are delivered on time and within budget. We strive to make every building safe, affordable, adaptive, comfortable, and sustainable.",
      knowMore: "Know More...",
    },
    {
      Image: construction,
      title: "Manufacture",
      content:
        "We connect with manufacturers who offer  sustainable construction materials and products, including eco-friendly products, energy-efficient mechanical systems, healthy home appliances, smart home automation systems, life-saving products, and monitoring devices.",
      knowMore: "Know More...",
    },
    {
      Image: learnings,
      title: "The ⁠Dreamers Hub",
      content:
        "We are a entrepreneurship co-working and mastermind hub that provides networking and programming and other resources to help you launch your dream.  Focused on personal growth and entrepreneurship, We are nobody and we can decide to be somebody. This department fosters an environment for mindset enterprises and investors to network and share creative ideas. It also supports the next generation in pursuing a vision of  helping and caring and sharing human culture and  also sustainable living for our communities and Mother Earth.",
      knowMore: "Know More...",
    },
    {
      Image: academicl,
      title: " ⁠Academy Learning",
      content:
        "We train newcomers, energy advisors, builders, renovators, homeowners, installers, and building officials. Our goal is to increase financial literacy and provide new talent to sustain and improve communities for future generations.",
      knowMore: "Know More...",
    },
  ];
  return (
    <>
      <div id="solutions" className="container service-card-main">
        <div className="d-flex align-items-center title-div">
          <div className="before-icon">
            <img src={BeforeIcon} alt="icon" />
          </div>{" "}
          <h2 className="common-title"> Our Services</h2>
        </div>
        <div className="row" style={{ marginTop: 55 }}>
          {data.map((item, index) => {
            return (
              <div key={index} className="col-lg-4 col-md-6 ">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    height: "97%",
                    borderRadius: "25px",
                    border: "4px solid #f5f6f8",
                    marginBottom: "22px",
                    position: "relative",
                  }}
                >
                  <div style={{ borderRadius: "20px" }}>
                    <img
                      src={item.Image}
                      height={400}
                      className="card-img-top custom-height"
                      alt="..."
                      style={{
                        borderRadius: " 20px",
                        padding: "11px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div style={{ height: "100%" }} className="card-body px-4">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.content}</p>
                    {/* <div
                      className="d-flex justify-content-end card-details-link"
                      style={{
                        textDecoration: "none",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                      }}
                    >
                      {item.knowMore}
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
