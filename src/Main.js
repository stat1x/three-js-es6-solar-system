import domready from "domready";
import Simulator from "./Simulator";

domready(() => {
    let simulator = new Simulator();
    simulator.start();
});
