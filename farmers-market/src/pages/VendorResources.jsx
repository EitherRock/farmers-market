import React from "react";
import FileDownload from "../components/FileDownload";

const VendorResources = () => {
  return (
    <div className="text-center mt-6 p-4">
        <h1 className="text-4xl font-bold max-w-xl mx-auto">
            Vendor Information and Resources
        </h1>
        <p className="text-white">More information here! Download the stuff</p>
        <FileDownload />
    </div>
  );
};

export default VendorResources;
