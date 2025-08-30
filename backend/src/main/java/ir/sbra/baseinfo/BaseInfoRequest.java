package ir.sbra.baseinfo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BaseInfoRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String title;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private Long parentId;
}