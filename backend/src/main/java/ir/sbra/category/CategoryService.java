package ir.sbra.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Page<CategoryDTO> getAllCategories(Pageable pageable) {
        return categoryRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    public CategoryDTO createCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        List<String> children = request.getChildren();
        if (children != null) {
            category.setChildren(String.join(",", children));
        }
        return convertToDTO(categoryRepository.save(category));
    }

    public CategoryDTO updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        category.setName(request.getName());
        List<String> children = request.getChildren();
        if (children != null) {
            category.setChildren(String.join(",", children));
        }
        return convertToDTO(categoryRepository.save(category));
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO(category);
        return dto;
    }

    public CategoryDTO findById(Long id) {
        Optional<Category> byId = categoryRepository.findById(id);
        return convertToDTO(byId.orElseThrow(() -> new RuntimeException("Category not found with id: " + id)));
    }
}