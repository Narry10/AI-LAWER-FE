import React from "react";
import BannerSection from "views/components/UI/Home/BannerSection";
import Feedback from "views/components/UI/Home/Feedback";
import { feedbackMock, productMock } from "./constants/mockdata";
import ProductSection from "views/components/UI/Home/ProductSection";
import ContactSection from "views/components/UI/Home/ContactSection";

const Home = () => {
  return <div>
    <BannerSection />
    {
        productMock && productMock.map((product, index) => (
          <ProductSection key={`product__${index}`} {...product}/>
        ))
      }
    <Feedback feedbacks={feedbackMock}/>
    <ContactSection/>
  </div>;
};

export default Home;
