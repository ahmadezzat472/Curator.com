import {
  FiUser,
  FiPackage,
  FiHeart,
  FiCreditCard,
  FiMapPin,
} from "react-icons/fi";

export const USER_LINK_PAGES = [
  { href: "/profile", icon: FiUser, label: "Profile" },
  { href: "/orders", icon: FiPackage, label: "My Orders" },
  { href: "/wishlist", icon: FiHeart, label: "Wishlist" },
  { href: "/wallet", icon: FiCreditCard, label: "Wallet" },
  { href: "/profile/addresses", icon: FiMapPin, label: "Addresses" },
];
