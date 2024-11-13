import { Montserrat, Indie_Flower, Satisfy, Silkscreen} from "next/font/google";


export const montserrat = Montserrat({subsets: ["latin"],variable: "--font-montserrat"})

export const indie_flower = Indie_Flower({subsets: ["latin"], weight:"400"})

export const satisfy = Satisfy({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-satisfy"
})

export const silkscreen = Silkscreen({
  subsets: ["latin"], // Puedes agregar otros subsets si es necesario
  weight: ["400","700"], // Si deseas importar múltiples pesos, agrégalo como un array
  variable: "--font-silkscreen", // Define una variable CSS
});