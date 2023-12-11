import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <iframe
          title="product_statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            // src="https://charts.mongodb.com/charts-shoeshoptutorial-bzbxw/embed/charts?id=1f926980-090b-44c6-b011-3e94b2efddca&maxDataAge=3600&theme=light&autoRefresh=true"
            src="https://charts.mongodb.com/charts-project-0-kfbit/public/dashboards/e36a91d5-7b92-43c1-be3d-c23f642f36f8"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
