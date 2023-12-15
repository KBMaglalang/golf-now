import React from "react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";

// components
import { ButtonSignIn } from ".";
import { ButtonSignOut } from ".";

// context or store

// constants and functions
import { authOptions } from "@/config/auth/auth";

export async function ButtonAccount() {
  /* `const session = await getServerSession(authOptions);` is calling the `getServerSession` function
  and passing `authOptions` as an argument. This function is responsible for retrieving the user
  session from the server. The `await` keyword is used to wait for the function to complete and
  return the session object. The session object contains information about the authenticated user,
  such as their ID, name, and email. */
  const session = await getServerSession(authOptions);

  return (
    <div className="dropdown dropdown-end">
      {/* icon */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
        <div className="rounded-full">
          <UserIcon className="h-8 w-8 text-white" />
        </div>
      </label>

      {/* dropdown menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
      >
        {!session ? (
          <li>
            <ButtonSignIn />
          </li>
        ) : (
          <>
            <li>
              <Link href={"/user/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/user/orders"}>Orders</Link>
            </li>
            <li>
              <Link href={"/user/settings"}>Settings</Link>
            </li>
            <li>
              <ButtonSignOut />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
