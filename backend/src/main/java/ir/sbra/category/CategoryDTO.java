package ir.sbra.category;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private List<String> children;

    public CategoryDTO(Category category) {
        setId(category.getId());
        setName(category.getName());
        String children = category.getChildren();
        if (children != null) {
            setChildren(new ArrayList<>(Arrays.asList(children.split(","))));
        }else
            setChildren(new ArrayList<>());
    }
}