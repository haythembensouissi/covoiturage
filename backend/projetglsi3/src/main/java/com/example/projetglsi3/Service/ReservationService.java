package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Reservation;

import java.util.List;
import java.util.Optional;

public interface ReservationService {

    Reservation createReservation(Reservation reservation);

    List<Reservation> getAllReservations();

    Optional<Reservation> getReservationById(Long id);

    Reservation updateReservation(Long id, Reservation updatedReservation);

    void deleteReservation(Long id);

    List<Reservation> getReservationsByUserId(Long userId);
}

