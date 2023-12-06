"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import type { User } from "@prisma/client";
import { signOut } from "next-auth/react";

// components

// context or store

// constants and functions

type Props = {
  userDetails: User;
};

export function ViewSettings({ userDetails }: Props) {
  const [details, setDetails] = useState(
    {
      emailNotification: userDetails?.emailNotification ?? "",
      smsNotification: userDetails?.smsNotification ?? "",
      newsLetterNotification: userDetails?.newsLetterNotification ?? "",
    } || {}
  );

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const res = await fetch("/api/user/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails, userNotifications: details }),
    });

    const json = await res.json();
    if (!res.ok) {
      toast.error("Error Updating User Settings!");
      throw Error(json.message);
    }

    toast.success("User Settings Updated Successfully!");
  };

  const handleDeleteAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const res = await fetch(`/api/user/delete?key=${userDetails.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (!res.ok) {
      toast.error("Error Deleting User Account!");
      throw Error(json.message);
    }

    toast.success("User Account Deleted Successfully!");
    signOut({ callbackUrl: `${window.location.origin}/` });
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">Settings</h1>
      </div>

      {/* content */}
      <div className="space-y-8">
        {/* notifications */}
        <div className="space-y-4">
          <div className="flex flex-row justify-between">
            <h2 className="">Email Notifications</h2>
            <input
              type="checkbox"
              className="toggle"
              checked={details.emailNotification!}
              onChange={(e) =>
                setDetails({ ...details, emailNotification: e.target.checked })
              }
            />
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="">SMS Alerts</h2>
            <input
              type="checkbox"
              className="toggle"
              checked={details.smsNotification!}
              onChange={(e) =>
                setDetails({ ...details, smsNotification: e.target.checked })
              }
            />
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="">Newsletter</h2>
            <input
              type="checkbox"
              className="toggle"
              checked={details.newsLetterNotification!}
              onChange={(e) =>
                setDetails({
                  ...details,
                  newsLetterNotification: e.target.checked,
                })
              }
            />
          </div>

          {/* update button */}
          <div className="flex flex-row justify-end mt-6">
            <button
              className="btn btn-primary uppercase"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>

        {/* password changes */}
        {/* <div>
          <div className="mb-6">
            <h1 className="font-bold text-2xl">Password</h1>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Password"
                  className="input input-bordered w-full "
                />
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full "
                />
              </label>
            </div>

            <div className="flex flex-row justify-end mt-6">
              <button className="btn btn-primary uppercase">Update</button>
            </div>
          </div>
        </div> */}

        {/* delete account */}
        <div>
          <div className="mb-6">
            <h1 className="font-bold text-2xl">Delete Account</h1>
          </div>

          <div className="flex flex-row justify-end mt-6">
            <button
              onClick={handleDeleteAccount}
              className="btn btn-error uppercase"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
