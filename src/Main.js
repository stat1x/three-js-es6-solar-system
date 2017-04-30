import domready from "domready";
import Controller from "./Controller";

domready(() => {
    let ctrl = new Controller();
    ctrl.start();
});
