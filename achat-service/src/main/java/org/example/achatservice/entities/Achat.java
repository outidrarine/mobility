package org.example.achatservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Achat {
    @Id
    private String id;
    private String objet;
    private double prix;
}
