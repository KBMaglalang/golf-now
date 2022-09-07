import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Account() {
  const { data: session, status } = useSession();
  // const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
};
