package ir.sbra.category;

import ir.sbra.PageResponseUtil;
import ir.sbra.base.ReactAdminUtils;
import ir.sbra.baseinfo.BaseInfoDTO;
import ir.sbra.baseinfo.BaseInfoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static ir.sbra.base.BaseController.ID_VAR;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final BaseInfoService baseInfoService;

    public CategoryController(CategoryService categoryService, BaseInfoService baseInfoService) {
        this.categoryService = categoryService;
        this.baseInfoService = baseInfoService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories(
            @RequestParam(name = "range", required = false) String range,
            @RequestParam(name = "sort", required = false) String sort,
            @RequestParam Map<String, String> filterParams) {

            Pageable pageable = ReactAdminUtils.buildPageable(range, sort);
            Page<CategoryDTO> allCategories = categoryService.getAllCategories(pageable);
            return PageResponseUtil.convert(allCategories.toList());
    }
    @GetMapping(value = ID_VAR)
    public ResponseEntity<CategoryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.createCategory(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequest request
    ) {
        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }

    @GetMapping("/{id}/baseinfos")
    public Page<BaseInfoDTO> getBaseInfosByCategory(
            @PathVariable Long id,
            @RequestParam(required = false) Long parentId,
            @RequestParam(name = "range", required = false) String range,
            @RequestParam(name = "sort", required = false) String sort,
            @RequestParam Map<String, String> filterParams) {

        Pageable pageable = ReactAdminUtils.buildPageable(range, sort);
        if (parentId != null) {
            return baseInfoService.getChildren(parentId, pageable);
        }
        return baseInfoService.getRootByCategoryId(id, pageable);
    }
}

