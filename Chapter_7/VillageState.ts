import roadGraph from "./Meadowfield.js";
import { randomPick } from "./utils.js";
import type { Parcel } from "./types.js";

export default class VillageState {
  place: string;
  parcels: Parcel[];

  constructor(place: string, parcels: Parcel[]) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination: string) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    }
    let parcels = this.parcels
      .map((p) => {
        if (p.place != this.place) return p;
        return { place: destination, address: p.address };
      })
      .filter((p) => p.place != p.address);

    return new VillageState(destination, parcels);
  }

  static random(parcelCount: number = 5) {
    let parcels = [];
    const places = Object.keys(roadGraph);

    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(places);
      let place;
      do {
        place = randomPick(places);
      } while (place == address);
      {
        parcels.push({ place, address });
      }
    }
    return new VillageState("Alice's House", parcels);
  }
}
