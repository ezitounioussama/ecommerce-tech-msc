import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const pachel = localFont({
  src: [
    {
      path: "../../public/fonts/TRTPachelDemo-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/TRTPachelDemo-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/TRTPachelDemo-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/TRTPachelDemo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TRTPachelDemo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/TRTPachelDemo-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/TRTPachelDemo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pachel",
  display: "swap",
});
