import React from "react";

// components

// context or store

// constants and functions

export function AdSegment1() {
  return (
    <section className=" body-font py-12 bg-base-200 justify-center items-center flex ">
      <div className="stats shadow flex flex-col md:flex-row">
        <div className="stat">
          <div className="stat-figure text-secondary">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg> */}
          </div>
          <div className="stat-title"></div>
          <div className="stat-value">Easy Returns</div>
          <div className="stat-desc">
            <p>Return or exchange up to January 15th</p>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg> */}
          </div>
          <div className="stat-title"></div>
          <div className="stat-value">Free Shipping</div>
          <div className="stat-desc">Over $50</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg> */}
          </div>
          <div className="stat-title"></div>
          <div className="stat-value">In-Store Pickup</div>
          <div className="stat-desc">Buy online and pickup in store</div>
        </div>
      </div>
    </section>
  );
}
