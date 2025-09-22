import React, { useState } from "react";

interface StatusSwitchProps {
  initial: boolean;
}

const StatusSwitch: React.FC<StatusSwitchProps> = ({ initial }) => {
  const [active, setActive] = useState(initial);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${active ? "bg-green-500" : "bg-red-500"
        }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${active ? "translate-x-5" : ""
          }`}
      ></span>
    </button>
  );
};

export default StatusSwitch;
