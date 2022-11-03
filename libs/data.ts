import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";

export interface ProductProps {
  women: {
    id: string;
    name: string;
    imageUrl: any;
    price: number;
    pages: string;
    description: string;
    size: string[];
    image: any[];
    color: string[];
    productQuantity: number;
    tag?: undefined;
  }[];
}

export const products = {
  women: [
    {
      id: "1",
      name: "Apollo sweater",
      imageUrl: product1,
      price: 25000,
      pages: "women",
      description:
        "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.",
      size: ["XS", "S", "M", "L"],
      image: [product1, product1, product2],
      color: ["lightGray", "gray", "green"],
      productQuantity: 10,
    },
    {
      id: "2",
      name: "Apollo Running Bag",
      imageUrl: product2,
      price: 15000,
      tag: "Brand New",
      pages: "women",
      description:
        "A sweater is a garment worn to keep warm. It is typically made of knitted wool, and can be woven of wool, cotton, or synthetic fibers. It is typically a lightweight garment, although it can also be made of thick cloth or other heavy fabrics.",
      size: ["XS", "S", "M", "L"],
      image: [product2, product1, product2],
      color: ["gray", "skyBlue", "orange"],
      productQuantity: 5,
    },
    {
      id: "3",
      name: "Apollo Girl Sleeve ",
      imageUrl: product3,
      price: 37000,
      tag: "Premium Used",
      pages: "women",
      description:
        "A sweater is a garment worn to keep warm. It is typically made of knitted wool, and can be woven of wool, cotton, or synthetic fibers. It is typically a lightweight garment, although it can also be made of thick cloth or other heavy fabrics.",
      size: ["XS", "S", "M", "L"],
      image: [product3, product1, product3],
      color: ["lightGray", "gray", "green"],
      productQuantity: 0,
    },
    {
      id: "4",
      name: "Apollo Sweat Shirt",
      imageUrl: product4,
      price: 20000,
      tag: "Premium Used",
      pages: "women",
      description:
        "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.",
      size: ["XS", "S", "M", "L"],
      image: [product4, product1, product4],
      color: ["gray", "skyBlue", "orange"],
      productQuantity: 10,
    },
    {
      id: "5",
      name: "Apollo dress",
      imageUrl: product2,
      price: 10500,
      tag: "Brand New",
      pages: "women",
      description:
        "A sweater is a garment worn to keep warm. It is typically made of knitted wool, and can be woven of wool, cotton, or synthetic fibers. It is typically a lightweight garment, although it can also be made of thick cloth or other heavy fabrics.",
      size: ["XS", "S", "M", "L"],
      image: [product2, product2, product4],
      color: ["lightGray", "gray", "green"],
      productQuantity: 8,
    },
    {
      id: "6",
      name: "Jupiter  Wayfarer",
      imageUrl: product5,
      price: 8500,
      description:
        "The glasses you have been looking for! For the most affordable and stylish glasses, try out the pair that you can't put down. With a comfortable feel and sleek design.",
      tag: "Premium Used",
      pages: "women",
      size: ["S", "M"],
      image: [product5, product5, product5],
      color: ["black", "brown"],
      productQuantity: 10,
    },
  ],
};
