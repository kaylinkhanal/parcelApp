"use client";
import React from "react";

import Layout from "@/components/layout/page";

const page = ({children}) => {

  return (
    <div>
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-340 py-48 mx-auto">
           {children}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default page;
