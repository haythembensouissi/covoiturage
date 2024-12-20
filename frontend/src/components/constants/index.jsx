import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../../assets/profile-pictures/user1.jpg";
import user2 from "../../assets/profile-pictures/user2.jpg";
import user3 from "../../assets/profile-pictures/user3.jpg";
import user4 from "../../assets/profile-pictures/user4.jpg";
import user5 from "../../assets/profile-pictures/user5.jpg";
import user6 from "../../assets/profile-pictures/user6.jpg";

export const testimonials = [
  {
    user: "Abdou",
    company: "Tunis Express",
    image: user1,
    text: "My ride was smooth and very comfortable. The driver was professional and friendly, and the car was clean and safe. I will definitely use this service again.",
  },
  {
    user: "Farah",
    company: "Sousse Travelers",
    image: user2,
    text: "The experience was excellent! I reached my destination easily and at an affordable price. Communication with the driver was seamless. Highly recommended.",
  },
  {
    user: "Youssef",
    company: "Carpooling Experts",
    image: user3,
    text: "The service exceeded my expectations. The driver was punctual, and the ride was both comfortable and secure. It's a cost-effective way to travel.",
  },
  {
    user: "Rayen",
    company: "Safe Rides",
    image: user4,
    text: "This was my first time using the app, and it was a great experience. The driver was very kind, and the trip was on time. It’s a great way to reduce travel costs..",
  },
  {
    user: "Halim",
    company: "Go Together",
    image: user5,
    text: "This app is fantastic! The ride was extremely comfortable, and the driver was very professional. It’s a great way to reduce travel costs.",
  },
  {
    user: "Ranim",
    company: "Eco Ride",
    image: user6,
    text: "A brilliant and innovative idea. The ride was easy and safe, and the driver was very cooperative. I recommend this app to anyone looking for a practical and comfortable way to travel.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Drag-and-Drop Interface",
    description:
      "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Compatibility",
    description:
      "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
  },
  {
    icon: <ShieldHalf />,
    text: "Built-in Templates",
    description:
      "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Find rides effortlessly",
    description: 
      "Easily search and connect with drivers heading to your destination.",
  },
  {
    title: "Book your seat in seconds",
    description: 
      "Secure your spot quickly with a user-friendly booking process.",
  },
  {
    title: "Travel safely and comfortably",
    description: 
      "Enjoy rides with verified drivers and safe travel options.",
  },
  {
    title: "Share costs and save money",
    description: 
      "Split travel expenses with others and make your journeys more affordable.",
  },
];


export const pricingOptions = [
  {
    title: "Basic",
    price: "$0",
    features: [
      "Post up to 2 ride offers per week",
      "Standard visibility for ride offers",
      "Basic support",
      "No commission fees on rides",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Post unlimited ride offers",
      "Priority visibility for ride offers",
      "Advanced support",
      "No commission fees on rides",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Dedicated account manager",
      "Custom branding for ride offers",
      "Priority customer support",
      "Access to premium analytics",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
