package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Reservation;
import com.example.projetglsi3.Service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        Reservation createdReservation = reservationService.createReservation(reservation);
        return ResponseEntity.ok(createdReservation);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        if (reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        }
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable Long userId) {
        List<Reservation> reservations = reservationService.getReservationsByUserId(userId);
        if (reservations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        try {
            return ResponseEntity.ok(reservationService.updateReservation(id, reservation));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);

            return ResponseEntity.ok("reservation deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
