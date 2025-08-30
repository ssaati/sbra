package ir.sbra.baseinfo;

import ir.sbra.PageResponseUtil;
import ir.sbra.base.ReactAdminUtils;
import ir.sbra.category.CategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static ir.sbra.base.BaseController.ID_VAR;

@RestController
@RequestMapping("/api/v1/baseinfo")
public class BaseInfoController {
    private final BaseInfoService baseInfoService;

    public BaseInfoController(BaseInfoService baseInfoService) {
        this.baseInfoService = baseInfoService;
    }

    @GetMapping
    public ResponseEntity<List<BaseInfoDTO>> getAllBaseInfo(
            @RequestParam(name = "range", required = false) String range,
            @RequestParam(name = "sort", required = false) String sort,
            @RequestParam(name = "filter", required = false) String filterStr) {
        Map<String, Object> filterParams = ReactAdminUtils.buildFilter(filterStr);
        Object categoryId = filterParams.get("categoryId");
        Object parentId = filterParams.get("parentId");
        Object id = filterParams.get("id");
        Pageable pageable = ReactAdminUtils.buildPageable(range, sort);
        List baseInfoList = new ArrayList<>();
        if(id !=null && StringUtils.hasText(id.toString())){
            if(id instanceof List){
                baseInfoList = Collections.singletonList(baseInfoService.findById(Long.valueOf(((List<?>) id).get(0).toString())));
            }else
                baseInfoList = Collections.singletonList(baseInfoService.findById(Long.valueOf(id.toString())));
        }
        if(categoryId != null && StringUtils.hasText(categoryId.toString())){
            Page<BaseInfoDTO> allCategories = baseInfoService.getRootByCategoryId(Long.valueOf(categoryId.toString()), pageable);
            baseInfoList = allCategories.getContent();
        }
        if(parentId != null && StringUtils.hasText(parentId.toString())){
            Page<BaseInfoDTO> allCategories = baseInfoService.getChildren(Long.valueOf(parentId.toString()), pageable);
            baseInfoList = allCategories.getContent();
        }
        return PageResponseUtil.convert(baseInfoList);
    }

    @GetMapping(value = ID_VAR)
    public ResponseEntity<BaseInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(baseInfoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<BaseInfoDTO> createBaseInfo(@RequestBody BaseInfoRequest request) {
        return ResponseEntity.ok(baseInfoService.createBaseInfo(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseInfoDTO> updateBaseInfo(
            @PathVariable Long id,
            @RequestBody BaseInfoRequest request
    ) {
        return ResponseEntity.ok(baseInfoService.updateBaseInfo(id, request));
    }

    @GetMapping("/{id}/children")
    public ResponseEntity<Page<BaseInfoDTO>> getChildBaseInfos(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(parseSort(sort)));
        return ResponseEntity.ok(baseInfoService.getChildren(id, pageable));
    }

    private List<Sort.Order> parseSort(String[] sort) {
        return Arrays.stream(sort)
                .map(s -> s.split(","))
                .map(a -> new Sort.Order(
                        Sort.Direction.fromString(a[1]),
                        a[0]
                ))
                .collect(Collectors.toList());
    }
}