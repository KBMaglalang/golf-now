# GolfNow

An e-commerce website for golf related products. Using NextJS react framework, Stripe for payment, PRISMA for ORM to Postgresql database, Sanity for content management system, NextAuth for user authentication, and Material UI CSS framework. NodeMailer was used with Mailtrap for testing and confirming of passwordless email login.

# Dependencies

- @sanity/base: ^2.30.1,
- @sanity/core: ^2.30.2,
- @sanity/default-layout: ^2.30.1,
- @sanity/default-login: ^2.30.1,
- @sanity/desk-tool: ^2.30.1,
- @sanity/eslint-config-studio: ^2.0.0,
- @sanity/vision: ^2.30.1,
- prop-types: ^15.7,
- react: ^17.0,
- react-barcode: ^1.3.2,
- react-dom: ^17.0,
- nodemailer ^6.7.8,
- @mui/material ^5.10.6

# Screenshots

!['homepage'](doc/1-homepage.png)
!['product-page'](doc/2-productPage.png)
!['brand-search'](doc/3-brandSearch.png)
!['product-categories'](doc/4-productCategories.png)
!['product-search'](doc/5-productSearch.png)
!['account-info'](doc/6-accountInfoPage.png)
!['user-favorites'](doc/7-userFavoritesPage.png)
!['user-orders'](doc/8-userOrderPage.png)

# Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the `.env` file with your secret keys and prisma database URL
3. Create the `.env.development` by using `.env.development.example` as a reference: `cp .env.development.example .env.development`
4. Update the `.env` with the information needed
5. Install dependencies: `npm i`
6. Run the server: `npm run dev`
7. Visit `http://localhost:3000/`

## Sanity Setup and Usage

1. setup an account with Sanity.IO
2. grab the sanity tokens associated with the account
3. add the `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_READ_TOKEN` in the `.env.development` file
4. add the tokens as well in, `./golf-sanity-studio/.env.development`
5. will need to restart the server if it is already running

## Stripe Setup and Usage

1. grab stripe publishable key and stripe secret key from you stripe account
2. add the `STRIPE_SECRET_KEY` in the `.env` file
3. add the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in the `.env.development` file
4. will need to restart the server if it is already running

## NextAuth Setup and Usage

1. Create OAuth credentials in Google
2. grab the Google Client ID and Google Secret Key
3. add the `NEXTAUTH_SECRET` in the `.env` file
4. add the `GOOGLE_CLIENT_ID` and `NEXTAUTH_URL` in the `.env.development` file
5. will need to restart the server if it is already running

## Prisma Setup and Usage

1. run `npm i` or `npm install` to install the new packages added to package.json (prisma and @prisma/client)
2. copy `.env.example` to `.env` and fill in the details
3. copy the postgresql to `DATABASE_URL` in the `.env` file
4. run `npx prisma init`
5. run `npx prisma migrate dev` or `npx prisma db push`
6. can run the prisma studio `npx prisma studio` to see the database
