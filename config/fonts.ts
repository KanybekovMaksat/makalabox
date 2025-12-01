import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import { Rubik } from "next/font/google";

export const fontSans = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"], 
});

export const fontMono = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"], 
});

export const fontRubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"], 
});