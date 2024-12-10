package org.example.achatservice.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Controller
public class FileUploader {

    @Value("${fichiers.jsutificatifs.chemin.root}")
    private String fichiersJustificatifsRoot;


    @PostMapping("/api/savefile")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId,
            @RequestParam("justifId") String fileId,
            @RequestParam("year") String year) {

        final Path rootLocation = Paths.get(fichiersJustificatifsRoot);

        String message;

        try {
            // Define user and year-specific directory
            Path userYearPath = rootLocation.resolve(userId).resolve(year);

            // Create directories if they don't exist
            if (!Files.exists(userYearPath)) {
                Files.createDirectories(userYearPath);
            }

            // Construct the target file path
            Path targetFilePath = userYearPath.resolve(fileId);

            // Copy the file to the target location
            Files.copy(file.getInputStream(), targetFilePath, StandardCopyOption.REPLACE_EXISTING);

            message = "File successfully uploaded to: " + targetFilePath.toString();
            return ResponseEntity.status(HttpStatus.OK).body(message);

        } catch (IOException e) {
            e.printStackTrace();
            message = "Failed to upload the file!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }


    @GetMapping("api/getfile/{userId}/{year}/{fileName}")
    public ResponseEntity<Resource> serveFile(
            @PathVariable String userId,
            @PathVariable String year,
            @PathVariable String fileName) {
        final Path rootLocation = Paths.get(fichiersJustificatifsRoot);

        try {
            Path filePath = rootLocation.resolve(userId).resolve(year).resolve(fileName);
            Resource file = new UrlResource(filePath.toUri());

            if (file.exists() || file.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(file);
            } else {
                throw new RuntimeException("File not found!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while reading the file!", e);
        }
    }
}