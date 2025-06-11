// Sample product data
const product = {
  id: 1,
  name: "Fall Limited Edition Sneakers",
  brand: "Sneaker Company",
  description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  price: 250.00,
  discountPercentage: 50,
  currency: "$",
  images: [
    {
      id: 1,
      main: "https://via.placeholder.com/500x500?text=Sneaker-1",
      thumbnail: "https://via.placeholder.com/100x100?text=Sneaker-1"
    },
    {
      id: 2,
      main: "https://via.placeholder.com/500x500?text=Sneaker-2",
      thumbnail: "https://via.placeholder.com/100x100?text=Sneaker-2"
    },
    {
      id: 3,
      main: "https://via.placeholder.com/500x500?text=Sneaker-3",
      thumbnail: "https://via.placeholder.com/100x100?text=Sneaker-3"
    },
    {
      id: 4,
      main: "https://via.placeholder.com/500x500?text=Sneaker-4",
      thumbnail: "https://via.placeholder.com/100x100?text=Sneaker-4"
    }
  ],
  colors: [
    { id: 1, name: "White", value: "#FFFFFF" },
    { id: 2, name: "Black", value: "#000000" },
    { id: 3, name: "Orange", value: "#FF7E1B" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  reviews: [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2023-03-15",
      title: "Great sneakers!",
      comment: "These sneakers are amazing. Very comfortable and stylish."
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2023-02-28",
      title: "Good quality",
      comment: "Good quality sneakers. The only issue is they run a bit small."
    },
    {
      id: 3,
      user: "Mike Johnson",
      rating: 5,
      date: "2023-02-10",
      title: "Perfect fit",
      comment: "These fit perfectly and are very comfortable for all-day wear."
    },
    {
      id: 4,
      user: "Sarah Williams",
      rating: 3,
      date: "2023-01-25",
      title: "Decent but overpriced",
      comment: "The sneakers are decent quality but I think they're a bit overpriced for what you get."
    },
    {
      id: 5,
      user: "Robert Brown",
      rating: 5,
      date: "2023-01-15",
      title: "Best purchase ever",
      comment: "I love these sneakers! They're stylish, comfortable, and durable."
    }
  ]
};

export default product;
