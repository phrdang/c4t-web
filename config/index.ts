import development from "./env/development";
import production from "./env/production";
import extend from "lodash/extend";

const dynamicConfig = process.env.NODE_ENV === "development" ? development : production; 

const config = extend({
    name: "C4T Website",
}, dynamicConfig );

export default config; 