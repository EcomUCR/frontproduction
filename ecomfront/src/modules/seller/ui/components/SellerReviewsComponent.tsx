import React, { useState } from 'react';
import InteractiveRatingSummary from '../../../../components/ui/InteractiveRatingSummary';
import LargeReviewComponent from "../../../../components/data-display/LargeReviewComponent"; 


export default function SellerReviewsComponent() {
    // State to hold the user's currently selected rating
    const [currentRating, setCurrentRating] = useState(0);

    // Handler for when the user clicks a star (updates the big number and bars)
    const handleRatingChange = (newRating: number) => {
        setCurrentRating(newRating);
        console.log("User's selected rating:", newRating);
    };

    // Handler for the "Escribir opinión" button
    const handleWriteOpinionClick = (rating: number) => {
        if (rating > 0) {
            alert(`You are submitting a ${rating.toFixed(1)} star rating.`);
            // Logic to open a modal or navigate to the review text input form
        } else {
            alert('Please select a rating before proceeding to write a review.');
        }
    };

    return (
        <section className="mx-10 my-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold font-quicksand">Opiniones de clientes</h2>
            </div>
            <div className="flex w-full">
                {/* THIS IS THE TARGET DIV */}
                <div className="flex border w-[35%] border-main rounded-2xl">
                    {/*Aquí va el componente que muestra el promedio de estrellas que tiene la tienda */}
                    <InteractiveRatingSummary 
                        initialValue={currentRating}
                        onRatingChange={handleRatingChange}
                        onWriteOpinionClick={handleWriteOpinionClick}
                    />
                </div>
                
                <div className="flex flex-col w-[65%] pl-20">
                    <div className="flex items-center gap-2">
                        <h3>Opiniones</h3>
                        <p className="bg-main-dark/20 py-1 px-2 rounded-full text-xs">3</p>
                    </div>

                    {/*Aquí va el array que muestra las reseñas */}
                    <LargeReviewComponent />
                    <LargeReviewComponent />
                    <LargeReviewComponent />
                </div>
            </div>
        </section>
    );
}