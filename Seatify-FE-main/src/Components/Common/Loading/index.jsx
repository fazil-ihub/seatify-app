/* eslint-disable no-unused-vars */
import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic.jsx";
import "./styles.css";

const index = () => {
  return (
    <>
      <div className="p-6 mx-auto max-w-24">
        <div className="flex items-center justify-center mb-6">
          {list
            ?.filter((x) => x?.prop === "spin")
            .map((l) => (
              <Article key={l.prop}>
                <center>
                  <ReactLoading type={l.prop} color="#FF7E04" />
                  <Prop>
                    <span style={{ color: "#4406B1" }}>Loading</span>
                    <></>
                  </Prop>
                </center>
              </Article>
            ))}
        </div>
      </div>
    </>
  );
};

export default index;
