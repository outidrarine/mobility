package org.example.achatservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.*;
import org.example.achatservice.model.User;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Achat {
    @Id
    private String id;
    private String objet;
    private double prix;
    @Transient
    private User user;
}
