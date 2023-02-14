import React from "react";
import script1 from "../../assets/script1.jpg";

const ScriptPage = () => {
  return (
    <>
      <h1 className="title-card">Script</h1>
      <div className="cards namecards">
        <div className="card card-1">
          <img className="card-img" src={script1} alt="" />
          <div className="text-details">
            <div className="firstrow">
              <p className="name">Dao Vinci</p>
              <p className="currency">Current eth</p>
            </div>
            <div className="secondrow">
              <p className="author">
                <img className="avatar author-img" src={script1} />
                <p className="author-name">Rahul</p>
              </p>
              <p className="price">40.89 eTH</p>
            </div>
          </div>
          <button className="btn-script-music-buy  hero-btn">Buy</button>
        </div>
      </div>
    </>
  );
};

export default ScriptPage;
