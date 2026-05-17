import roadGraph from "./Meadowfield.js";
import VillageState from "./VillageState.js";
import { goalOrientedRobot, randomPick, carefulRobot, smartRobot, } from "./utils.js";
import { mailRoute } from "./MailRoute.js";
console.clear();
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}
function routeRobot(state, memory = []) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}
// Running the robot
function runRobot(state, robot, memory) {
    for (let turn = 0; turn < 1000; turn++) {
        if (state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
    return 1000;
}
// runRobot(VillageState.random(Math.floor(Math.random() * 10)), routeRobot);
// runRobot(
//   VillageState.random(Math.floor(Math.random() * 10)),
//   goalOrientedRobot,
// );
// console.log(findRoute(roadGraph, "Alice's House", "Grete's House"));
// Test both robots with 100 tasks. Random and Goal orientated
function testRobots() {
    let arr = [];
    for (let i = 0; i < 10000; i++) {
        const village = VillageState.random(Math.floor(Math.random() * 10));
        arr[0] = arr[0]
            ? (arr[0] += runRobot(village, randomRobot))
            : (arr[0] = runRobot(village, randomRobot));
        arr[1] = arr[1]
            ? (arr[1] += runRobot(village, routeRobot))
            : (arr[1] = runRobot(village, routeRobot));
        arr[2] = arr[2]
            ? (arr[2] += runRobot(village, goalOrientedRobot))
            : (arr[2] = runRobot(village, goalOrientedRobot));
        arr[3] = arr[3]
            ? (arr[3] += runRobot(village, carefulRobot))
            : (arr[3] = runRobot(village, carefulRobot));
        arr[4] = arr[4]
            ? (arr[4] += runRobot(village, smartRobot))
            : (arr[4] = runRobot(village, smartRobot));
    }
    return arr.map((e, i) => {
        switch (i) {
            case 0:
                return `RandomRobot ${e / 10000}`;
            case 1:
                return `RouteRobot ${e / 10000}`;
            case 2:
                return `GoalOrientatedRobot ${e / 10000}`;
            case 3:
                return `CarefulRobot ${e / 10000}`;
            case 4:
                return `Smart ${e / 10000}`;
            default:
                throw new Error("Shouldn't reach here");
        }
    });
}
console.log(JSON.stringify(testRobots(), null, 2));
