import React from "react";

declare module "react-clipboard" {
  //   declare const Clipboard: React.FunctionComponent<any>;
  //   export default Clipboard;
  const Clipboard: React.FunctionComponent<any>;
  export = Clipboard;
}
