import React, { useEffect } from "react";
import Link from "next/link";
import { runFireworks } from "../lib/fireworks";

const Canceled = () => {
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <h2>Forgot to add something to your cart?</h2>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
