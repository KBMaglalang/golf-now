// sanity get brand products
export const sanityGetBrandProducts = async (brandId) => {
  return await fetch(`/api/sanityUpdate?id=${brandId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sanityUpdateProductStock = async (cartItems) => {
  return await fetch("/api/sanityUpdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  });
};

// ===========================================================================

// prisma update user information
export const prismaUpdateUserInfo = async (event, userData) => {
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

  // update user content in prisma
  await fetch(`/api/prisma/user/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, userData }),
  });
};

// prisma get user info
export const prismaGetUserInfo = async (session) => {
  return await fetch(`/api/prisma/user?key=${session.user.email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

// prisma check if user favorite the product
export const isUserFavoriteProduct = async (prismaUserData, product) => {
  return await fetch(
    `/api/prisma/favorite?userId=${prismaUserData.id}&productSanityId=${product._id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
};

// prisma delete favorite
export const prismaFavoriteDelete = async (favorites) => {
  return await fetch(`/api/prisma/favorite`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      favoriteId: favorites.id,
    }),
  });
};

export const prismaFavoriteAdd = async (product, prismaUserData) => {
  return await fetch(`/api/prisma/favorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, prismaUserData }),
  });
};

export const prismaCreateOrder = async (
  product,
  stripeData,
  prismaUserData
) => {
  return await fetch(`/api/prisma/order/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartItems: product,
      stripeData,
      userData: prismaUserData,
    }),
  });
};

// ===========================================================================

// stripe create order
export const stripeCreateOrder = async (cartItems) => {
  return await fetch("/api/stripe/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems }),
  });
};

// stripe get order
export const stripeGetOrderInfo = async (router) => {
  return await fetch(`/api/stripe/orders?key=${router.query.session_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
