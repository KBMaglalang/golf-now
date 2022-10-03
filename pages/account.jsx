import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import toast from "react-hot-toast";
import prisma from "../lib/prisma/prisma";

// material ui
import { Typography, Container, Grid, Button, TextField } from "@mui/material";

// components
import NotSignedIn from "../components/layout/NotSignedIn";

export default function Account({ userData }) {
  const { data: session } = useSession({ required: true });

  // update information in prisma
  const updateUser = async (event) => {
    event.preventDefault();
    const loading = toast.loading("Updating Account Information");

    // setup data to pass over db
    const formData = {
      name: event.target.name.value,
      phoneNumber: event.target.phoneNumber.value,
      address1: event.target.address1.value,
      address2: event.target.address2.value,
      city: event.target.city.value,
      country: event.target.country.value,
      stateProvince: event.target.stateProvince.value,
      postalCode: event.target.postalCode.value,
    };

    // update content in prisma
    await fetch(`/api/prisma/user/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, userData }),
    });

    toast.remove(loading);
    toast.success("Update Complete");
  };

  // If session exists, display content
  if (session) {
    return (
      <div>
        <Head>
          <title>Golf Now | Account</title>
          <meta name="description" content="Golf Products" />
          <link rel="icon" href="/golf-ball-icon.png" />
        </Head>

        <main>
          <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h3" color="primary" gutterBottom>
              Account Information
            </Typography>

            <form onSubmit={updateUser}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    defaultValue={userData?.name}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    defaultValue={userData.phoneNumber}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="address1"
                    label="Address 1"
                    type="text"
                    fullWidth
                    defaultValue={userData.address1}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="address2"
                    label="Address 2"
                    type="text"
                    fullWidth
                    defaultValue={userData.address2}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                    defaultValue={userData.city}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="stateProvince"
                    label="State/Province"
                    type="text"
                    fullWidth
                    defaultValue={userData.stateProvince}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="country"
                    label="Country"
                    type="text"
                    fullWidth
                    defaultValue={userData.country}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="postalCode"
                    label="Postal Code"
                    type="text"
                    fullWidth
                    defaultValue={userData.postalCode}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" fullWidth>
                    Update Account
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </main>
      </div>
    );
  }

  // show this if user is not logged in
  return <NotSignedIn />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // check if the user is logged in, redirect to homepage if not
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  // get user information
  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // deal with prisma dateTime error
  if (userData.emailVerified)
    userData.emailVerified = userData?.emailVerified.toISOString();

  return {
    props: { userData },
  };
};
