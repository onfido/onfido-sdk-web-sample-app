import { useEffect } from "react";
import { Onfido } from "onfido-sdk-ui";

import "./App.css";

export const App = () => {
  useEffect(() => {
    Onfido.init({
      token: "<YOUR_SDK_TOKEN>",
      containerId: "onfido-mount",
      steps: ["welcome", "document", "face", "complete"],
    });
  }, []);

  return <div id="onfido-mount"></div>;
};
