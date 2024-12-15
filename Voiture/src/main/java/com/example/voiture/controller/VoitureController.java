package com.example.voiture.controller;

import com.example.voiture.model.Client;
import com.example.voiture.model.Voiture;
import com.example.voiture.repository.VoitureRepository;
import com.example.voiture.services.ClientService;
import com.example.voiture.services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VoitureController {

    @Autowired
    VoitureRepository voitureRepository;
    @Autowired
    VoitureService voitureService;
    @Autowired
    ClientService clientService;

    @GetMapping(value = "/voitures", produces = {"application/json"})
    public ResponseEntity<Object> findAll() {
        try {
            List<Voiture> voitures = voitureRepository.findAll();
            voitures.forEach(voiture -> {
                try {
                    voiture.setClient(clientService.clientById(voiture.getIdclient()));
                } catch (Exception e) {
                }
            });
            return ResponseEntity.ok(voitures);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching voitures: " + e.getMessage());
        }
    }

    @GetMapping("/voitures/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id) {
        try {
            Voiture voiture = voitureRepository.findById(id)
                    .orElseThrow(() -> new Exception("Voiture Introuvable"));
            voiture.setClient(clientService.clientById(voiture.getIdclient()));
            return ResponseEntity.ok(voiture);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Voiture not found with ID: " + id);
        }
    }

    @GetMapping("/voitures/client/{id}")
    public ResponseEntity<List<Voiture>> findByClient(@PathVariable Long id) {
        try {
            Client client = clientService.clientById(id);
            if (client != null) {
                List<Voiture> voitures = voitureRepository.findByIdclient(id);
                voitures.forEach(voiture -> voiture.setClient(client));
                return ResponseEntity.ok(voitures);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/voitures/{clientId}")
    public ResponseEntity<Object> save(@PathVariable Long clientId, @RequestBody Voiture voiture) {
        try {
            Client client = clientService.clientById(clientId);

            if (client != null) {
                voiture.setClient(client);

                voiture.setIdclient(clientId);
                voiture.setClient(client);
                Voiture savedVoiture = voitureService.enregistrerVoiture(voiture);

                return ResponseEntity.ok(savedVoiture);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Client not found with ID: " + clientId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving voiture: " + e.getMessage());
        }
    }

    @PutMapping("/voitures/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Voiture updatedVoiture) throws Exception {
        Voiture existingVoiture = voitureRepository.findById(id)
                .orElseThrow(() -> new Exception("Voiture not found with ID: " + id));
        
        // Update only the non-null fields from the request body
        if (updatedVoiture.getMatricule() != null && !updatedVoiture.getMatricule().isEmpty()) {
            existingVoiture.setMatricule(updatedVoiture.getMatricule());
        }

        if (updatedVoiture.getMarque() != null && !updatedVoiture.getMarque().isEmpty()) {
            existingVoiture.setMarque(updatedVoiture.getMarque());
        }

        if (updatedVoiture.getModel() != null && !updatedVoiture.getModel().isEmpty()) {
            existingVoiture.setModel(updatedVoiture.getModel());
        }

        // Save the updated Voiture
        Voiture savedVoiture = voitureRepository.save(existingVoiture);
        return ResponseEntity.ok(savedVoiture);
    }
}