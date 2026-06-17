import localFont from "next/font/local";

export const editorial = localFont({
  src: [
    {
      path: "../../public/fonts/PPEditorialNew-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPEditorialNew-Ultrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
});
