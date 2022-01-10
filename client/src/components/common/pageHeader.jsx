import React from "react";

const PageHeader = ({ titleText, subTitle = "" }) => {
  return (
    <div className="center my-2">
      <div className="col-12 col-md-8">
        <h1 className="col-12 text-center display-4">{titleText}</h1>
        <h2 className="subTitle">{subTitle}</h2>
        <hr />
      </div>
    </div>
  );
};

export default PageHeader;
