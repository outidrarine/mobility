package org.example.achatservice.feign;

import jakarta.ws.rs.Path;
import org.example.achatservice.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE")
public interface UserRestClient {
    @GetMapping("/api/userEntities/{id}")
    User getUserById(@PathVariable Long id);
}
