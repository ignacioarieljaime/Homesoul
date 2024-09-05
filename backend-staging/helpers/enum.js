"use strict";

const Status = {
  Active: 1,
  Inactive: 2,
};

/**
 * Authorization Type.
 * @enum {number}
 */
const Type = {
  Engineer: 1,
  Customer: 2,
};
const TYPE_NAME = {
  1: 'Engineer',
  2: 'Customer',
};

const Model = {
  User: "user",
  Promotion: "promotion",
  Contact: "contact",
  Logo: "logo",
};

const ACTION = {
  Login: "Login",
  Access: "access",
};

const PROMOTION_SETTINGS_TYPE = {
  Background: "background",
  Header: "header",
  Layout: "layout",
};

const DOCUMENT_TYPE = {
  1: 'Canada ID Card'
}

const PROPERTY_TYPE_NAME = {
  1: 'Commercial',
  2: 'Residential'
}

const PROPERTY_TYPE = {
  COMMERCIAL: 1,
  RESIDENTIAL: 2
}

const HEADER_VARIANT = {
  headerWithLogo: 1,
  headerWithLogo2: 2,
  headerWithLogoTextSubtitleURL: 3,
  headerWithLogo: 1,
  headerWithLogo: 1,
  headerWithLogo: 1,
  headerWithLogo: 1,
  headerWithLogo: 1,
  headerWithLogo: 1,
  headerWithLogo: 1,

};

const AUDIT_STATUS_ID = {
  NEW: 1,
  ACCEPTED: 2,
  ON_GOING: 3,
  COMPLETED: 4,
  REJECTED: 5
};

const AUDIT_STATUS_NAME = {
  1: 'New',
  2: 'Accepted',
  3: 'On Going',
  4: 'Completed',
  5: 'Rejected'
};
const AUDIT_STATUS_NAME_FRONTEND = {
  1: 'Requested Date',
  2: 'Accept',
  3: 'On Going',
  4: 'Completed',
  5: 'Rejected'
};

const LEAD_ID = {
  NEW: 0,
  CONVERTED: 1,
  LOST: 2
};

const LEAD_NAME = {
  0: 'New',
  1: 'Converted',
  2: 'Lost'
};

module.exports = {
  Status,
  Type,
  Model,
  ACTION,
  PROMOTION_SETTINGS_TYPE,
  PROPERTY_TYPE,
  PROPERTY_TYPE_NAME,
  AUDIT_STATUS_ID,
  AUDIT_STATUS_NAME,
  TYPE_NAME,
  AUDIT_STATUS_NAME_FRONTEND,
  DOCUMENT_TYPE,
  LEAD_ID,
  LEAD_NAME
}