package org.example.userEntity.feign;

import org.example.userEntity.model.Achat;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ACHAT-SERVICE")
public interface AchatRestClient {

    @GetMapping("/api/achats/{id}")
    Achat findAchat(@PathVariable String id);

    @GetMapping("/api/achats/")
    PagedModel<Achat> getAllAchats();
}
