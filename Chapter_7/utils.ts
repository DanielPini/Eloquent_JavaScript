import roadGraph from "./Meadowfield.js";
import type { Graph, SearchItem, Parcel } from "./types";

export const randomPick = (array: string[]) => {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
};

export const findRoute = (graph: Graph, from: string, to: string) => {
  let work: SearchItem[] = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
};

export const goalOrientedRobot = (
  { place, parcels }: { place: string; parcels: Parcel[] },
  memory: string[] = [],
) => {
  if (memory.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      memory = findRoute(roadGraph, place, parcel.place)!;
    } else {
      memory = findRoute(roadGraph, place, parcel.address)!;
    }
  }
  return { direction: memory[0], memory: memory.slice(1) };
};

export const carefulRobot = (
  { place, parcels }: { place: string; parcels: Parcel[] },
  memory: string[],
) => {
  if (!memory || memory.length == 0) {
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place)!,
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address)!,
          pickUp: false,
        };
      }
    });

    let bestRoute = routes.reduce((best, current) => {
      return current.route.length < best.route.length ? current : best;
    });

    memory = bestRoute.route;
  }
  return { direction: memory[0], memory: memory.slice(1) };
};

interface PotentialRoute {
  route: string[];
  score: number;
}

export const smartRobot = (
  { place, parcels }: { place: string; parcels: Parcel[] },
  memory: string[] = [],
) => {
  if (memory.length === 0) {
    // 1. Map parcels to PotentialRoute objects
    const potentialRoutes: PotentialRoute[] = parcels.map((parcel) => {
      const isPickUp = parcel.place !== place;
      const target = isPickUp ? parcel.place : parcel.address;
      const route = findRoute(roadGraph, place, target)!;

      // 2. The Scoring Logic
      let score = route.length;

      // Bonus: Dropping off is slightly better than picking up (-0.5 turns)
      // This breaks ties if two houses are the same distance away.
      if (!isPickUp) {
        score -= 0.5;
      }

      // Bonus: Is this target house the pick-up spot for OTHER parcels too?
      // If we go here, we can grab two birds with one stone.
      const othersAtTarget = parcels.filter((p) => p.place === target).length;
      if (isPickUp && othersAtTarget > 1) {
        score -= 1;
      }

      return { route, score };
    });

    // 3. Find the route with the lowest (best) score
    const bestBranch = potentialRoutes.reduce((prev, curr) =>
      curr.score < prev.score ? curr : prev,
    );

    memory = bestBranch.route;
  }

  return { direction: memory[0], memory: memory.slice(1) };
};
