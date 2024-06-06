import { calvin } from "./Calvin";
import { columbia } from "./Columbia";
import { adidas } from "./Adidas";
import { nike } from "./Nike";
import { hollister } from "./Hollister";
import { jordan } from "./Jordan";
import { levis } from "./Levis";
import { puma } from "./Puma";
import { reebok } from "./Reebok";
import { timberland } from "./Timberland";
import { tommy } from "./Tommy";
import { asics } from "./Asics";
import { variadas } from "./Variadas";

const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}productos`, {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json",
  },
});

//ESTO YA TRAE LA DATA

const data = await request.json();

const camisas = [
  ...calvin,
  ...columbia,
  ...nike,
  ...hollister,
  ...jordan,
  ...levis,
  ...puma,
  ...reebok,
  ...timberland,
  ...tommy,
  ...variadas,
  ...adidas,
  ...asics,
];

export { camisas };
