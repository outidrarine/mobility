package org.example.achatservice.web;

import org.example.achatservice.entities.Achat;
import org.example.achatservice.feign.UserRestClient;
import org.example.achatservice.repository.AchatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AchatsRestController {
    @Autowired
    private UserRestClient userRestClient;
    @Autowired
    private AchatRepository achatRepository;
    @GetMapping("/achats/{id}")
    public Achat getAchatById(@PathVariable String id ){

        Achat achat = achatRepository.findById(id).get();
        achat.setUser(userRestClient.getUserById(achat.getUserid()));
        return achat;
    }
}
