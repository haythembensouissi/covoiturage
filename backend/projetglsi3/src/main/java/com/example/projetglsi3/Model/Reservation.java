package com.example.projetglsi3.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long rideId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDate reservationDate;

    @Column(nullable = false)
    private int Places; // Number of available places

    // Default constructor
    public Reservation() {
    }

    // Parameterized constructor
    public Reservation(Long rideId, Long userId, LocalDate reservationDate, int Places) {
        this.rideId = rideId;
        this.userId = userId;
        this.reservationDate = reservationDate;
        this.Places = Places;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public int getPlaces() {
        return Places;
    }

    public void setPlaces(int Places) {
        this.Places = Places;
    }
}

