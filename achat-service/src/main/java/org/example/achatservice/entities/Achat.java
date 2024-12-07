package org.example.achatservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.achatservice.model.User;
import org.example.achatservice.repository.UtilisateurRepository;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Achat {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String objet;
    private double prix;
    private String userid;
    private Boolean valide;
    private String justifId;
    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "id", insertable = false, updatable = false)
    private Utilisateur utilisateur;
}
