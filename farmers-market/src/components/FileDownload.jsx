import React from "react";
import { FaDownload } from "react-icons/fa";

const FileDownload = () => {
    const files = [
        { name: "2025 Sulphur Springs Farmers Market Application.docx", displayName: "Application" },
        { name: "2025 Sulphur Springs Farmers Market Guidelines.docx", displayName: "Sulphur Springs Guidelines"},
        { name: "FarmersMarketGuidelines_7-24-19.pdf", displayName: "Arkansas Guidelines" }
    ];

    const handleDownload = (filename) => {
        fetch(`'https://nlesmann.site/api/download/${encodeURIComponent(filename)}`)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch(error => console.error("Download failed:", error));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white text-[#1a1a1a] rounded-md shadow-md">
            <h3 className="text-2xl font-semibold text-center mb-4">Download Files</h3>
            <ul className="space-y-4">
                {files.map((file) => (
                    <li key={file.name} className="flex items-center justify-between p-3 border-[#D4AF37] border-2 rounded-lg">
                        <span className="text-lg text-[#1a1a1a]">{file.displayName}</span>
                        <button 
                            onClick={() => handleDownload(file.name)} 
                            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white font-bold rounded-md hover:bg-yellow-600 hover:text-[#D4AF37] transition"
                        >
                            <FaDownload />
                            Download
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileDownload;
