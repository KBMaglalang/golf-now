import React from "react";

// components

// context or store

// constants and functions

export function AdSegment1() {
  return (
    <section className=" body-font py-12 bg-brand-ads justify-center items-center flex ">
      <div className="stats shadow flex flex-col md:flex-row">
        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title"></div>
          <div className="stat-value">Easy Returns</div>
          <div className="stat-desc">
            <p>Return or exchange up to January 15th</p>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title"></div>
          <div className="stat-value">Free Shipping</div>
          <div className="stat-desc">Over $50</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title"></div>
          <div className="stat-value">In-Store Pickup</div>
          <div className="stat-desc">Buy online and pickup in store</div>
        </div>
      </div>
    </section>
  );
}
