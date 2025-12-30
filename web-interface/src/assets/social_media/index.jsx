import { FaWhatsapp } from "react-icons/fa";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram, BsLinkedin, BsPersonLinesFill } from "react-icons/bs";

const social_media = [
  {
    name: "Github",
    icon: AiFillGithub,
    link: "https://github.com/RadizJoster-web",
    hoverClass: "hover:text-light hover:bg-[#2b3137]", // Warna gelap Github
  },
  {
    name: "Instagram",
    icon: BsInstagram,
    link: "https://www.instagram.com/radizslur/?next=%2F",
    hoverClass: "hover:text-light hover:bg-[#E4405F]", // Pink Instagram
  },
  {
    name: "Linkedin",
    icon: BsLinkedin,
    link: "https://www.linkedin.com/in/radiz-dirganta-834677331/",
    hoverClass: "hover:text-light hover:bg-[#0077b5]", // Biru LinkedIn
  },
  {
    name: "Twitter",
    icon: AiOutlineTwitter,
    link: "#",
    hoverClass: "hover:text-light hover:bg-[#1DA1F2]", // Biru Twitter
  },
  {
    name: "My Portfolio",
    icon: BsPersonLinesFill,
    link: "#",
    hoverClass: "hover:text-light hover:bg-purple-500",
  },
  {
    name: "Contact",
    icon: FaWhatsapp,
    link: "https://wa.me/6285782599453",
    target: "_blank",
    hoverClass: "hover:text-light hover:bg-[#25D366]", // Hijau WhatsApp
  },
];

export default social_media;
