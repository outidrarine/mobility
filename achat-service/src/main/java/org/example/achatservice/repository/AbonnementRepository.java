package org.example.achatservice.repository;

import org.example.achatservice.entities.Abonnement;
import org.example.achatservice.entities.Achat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AbonnementRepository extends JpaRepository<Abonnement, String> {
}
