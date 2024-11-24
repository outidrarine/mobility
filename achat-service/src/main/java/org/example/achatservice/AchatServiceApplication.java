package org.example.achatservice;

import org.example.achatservice.entities.Achat;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.example.achatservice.repository.AchatRepository;

import java.util.UUID;

@SpringBootApplication
public class AchatServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AchatServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(AchatRepository achatRepository){
		return args -> {
			achatRepository.save(Achat.builder()
					.id(UUID.randomUUID().toString())
					.objet("vélo")
					.prix(100)
					.build());

			achatRepository.findAll().forEach(a-> {
				System.out.println(a.getPrix());
				System.out.println(a.getId());
				System.out.println(a.getObjet());
			});
		};
	}

}
