import React from "react";

const StatusCard = () => {
  return (
    <div className="card py-1 pb-2" style={{  backgroundColor:"#E4F6DD", border : "none ", borderRadius : "15px" , paddingLeft : "2px", paddingRight : "2px"}}>
      <div
        className="card-img-top"
        style={{borderRadius : "15px" , height : "200px" , backgroundColor : "#fff"}}
        alt="..."
      />
      <div className="card-body p-0 pt-1">
        <p className="card-text m-0 text-center " style={{color : "black" , fontSize : "14px" , fontFamily : "Work Sans" , fontWeight : 500}}>
        Above Grade Walls
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
