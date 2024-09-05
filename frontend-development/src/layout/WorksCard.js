import React from "react";
import homeSoul from "../assets/homeSoul.jpg";
import BeforeIcon from "../assets/svgs/before-icon.svg";

const WorksCard = () => {
  const data = [
    {
      Image: homeSoul,
      stepCount: "Step 1",
      title: "Sing up and Book Initial Consultation",
      content:
        "Schedule an initial consultation with our experts to discuss your situation , goals, needs, and vision. We’ll assess your requirements and provide a customized plan to achieve your objectives.",
    },
    {
      Image: homeSoul,
      stepCount: "Step 2",
      title: "Self or Project Development Planning",
      content:
        "After the consultation then collaborate with our development and construction team to help  planning and designing  your project planning. We’ll work with you to create detailed plans, timelines, and budgets, ensuring everything aligns with your vision and goals.",
    },
    {
      Image: homeSoul,
      stepCount: "Step 3",
      title: "Financial Planning",
      content:
        "Our finance and funding team will help you explore funding and planning  options, including tailored financial products and investment opportunities. We’ll ensure you have the necessary resources to move forward with your project.",
    },
    {
      Image: homeSoul,
      stepCount: "Step 4",
      title: "Implementation",
      content:
        "Our team will oversee the process of the project / construction or renovation process, ensuring all work is completed to the highest standards. We’ll coordinate with resource / manufacturers to source sustainable materials and products, keeping your project on track and within budget.",
    },
    {
      Image: homeSoul,
      stepCount: "Step 5",
      title: "Ongoing Support",
      content:
        "Once your project is completed, we’ll provide ongoing support to ensure your space remains sustainable and efficient. Our consultants will be available for any future needs, and our Dreamers Hub and Academy Learning programs will continue to offer opportunities for personal and professional growth.",
    },
  ];
  return (
    <>
      <section className=" service-card-main">
        <div className="container ">
          <div className="d-flex align-items-center title-div">
            <div className="before-icon">
              <img src={BeforeIcon} alt="icon" />
            </div>{" "}
            <h2 className="common-title"> How it works</h2>
          </div>

          <div className="row" style={{ marginTop: 55 }}>
            {data.map((item, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-6 works-box">
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "25px",
                      border: "2px solid #f5f6f8",
                      marginBottom: "22px",
                    }}
                  >
                    <div style={{ borderRadius: "20px" }}>
                      <img
                        src={item.Image}
                        className="card-img-top"
                        alt="..."
                        style={{
                          borderRadius: " 20px",
                          padding: "11px 11px 0 11px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="mb-2 card-title text-center works-card-title">
                        {item.stepCount}
                      </h5>
                      <h5 className="card-title text-center works-card-title">
                        {item.title}
                      </h5>
                      <p className="card-text works-card-content">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorksCard;
