package ir.sbra.baseinfo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BaseInfoDTO {
    private Long id;
    private String name;
    private String level;
    private String childrenLevel;
    private String title;
    private Long categoryId;
    private String categoryName;
    private Long parentId;
    private String parentName;

}
