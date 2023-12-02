"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import type { User } from "@prisma/client";

// components

// context or store

// constants and functions

type Props = {
  userDetails: User;
};

export function ViewUserProfile({ userDetails }: Props) {
  const [details, setDetails] = useState(userDetails || {});

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails: details }),
    });

    const json = await res.json();
    if (!res.ok) {
      toast.error("Error Updating User Details!");
      throw Error(json.message);
    }

    toast.success("User Details Updated Successfully!");
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">User Profile</h1>
      </div>

      {/* content */}
      <div className="space-y-4 ">
        <div className="flex flex-col md:flex-row gap-2">
          {/* name */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Full Name</span>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full "
              value={details.name!}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </label>

          {/* email */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full "
              defaultValue={details.email!}
              disabled
            />
          </label>

          {/* phone number */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full "
              value={details.phoneNumber!}
              onChange={(e) =>
                setDetails({ ...details, phoneNumber: e.target.value })
              }
            />
          </label>
        </div>

        {/* address */}
        <div className="space-y-4 my-6">
          {/* address 1 */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Address 1</span>
            </div>
            <input
              type="text"
              placeholder="Address 1"
              className="input input-bordered w-full "
              value={details.address1!}
              onChange={(e) =>
                setDetails({ ...details, address1: e.target.value })
              }
            />
          </label>
          {/* address 2 */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Address 2</span>
            </div>
            <input
              type="text"
              placeholder="Address 2"
              className="input input-bordered w-full "
              value={details.address2!}
              onChange={(e) =>
                setDetails({ ...details, address2: e.target.value })
              }
            />
          </label>

          <div className="flex flex-col md:flex-row gap-2">
            {/* city */}
            <label className="form-control w-full md:max-w-xs">
              <div className="label">
                <span className="label-text">City</span>
              </div>
              <input
                type="text"
                placeholder="City"
                className="input input-bordered w-full md:max-w-xs"
                value={details.city!}
                onChange={(e) =>
                  setDetails({ ...details, city: e.target.value })
                }
              />
            </label>

            {/* province state */}
            <label className="form-control w-full md:max-w-xs">
              <div className="label">
                <span className="label-text">Province/State</span>
              </div>
              <input
                type="text"
                placeholder="Province/State"
                className="input input-bordered w-full md:max-w-xs"
                value={details.stateProvince!}
                onChange={(e) =>
                  setDetails({ ...details, stateProvince: e.target.value })
                }
              />
            </label>

            {/* country */}
            <label className="form-control w-full md:max-w-xs">
              <div className="label">
                <span className="label-text">Country</span>
              </div>
              <input
                type="text"
                placeholder="Country"
                className="input input-bordered w-full md:max-w-xs"
                value={details.country!}
                onChange={(e) =>
                  setDetails({ ...details, country: e.target.value })
                }
              />
            </label>

            {/* postal code */}
            <label className="form-control w-full md:max-w-xs">
              <div className="label">
                <span className="label-text">Postal Code</span>
              </div>
              <input
                type="text"
                placeholder="Postal Code"
                className="input input-bordered w-full md:max-w-xs"
                value={details.postalCode!}
                onChange={(e) =>
                  setDetails({ ...details, postalCode: e.target.value })
                }
              />
            </label>
          </div>
        </div>

        {/* update button */}
        <div className="flex flex-row justify-end mt-6">
          <button className="btn btn-primary uppercase" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
