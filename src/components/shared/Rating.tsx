import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviews: number;
  reviewsLabel: string;
}

const Rating = ({ rating, reviews, reviewsLabel }: RatingProps) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Star className="h-5 w-5 text-yellow-400 fill-current" />
      <span className="font-semibold text-[#2a2765]">
        {rating}
      </span>
      <span className="text-gray-500">
        ({reviews} {reviewsLabel})
      </span>
    </div>
  );
};

export default Rating;