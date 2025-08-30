package ir.sbra.category;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Data
public class CategoryRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private List<String> children;
}