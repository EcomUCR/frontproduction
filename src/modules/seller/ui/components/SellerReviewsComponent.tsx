import { useState, useEffect } from 'react';
import InteractiveRatingSummary from '../../../../components/ui/InteractiveRatingSummary';
import LargeReviewComponent from "../../../../components/data-display/LargeReviewComponent"; 

interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
    likes: number;
    dislikes: number;
}

export default function SellerReviewsComponent() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentRating, setCurrentRating] = useState(0);

    
    useEffect(() => {
        const storedReviews = localStorage.getItem('reviews');
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }
    }, []);

  
    const handleSaveReview = (newReview: Omit<Review, "date" | "likes" | "dislikes">) => {
        const reviewWithDate: Review = {
            ...newReview,
            date: new Date().toLocaleDateString(),
            likes: 0,
            dislikes: 0,
        };
        setReviews(prev => {
            const updated = [reviewWithDate, ...prev];
            localStorage.setItem('reviews', JSON.stringify(updated));
            return updated;
        });
        setCurrentRating(0);
    };

    
    const handleVote = (index: number, type: 'like' | 'dislike') => {
        setReviews(prev =>
            prev.map((r, i) => {
                if (i === index) {
                    const updatedReview = {
                        ...r,
                        likes: type === 'like' ? r.likes + 1 : r.likes,
                        dislikes: type === 'dislike' ? r.dislikes + 1 : r.dislikes
                    };
                    return updatedReview;
                }
                return r;
            })
        );
    };

    const handleRatingChange = (newRating: number) => {
        setCurrentRating(newRating);
    };

    return (
        <section className="mx-10 my-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold font-quicksand">
                    Opiniones de clientes
                </h2>
            </div>

            <div className="flex w-full">
                
                <div className="flex border w-[35%] border-main rounded-2xl">
                    <InteractiveRatingSummary 
                        initialValue={currentRating}
                        onRatingChange={handleRatingChange}
                        onSaveReview={handleSaveReview}
                    />
                </div>

                
                <div className="flex flex-col w-[65%] pl-20">
                    <div className="flex items-center gap-2">
                        <h3>Opiniones</h3>
                        <p className="bg-main-dark/20 py-1 px-2 rounded-full text-xs">
                            {reviews.length}
                        </p>
                    </div>

                    {reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <LargeReviewComponent
                                key={index}
                                name={r.name}
                                rating={r.rating}
                                comment={r.comment}
                                date={r.date}
                                likes={r.likes}
                                dislikes={r.dislikes}
                                onVote={(type) => handleVote(index, type)}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 mt-5">
                            No hay opiniones aún. ¡Sé el primero en dejar una!
                        </p>

                    )}

    
                </div>
            </div>
        </section>
    );
}
