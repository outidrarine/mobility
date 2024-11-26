package org.example.userEntity.configTest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserConfigTest {
    @Value("${global.params.x}")
    private String x;
    @Value("${global.params.y}")
    private String y;

    @GetMapping("/testconfig")
    public Map<String, String> configTests(){
        return Map.of("p1", x, "p2", y);
    }
}
