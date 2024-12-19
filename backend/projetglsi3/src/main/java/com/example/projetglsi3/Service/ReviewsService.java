package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Review;
import com.example.projetglsi3.Repository.ReviewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsService {
    private final ReviewsRepository reviewsRepository;

    public ReviewsService(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    public List<Review> getReviewsByItemId(Long itemId) {
        return reviewsRepository.findByItemId(itemId);
    }

    public Review addReview(Long itemId, Review review) {
        review.setItemId(itemId);
        return reviewsRepository.save(review);
    }
    public List<Review> getAllReviews() {
        return reviewsRepository.findAll();
    }
    public void  deleteReview(Long reviewId) {
        reviewsRepository.deleteById(reviewId);
    }
}

