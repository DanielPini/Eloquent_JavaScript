import roadGraph from "./Meadowfield.js";
import { randomPick } from "./utils.js";
export default class VillageState {
    place;
    parcels;
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }
        let parcels = this.parcels
            .map((p) => {
            if (p.place != this.place)
                return p;
            return { place: destination, address: p.address };
        })
            .filter((p) => p.place != p.address);
        return new VillageState(destination, parcels);
    }
    static random(parcelCount = 5) {
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
