import React, { useState } from "react";
import { pulse, dot } from "./busy-indicator.module.css";

const BusyIndicator = () => {
  return <div className={pulse} />;
};

export default BusyIndicator;
