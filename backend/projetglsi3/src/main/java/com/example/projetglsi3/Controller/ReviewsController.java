package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Review;
import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Service.ReviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {
    private final ReviewsService reviewsService;

    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @GetMapping("/get/{itemId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long itemId) {
        List<Review> reviews = reviewsService.getReviewsByItemId(itemId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("create/{itemId}")
    public ResponseEntity<Review> addReview(@PathVariable Long itemId, @RequestBody Review review) {
        Review createdReview = reviewsService.addReview(itemId, review);
        return ResponseEntity.ok(createdReview);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Review>> getAllReviews() {
       List<Review> reviews;
       reviews=reviewsService.getAllReviews();
       return ResponseEntity.ok(reviews);
    }
    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<Review> deleteReview(@PathVariable Long itemId) {
         reviewsService.deleteReview(itemId);
         return ResponseEntity.ok().build();
    }
}

