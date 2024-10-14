import React from "react";
import Main from "./Main/Main";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer";
import './index.scss';

export default function LayoutDefault() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
