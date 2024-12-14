package org.example.achatservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Abonnement {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String userid;
    private Boolean valide;
    private String justifId;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date dateSaisie;
    private String mois;
    private String type;
    private String commentaire;
    private String commentaireRH;
    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "id", insertable = false, updatable = false)
    private Utilisateur utilisateur;
    private String id;
    // Abonnement
    private String ville;
    private String modeAbonnement;
    private String objet;
    private double montant;
    private Date dateDebutValidete;
    private Date dateFinValidite;
    private int quantite;

}
