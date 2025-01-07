import { Apps } from "shared/types";
import { AppCard } from "./types";
import farmLandLogo from "./images/farmland.webp";
import polyglotLogo from "./images/polyglot.webp";
import hometressLogo from "./images/hometress.webp";
import { APPLICATION_NAMES } from "shared/constants";

export const APPLICATION_CARDS: Array<AppCard> = [
  {
    app: Apps.polyglot,
    name: APPLICATION_NAMES[Apps.polyglot],
    icon: polyglotLogo,
  },
  {
    app: Apps.farmland,
    name: APPLICATION_NAMES[Apps.farmland],
    icon: farmLandLogo,
  },
  {
    app: Apps.hometress,
    name: APPLICATION_NAMES[Apps.hometress],
    icon: hometressLogo,
  },
];
