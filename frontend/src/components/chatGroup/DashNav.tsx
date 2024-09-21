import React from "react";
import ProfileMenu from "../auth/ProfileMenu";

const DashNav = (
    {name, image}: {name: string; image?: string}
) => {

    return (
      <div className="py-2 px-6 flex justify-between items-center bg-white shadow-sm ">
            <h1 className="text-xl md:text-2xl font-extrabold">QuickChat</h1>
            <div>
                <ProfileMenu name={name} image={image} />
            </div>
      </div>
    );
};

export default DashNav;
