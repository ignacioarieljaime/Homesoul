import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Modal, ModalBody } from "reactstrap";

const Spinner = () => {
  const { isLoading } = useSelector((state) => state.spinner);

  return (
      <Modal isOpen={isLoading} className="my-0" centered backdrop="static">
        <ModalBody
          className="min-vh-100"
          style={{ backgroundColor: "transparent" }}
        >
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#2C5AB4"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              backgroundColor: "transparent",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3,
            }}
            wrapperClass=""
          />{" "}
        </ModalBody>
      </Modal>
  );
};

export default Spinner;
