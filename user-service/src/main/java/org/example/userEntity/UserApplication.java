package org.example.userEntity;

import org.example.userEntity.entities.UserEntity;
import org.example.userEntity.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository){
        return args -> {
            userRepository.save(UserEntity.builder().name("Mohamed").email("momo@gmail.com").build());

            userRepository.findAll().forEach(u->{
                System.out.println("===============");
                System.out.println(u.getId());
                System.out.println(u.getName());
                System.out.println(u.getEmail());
            });
        };
    }

}

