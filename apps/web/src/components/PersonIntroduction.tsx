import React from "react";
import { WaveCountCard } from "./WaveCountCard";

export const PersonIntroduction: React.FC<{
    name: string,
    title: string,
    description: string,
    imageUrl: string,
    totalWaves: Number | null
}> = ({ name, title, description, imageUrl, totalWaves }) => {
    return (
        <div className="bg-white w-[1000px] rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center sm:flex-row">
                <img
                    src={imageUrl}
                    alt={`${name}'s profile`}
                    className="w-16 h-16 rounded-full mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32"
                />
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-gray-600">{title}</p>
                </div>
                <div className="flex flex-grow"></div>
                {totalWaves != null &&
                    <WaveCountCard
                        waveCount={totalWaves}
                    />
                }
            </div>
            <p className="mt-4">{description}</p>
        </div>
    );
};

