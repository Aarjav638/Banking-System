import Image from "next/image";
import React from "react";
import { Fab as TinyFab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
const Fab = () => {
  return (
    <TinyFab
      //   mainButtonStyles={mainButtonStyles}
      //   actionButtonStyles={actionButtonStyles}
      //   style={style}
      icon={<Image src={"../public/menu.png"} alt=" Services " />}
      alwaysShowTitle={true}
    >
      <Action text="Email" />
      <Action text="Help">
        <i className="fa fa-help" />
      </Action>
    </TinyFab>
  );
};
export default Fab;
