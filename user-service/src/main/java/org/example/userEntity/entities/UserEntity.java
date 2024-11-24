package org.example.userEntity.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.userEntity.model.Achat;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    @Transient
    private List<Achat> achatList;

}
