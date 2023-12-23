import React from "react";

function UserAvatar(props) {
  const generateBackgroundColor = (name) => {
    const colors = [
      "bg-red-700",
      "bg-blue-500",
      "bg-green-600",
      "bg-yellow-500",
    ];
    const hashCode = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const colorIndex = hashCode % colors.length;
    return colors[colorIndex];
  };

  const backgroundColor = generateBackgroundColor(props.user.name);

  return (
    <div
      className={`rounded-full relative ${backgroundColor} w-5 h-5 grid place-content-center text-white text-[8px]`}
    >
      {props.user.name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("")}
      <div
        className={`absolute rounded-full h-1.5 w-1.5 right-0 bottom-0 border border-white ${
          props.user.available ? "bg-green-600" : "bg-yellow-500"
        }`}
      ></div>
    </div>
  );
}

export default UserAvatar;
