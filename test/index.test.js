import pluginTester from "babel-plugin-tester";
import plugin from "../src/index.js";
const path = require("path");

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    plugins: ["@babel/plugin-syntax-jsx"]
  },
  tests: {
    code: `
            function Component(){}
            Component.defaultProps = {
                p: 2,
                px: [3, 2, 5, "7"],
                py: [2, 0],
                pl: [3],
                m: "3",
            };
            Component.defaultProps.mr = 5;
            Component.defaultProps["ml"] = 5;
            
            <Component pr={3} mode m="4" p={2} pl="1" mr={[4,5]} />
        `
  },
  fixtures: path.join(__dirname, "__fixtures__")
});
