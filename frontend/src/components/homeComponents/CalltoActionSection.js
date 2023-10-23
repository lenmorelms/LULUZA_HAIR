import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Get updates for Luluza products</h2>
              <p>Sign up for free and stay updated.</p>
              <form className="form-section">
                <input placeholder="Your Email..." name="email" type="email" />
                <input value="Subscribe" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
