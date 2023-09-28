import React from "react";

export const WaveCountCard: React.FC<{ waveCount: Number }> = ({ waveCount }) => {
    return (
        <div
            className="bg-white w-fit p-2 h-fit rounded-lg border-2 border-teal-400 hover:shadow-xl transition-all duration-300"
        >
            <h2 className="text-xl text-transparent bg-gradient-to-l bg-clip-text  from-red-400 to-purple-600 font-semibold">Wave Count</h2>
            <div className="flex items-center justify-center">
                <div className="text-lg font-bold text-blue-500">{waveCount.toString()}</div>
            </div>
        </div>
    );
};
