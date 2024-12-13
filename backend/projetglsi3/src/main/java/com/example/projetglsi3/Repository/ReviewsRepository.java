package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Review, Long> {
    List<Review> findByItemId(Long itemId);
}
