import React from "react";

const Loading = function (props) {
  return (
    <svg className="loading-icon" xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 3000 910.5">
      <circle className="st0-loading" cx="705" cy="455" r="270">
        <animate attributeType="CSS" attributeName="cy" 
                  calcMode="spline"
                  keySplines="0.24 0.2 0.77 0.98; 0.24 0.2 0.77 0.98"
                  values="380;530;380" dur="1s" repeatCount="indefinite" />
      </circle>
      
      <circle className="st0-loading" cx="1500" cy="455" r="270">
        <animate attributeType="CSS" attributeName="cy" 
                  calcMode="spline"
                  keySplines="0.24 0.2 0.77 0.98; 0.24 0.2 0.77 0.98"
                  values="530;380;530" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle className="st0-loading" cx="2295" cy="455" r="270">
        <animate attributeType="CSS" attributeName="cy" 
                  calcMode="spline"
                  keySplines="0.24 0.2 0.77 0.98; 0.24 0.2 0.77 0.98"
                  values="380;530;380" dur="1s" repeatCount="indefinite" />
      </circle>

    </svg>
  );
};

export default Loading;