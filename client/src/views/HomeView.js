import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Layout/Container";

export default function HomeView() {
  return (
    <Container>
      <h1>nextBus</h1>
      <Link to="/map">Select Bus</Link>
    </Container>
  );
}
