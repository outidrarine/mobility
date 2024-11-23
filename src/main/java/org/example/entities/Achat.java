package org.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Achat {
    @Id
    private String id;
    private String objet;
    private String montant;
    private double prix;
}
