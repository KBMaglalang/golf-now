type ProductType = {
  visible: boolean;
  brand: any;
  name: string;
  sku: string;
  slug: {
    current: string;
  };
  price: number;
  stock: number;
  image: any[];
  description: any[];
  features: any[];
  _type: string;
  _id: string;
};

type CartItemType = ProductType & {
  quantity: number;
};

type CategoryType = {
  title: string;
  slug: {
    current: string;
  };
  logo: any[];
  _id: string;
};

type HeaderNotificationType = {
  title: string;
  text: string;
};

type HeroType = {
  image: any;
  title: string;
  link: string;
  _id: string;
};
