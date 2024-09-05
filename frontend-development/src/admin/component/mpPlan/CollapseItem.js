import React, { useState } from "react";

const CollapseItem = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return children({ isOpen, toggleCollapse });
};

export default CollapseItem;
