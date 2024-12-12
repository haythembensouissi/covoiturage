package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RideRepository extends JpaRepository <Ride, Long>{
    List<Ride> findByDepartureLocationAndDestinationAndDepartureDateTimeAfterAndPricePerSeatLessThanEqual(String departurePoint, String destination, LocalDateTime departureTime, Double maxPrice);
    List<Ride> findByDriverId(Long driverId);

    @Query("SELECT r FROM Ride r WHERE " +
            "(:departureLocation IS NULL OR LOWER(r.departureLocation) LIKE LOWER(CONCAT('%', :departureLocation, '%'))) AND " +
            "(:destination IS NULL OR LOWER(r.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) AND " +
            "(:departureDateTime IS NULL OR r.departureDateTime = :departureDateTime) AND " +
            "(:minPrice IS NULL OR r.pricePerSeat >= :minPrice) AND " +
            "(:maxPrice IS NULL OR r.pricePerSeat <= :maxPrice) AND " +
            "(:availableSeats IS NULL OR r.availableSeats >= :availableSeats)")
    List<Ride> searchRides(String departureLocation, String destination, LocalDateTime departureDateTime, Double minPrice, Double maxPrice, Integer availableSeats);
}
