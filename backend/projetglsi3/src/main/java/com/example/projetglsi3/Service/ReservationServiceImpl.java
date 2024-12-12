package com.example.projetglsi3.Service;
import com.example.projetglsi3.Exception.ResourceNotFoundException;
import com.example.projetglsi3.Model.Reservation;
import com.example.projetglsi3.Repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {

    private static final Logger logger = LoggerFactory.getLogger(ReservationServiceImpl.class);

    private final ReservationRepository reservationRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @Override
    public Reservation createReservation(Reservation reservation) {
        logger.info("Creating a new reservation: {}", reservation);
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getAllReservations() {
        logger.info("Fetching all reservations");
        return reservationRepository.findAll();
    }

    @Override
    public Optional<Reservation> getReservationById(Long id) {
        logger.info("Fetching reservation with id: {}", id);
        return reservationRepository.findById(id);
    }

    @Override
    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        logger.info("Updating reservation with id: {}", id);
        return reservationRepository.findById(id)
                .map(existingReservation -> {
                    logger.info("Found reservation: {}, updating with new data: {}", existingReservation, updatedReservation);
                    existingReservation.setRideId(updatedReservation.getRideId());
                    existingReservation.setUserId(updatedReservation.getUserId());
                    existingReservation.setReservationDate(updatedReservation.getReservationDate());
                    existingReservation.setPlaces(updatedReservation.getPlaces());
                    return reservationRepository.save(existingReservation);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id " + id));
    }

    @Override
    public void deleteReservation(Long id) {
        logger.info("Deleting reservation with id: {}", id);
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            logger.info("Reservation with id: {} successfully deleted", id);
        } else {
        }
    }

    @Override
    public List<Reservation> getReservationsByUserId(Long userId) {
        logger.info("Fetching reservations for user id: {}", userId);
        return reservationRepository.findByUserId(userId);
    }
}
