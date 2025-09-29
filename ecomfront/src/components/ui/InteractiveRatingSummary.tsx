import { IconStar, IconStarFilled } from "@tabler/icons-react";
import React, { useState } from "react";

interface InteractiveRatingSummaryProps {
    initialValue?: number;
    maxStars?: number;
    barColor?: string;
    onRatingChange: (value: number) => void;
    onWriteOpinionClick: (rating: number) => void;
}

/**
 * Displays an interactive star rating where the average number and bars
 * immediately reflect the rating the user selects upon clicking.
 */
export default function InteractiveRatingSummary({
    initialValue = 0,
    maxStars = 5,
    barColor = "#ff7e47", // Custom orange color matching the image
    onRatingChange,
    onWriteOpinionClick,
}: InteractiveRatingSummaryProps) {
    const [rating, setRating] = useState(initialValue);
    const [hover, setHover] = useState(0);

    const displayRating = hover || rating;
    
    // --- Bar Chart Logic ---
    const selectedFloorRating = Math.floor(displayRating);
    const isHalfBar = displayRating % 1 !== 0; // True if rating is X.5
    
    const RatingBar = ({ star }: { star: number }) => {
        let width = '0%';
        
        if (star === selectedFloorRating + 1 && isHalfBar) {
            // FIX: If the rating is 3.5, the 4-star bar should show 50%
            width = '50%';
        } else if (star <= selectedFloorRating) {
            // If the rating is 3.5 or 4.0, the 1, 2, and 3-star bars should be 100%
            width = '100%';
        }

        return (
            <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700 w-3">{star}★</span>
                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300`}
                        style={{ width, backgroundColor: barColor }}
                    ></div>
                </div>
            </div>
        );
    };

    // --- Interactive Star Click Logic (FIXED FOR 0.5 INCREMENT) ---
    const handleClick = (index: number) => {
        const starIndex = index; // 0, 1, 2, 3, 4
        const targetHalfValue = starIndex + 0.5;
        const targetFullValue = starIndex + 1.0;
        let newRating = 0;
        
        if (targetHalfValue === rating) {
            // 1. If currently at X.5, the next click makes it X.0 (full star)
            newRating = targetFullValue;
        } else if (targetFullValue === rating) {
            // 2. If currently at X.0, the next click makes it (X-1).0 (clearing the star)
            newRating = starIndex;
        } else if (targetFullValue > rating) {
            // 3. If clicking an unrated star, or a star ahead of the current rating, set it to the target half value (X.5)
            newRating = targetHalfValue;
        } else {
             // 4. If clicking a star before the current rating, set the rating to the clicked star's full value.
            newRating = targetFullValue;
        }
        
        // Final check to prevent going below zero
        if (newRating < 0.5 && index === 0) {
            newRating = 0;
        }

        setRating(newRating);
        onRatingChange(newRating);
    };

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-start mb-4">
                
                {/* Left Side: BIG NUMBER and INTERACTIVE Stars */}
                <div className="flex flex-col items-start w-1/3">
                    {/* Big Number (FIXED: Shows correct value immediately) */}
                    <h2 className="text-5xl font-bold mb-1">
                        {displayRating.toFixed(1)}
                    </h2>
                    
                    {/* Interactive Stars */}
                    <div className="flex">
                        {Array.from({ length: maxStars }).map((_, i) => {
                            const starSize = 20;
                            const isFull = i + 1 <= Math.floor(displayRating);
                            const isHalf = displayRating - i > 0 && displayRating - i < 1;

                            return (
                                <div
                                    key={i}
                                    className="relative cursor-pointer"
                                    style={{ width: starSize, height: starSize }}
                                    onClick={() => handleClick(i)}
                                    onMouseEnter={() => setHover(i + 1)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    {/* Empty Star (Gray) */}
                                    {/* Use IconStar for the background outline */}
                                    <IconStar size={starSize} className="text-gray-300" /> 
                                    
                                    {/* Filled/Half Star (ORANGE FIX) */}
                                    {(isFull || isHalf) && (
                                        <div
                                            className="absolute left-0 top-0 overflow-hidden"
                                            style={{
                                                width: isFull ? '100%' : `${(displayRating - i) * 100}%`,
                                                height: starSize,
                                            }}
                                        >
                                            <IconStarFilled
                                                size={starSize}
                                                // FIXED: Star color now uses the orange barColor for the fill.
                                                className={`text-[${barColor}]`} 
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Instructional text */}
                    <p className="text-sm text-gray-500 mt-1">Tu calificación</p>
                </div>

                {/* Right Side: Distribution Bars (FIXED: Handles half-bar display) */}
                <div className="flex flex-col w-1/2 space-y-1">
                    {/* Render bars from 5 down to 1 */}
                    {[5, 4, 3, 2, 1].map(star => (
                        <RatingBar 
                            key={star} 
                            star={star} 
                        />
                    ))}
                </div>
            </div>

            {/* Button */}
            <button
                onClick={() => onWriteOpinionClick(rating)}
                className="w-full py-3 text-white font-semibold rounded-lg transition duration-200"
                style={{ backgroundColor: barColor }}
                disabled={rating === 0} 
            >
                Escribir opinión
            </button>
        </div>
    );
}