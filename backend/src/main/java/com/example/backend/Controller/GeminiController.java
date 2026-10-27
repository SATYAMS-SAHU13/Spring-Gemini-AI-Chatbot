
package com.example.backend.Controller;

import com.example.backend.Model.GeminiRequest;
import com.example.backend.Service.GeminiService;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "*")

public class GeminiController {
    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ask")
    public String askGemini(@RequestBody GeminiRequest request) {

        return geminiService.askGemini(request.getPrompt());

    }
}
