package org.example.achatservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.achatservice.model.User;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Achat {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String objet;
    private double prix;
    private String userid;
    private String usermail;
    private boolean valide;
    @Transient private User user;
}
