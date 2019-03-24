import React, { useState } from "react";
import { pulse, dot } from "./busy-indicator.module.css";

const BusyIndicator = () => {
  return <div class={pulse} />;
};

export default BusyIndicator;
