package org.example.achatservice;

import org.example.achatservice.entities.Achat;
import org.example.achatservice.feign.UserRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.example.achatservice.repository.AchatRepository;

import java.util.UUID;

@EnableFeignClients
@SpringBootApplication
public class AchatServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AchatServiceApplication.class, args);
	}

}
