import React from "react";
import Banner from "../../components/ui/Banner";
import Card from "../../components/ui/Card";
import Image from "next/image";

export default function ClubsBase() {
  return (
    <div>
      <Banner />
      <h1>Golf Clubs</h1>
      <div>Filter Bar</div>
      <div className="products-container">
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
        <Card>
          <Image src="/" alt="pic" width={500} height={500} />
          <h1>top product</h1>
        </Card>
      </div>
      <div className="btn-container">
        <p>Showiing # out of #</p>
        <button type="button" className="btn" onClick="">
          Load More
        </button>
      </div>
    </div>
  );
}
