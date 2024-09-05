import React, { useEffect, useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import ServicesCard from "../../layout/ServicesCard";
import Footer from "../../components/footer/Footer";
import homeSoul from "../../assets/images/home-icon.png";
import WorksCard from "../../layout/WorksCard";
import listingSvg from "../../assets/svgs/Group 57918.svg";
import CarouselComp from "../../components/carousel/Carousel";
import BeforeIcon from "../../assets/svgs/before-icon.svg";
import heading from "../../assets/video/heading.mp4";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { setSpinner } from "../../redux/reducers/spinner";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import banner from "../../assets/gif/banner.gif";

const Homepage = () => {
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const ourSolutionsRef = useRef(null);
  const videoRef = useRef(null);

  const location = useLocation();

  const listingData = [
    {
      Image: listingSvg,
      title: " 40+",
      content: "Served in States",
    },
    {
      Image: listingSvg,
      title: " 99%",
      content: "Customer Retention",
    },
    {
      Image: listingSvg,
      title: " 1000+",
      content: "Project Delivery",
    },
    {
      Image: listingSvg,
      title: " 100+",
      content: "Engineers & Experts",
    },
    {
      Image: listingSvg,
      title: " 98%",
      content: "Customer Satisfaction",
    },
    {
      Image: listingSvg,
      title: " Certified",
      content: "ISO, 9001, 14001, 1001",
    },
  ];

  const willGetData = [
    {
      Image: listingSvg,
      title: "Comprehensive Support",
      content:
        "HomeSoul offers a one-stop solution for all your sustainable living needs. From consulting to construction, finance, and ongoing support, we guide you through every step of your project.",
    },
    {
      Image: listingSvg,
      title: "Financial Flexibility",
      content:
        "Our tailored financial products and investment opportunities make it easier for you to fund your projects. We protect homeowners from unreliable contractors and ensure secure transactions for all parties involved.",
    },
    {
      Image: listingSvg,
      title: "Expert Guidance",
      content:
        "Our team of experienced consultants and industry professionals provides expert advice and support, ensuring your projects are completed to the highest standards and achieve maximum efficiency and sustainability.",
    },
    {
      Image: listingSvg,
      title: "Sustainable Solutions",
      content:
        "We prioritize eco-friendly and energy-efficient solutions, connecting you with manufacturers who provide sustainable construction materials and products. This not only benefits the environment but also reduces long-term costs.",
    },
    {
      Image: listingSvg,
      title: "Community and Networking",
      content:
        "HomeSoul creates an ecosystem that brings together homeowners, contractors, professionals, builders, bankers, and investors. Our Dreamers Hub fosters a collaborative environment for networking, sharing ideas, and promoting personal and professional growth.",
    },
    {
      Image: listingSvg,
      title: "Education and Training",
      content:
        "Our Academy Learning program offers training and certification for newcomers, energy advisors, builders, renovators, and more. We aim to increase financial literacy and develop new talent to sustain and improve communities for future generations.",
    },
    {
      Image: listingSvg,
      title: "Innovation and Growth",
      content:
        "HomeSoul is dedicated to fostering innovation and entrepreneurship. Our platform supports creative ideas and new ventures, helping you turn your vision into reality while contributing to a sustainable future.",
    },
    {
      Image: listingSvg,
      title: "Safe and Comfortable Living Spaces",
      content:
        "We strive to create living spaces that are not only sustainable but also safe, affordable, adaptive, and comfortable. Our holistic approach ensures that your home meets all your needs and enhances your quality of life.",
    },
    {
      Image: listingSvg,
      title: "Investment Opportunities",
      content:
        "Members of our platform can invest in various projects through tokens, providing a unique opportunity to be part of the sustainable living movement and earn returns on their investments.",
    },
    {
      Image: listingSvg,
      title: "Long-term Relationships",
      content:
        "We build lasting relationships with our clients, offering ongoing support and resources even after project completion. Our commitment to your success ensures that your home remains efficient, sustainable, and comfortable for years to come.",
    },
  ];

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    dispatch(setSpinner(true));
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/front/create-lead`,
        values
      );
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };

  const ValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string()
      .matches(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter valid email"
      )
      .required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .required("Required")
      .min(10, "Mobile number must be exactly 10 digits")
      .max(10, "Mobile number must be exactly 10 digits"),
    city: Yup.string().required("Required"),
    province: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  // const playVideo = () => {
  //   videoRef.current.play();
  // };

  // useEffect(() => {
  //   playVideo();
  // }, []);

  useEffect(() => {
    const scrollToSection = (ref) => {
      const offset = 150;
      const top =
        ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (location.state?.scrollTo) {
      switch (location.state.scrollTo) {
        case "about-us":
          if (aboutUsRef.current) scrollToSection(aboutUsRef);
          break;
        case "contact-us":
          if (contactUsRef.current) scrollToSection(contactUsRef);
          break;
        case "our-solutions":
          if (ourSolutionsRef.current) scrollToSection(ourSolutionsRef);
          break;
        default:
          break;
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div>
        <section className="banner-section">
          <div className="container newContainer">
            <div className="row banner-content">
              {/* <div className="col-md-8 banner-left-content p-0">
                <p className="banner-text" style={{ maxHeight: 960 }}>
                  Lorem Ipsum has been the industry's
                </p>
                <h1 className="banner-highlight-text">
                  Home Soul is a multifaceted organization dedicated to
                  advancing sustainable living through a range of specialized
                  services.
                </h1>
                <p className="banner-text" style={{ maxWidth: 651 }}>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s,
                </p>
                <button className="banner-btn ms-2">Connect Now</button>
              </div> */}
              <div className="banner-img-main  p-0">
                {/* <video
                  ref={videoRef}
                  className="w-100"
                  autoplay
                  loop
                  muted
                  preload="auto"
                >
                  <source src={heading} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}

                <img
                  className="w-100"
                  src={banner}
                  alt="description of the gif"
                />
              </div>
            </div>
          </div>
        </section>

        {/* about us section */}
        <section id="about-us" ref={aboutUsRef} className="about-us">
          <div className="container ">
            <div className="d-flex align-items-center title-div">
              <div className="before-icon">
                <img src={BeforeIcon} alt="icon" />
              </div>
              <h2 className="common-title"> Brief About Us</h2>
            </div>
            <p className="paragraph-wrapper">
              Home Soul is a multifaceted organization dedicated to advancing
              sustainable living through a range of specialized services.
            </p>
            <p className="paragraph-wrapper">
              Our mission is to support individuals and communities in creating
              safe, affordable, adaptive, comfortable, and sustainable living
              environments.
            </p>
            <p className="paragraph-wrapper">
              Our vision is to create Better Lifestyle Communities. Make an
              impact while earning an income. Live well while promoting
              sustainable living. Homesoul is an online platform designed to
              create an ecosystem that meets the needs of homeowners,
              contractors, professionals, builders, bankers, and investors,
              enabling them to collaborate and improve our world and our
              community. We are making a living while we are living.
            </p>
          </div>
        </section>

        <section ref={ourSolutionsRef}>
          <ServicesCard />
        </section>
        <WorksCard />

        {/* Cumulative Counters */}
        <section className="service-card-main" style={{ marginBottom: 100 }}>
          <div className="container">
            <div className="d-flex  title-div">
              <div className="before-icon">
                <img src={BeforeIcon} alt="icon" />
              </div>
              <h2 className="common-title"> Cumulative Counters</h2>
            </div>
            {/* <div className="row" style={{ marginTop: 55 }}>
              <div className="col-lg-5">
                <img alt="img" src={homeSoul} className="counter-img" />
              </div>
              <div className="col-lg-7 px-5 pt-1">
                <p className="paragraph-wrapper counters-text h-100">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
            </div> */}

            <div className="listing-information">
              <div className="container">
                <div
                  className="row justify-content-center"
                  style={{ gap: "4%" }}
                >
                  {listingData.map((data, index) => {
                    return (
                      <div key={index} className="col-2 listing-card">
                        <img alt="img" src={data.Image} />
                        <h2 className=" listing-title">{data.title}</h2>
                        <p className="listing-content text-center ">
                          {data.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <div className="container carousel-main-container">
          <div
            className="d-flex align-items-center title-div"
            style={{ marginBottom: 63 }}
          >
            <div className="before-icon">
              <img src={BeforeIcon} alt="icon" />
            </div>
            <h2 className="common-title">Testimonials</h2>
          </div>
          <CarouselComp />
        </div> */}
        {/* What You will Get */}

        <section className="service-card-main">
          <div className="container">
            <div className="d-flex  title-div">
              <div className="before-icon">
                <img src={BeforeIcon} alt="icon" />
              </div>
              <h2 className="common-title"> What You will Get </h2>
            </div>
            <div className="row">
              {willGetData.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 text-center"
                  >
                    <div className="will-get-icon-main">
                      <div className="get-icon">
                        <img alt="img" src={value?.Image} />
                        <p className="will-get-icon-text">{value?.title}</p>
                      </div>
                    </div>
                    <p>{value?.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose us */}
        {/* <section className="service-card-main">
          <div className="container">
            <div className="d-flex align-items-center title-div">
              <div className="before-icon">
                <img src={BeforeIcon} alt="icon" />
              </div>
              <h2 className="common-title">Why Choose Us?</h2>
            </div>
            <div>
              <p className="paragraph-wrapper " style={{ marginBottom: 60 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p className="paragraph-wrapper">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </section> */}

        {/* connect form */}
        <section ref={contactUsRef} id="contact-us" style={{ marginTop: 89 }}>
          <div className="container">
            <div className="d-flex align-items-center title-div">
              <div className="before-icon">
                <img src={BeforeIcon} alt="icon" />
              </div>
              <h2 className="common-title">Quick Connect Form</h2>
            </div>
          </div>
          <div className="form-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="common-title form-title ">
                    Join Us in Advancing Sustainable Living
                  </h2>
                  <p className="form-content">
                    Have questions or want to learn more about how you can
                    contribute to a sustainable future? Our experts are ready to
                    connect with you. Simply fill out the quick connect form,
                    and let's take the next step together towards a more
                    sustainable world.
                  </p>
                  <p style={{ marginBottom: "6%" }} className="form-content">
                    Together, we can create a lasting legacy of sustainability.
                    Join us today and be a part of the change!
                  </p>
                </div>

                <div className="col-lg-6 contact-form-main">
                  <div className="connect-form">
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        phone: "",
                        city: "",
                        province: "",
                        country: "",
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={ValidationSchema}
                    >
                      {() => {
                        return (
                          <Form>
                            <div className="form-group">
                              <h2 className="connect-form-title">
                                REQUEST A CALL BACK.
                              </h2>
                              <label htmlFor="fullName">
                                <p className="form-label-name col-sm-4 text-nowrap">
                                  Full Name<span>*</span>
                                </p>
                                <Field name="name">
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <>
                                        <input
                                          {...field}
                                          {...rest}
                                          type="text"
                                          className="form-control connect-form-input col-sm-8"
                                          id="fullName"
                                          style={{
                                            border:
                                              form.errors?.name &&
                                              form.touched?.name
                                                ? "1px solid red"
                                                : "1px solid #dfdfdf",
                                          }}
                                        />
                                      </>
                                    );
                                  }}
                                </Field>
                              </label>
                            </div>

                            <div className="form-group">
                              <label htmlFor="email">
                                <p className="form-label-name col-sm-4">
                                  Email<span>*</span>
                                </p>
                                <Field name="email">
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <input
                                        {...field}
                                        {...rest}
                                        type="email"
                                        className="form-control connect-form-input col-sm-8"
                                        id="email"
                                        style={{
                                          border:
                                            form.errors?.email &&
                                            form.touched?.email
                                              ? "1px solid red"
                                              : "1px solid #dfdfdf",
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </label>
                            </div>

                            <div className="form-group">
                              <label htmlFor="phone">
                                <p className="form-label-name col-sm-4">
                                  Phone<span>*</span>
                                </p>
                                <Field name="phone">
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <input
                                        {...field}
                                        {...rest}
                                        type="tel"
                                        className="form-control connect-form-input col-sm-8"
                                        id="phone"
                                        style={{
                                          border:
                                            form.errors?.phone &&
                                            form.touched?.phone
                                              ? "1px solid red"
                                              : "1px solid #dfdfdf",
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </label>
                            </div>

                            <div className="form-group">
                              <label htmlFor="city">
                                <p className="form-label-name col-sm-4">
                                  City<span>*</span>
                                </p>
                                <Field name="city">
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <input
                                        {...field}
                                        {...rest}
                                        type="text"
                                        className="form-control connect-form-input col-sm-8"
                                        id="phone"
                                        style={{
                                          border:
                                            form.errors?.city &&
                                            form.touched?.city
                                              ? "1px solid red"
                                              : "1px solid #dfdfdf",
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </label>
                            </div>

                            <div className="form-group">
                              <label htmlFor="province">
                                <p className="form-label-name col-sm-4">
                                  Province<span>*</span>
                                </p>
                                <Field name="province">
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <input
                                        {...field}
                                        {...rest}
                                        type="text"
                                        className="form-control connect-form-input col-sm-8"
                                        id="phone"
                                        style={{
                                          border:
                                            form.errors?.province &&
                                            form.touched?.province
                                              ? "1px solid red"
                                              : "1px solid #dfdfdf",
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </label>
                            </div>

                            <div className="form-group">
                              <label htmlFor="country">
                                <p className="form-label-name col-sm-4">
                                  Country<span>*</span>
                                </p>
                                <Field name="country">
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <input
                                        {...field}
                                        {...rest}
                                        type="text"
                                        className="form-control connect-form-input col-sm-8"
                                        id="phone"
                                        style={{
                                          border:
                                            form.errors?.country &&
                                            form.touched?.country
                                              ? "1px solid red"
                                              : "1px solid #dfdfdf",
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </label>
                            </div>

                            <GoogleReCaptchaProvider reCaptchaKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI">
                              <GoogleReCaptcha />
                            </GoogleReCaptchaProvider>
                            <div className="row submit-btn">
                              <p className="form-label-name col-sm-4"></p>
                              <button
                                type="submit"
                                className="connect-form-btn col-sm-8 text-center"
                                style={{ padding: "3% 0" }}
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
