package ir.sbra.baseinfo;

import ir.sbra.category.Category;
import ir.sbra.category.CategoryDTO;
import ir.sbra.category.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BaseInfoService {
    private final BaseInfoRepository baseInfoRepository;
    private final CategoryRepository categoryRepository;

    public BaseInfoService(BaseInfoRepository baseInfoRepository,
                           CategoryRepository categoryRepository) {
        this.baseInfoRepository = baseInfoRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<BaseInfoDTO> getRootByCategoryId(Long categoryId, Pageable pageable) {
        return baseInfoRepository.findRootBaseInfosByCategory(categoryId, pageable)
                .map(this::convertToDTO);
    }

    public Page<BaseInfoDTO> getChildren(Long parentId, Pageable pageable) {
        return baseInfoRepository.findByParentId(parentId, pageable)
                .map(this::convertToDTO);
    }

    public BaseInfoDTO createBaseInfo(BaseInfoRequest request) {
        BaseInfo baseInfo = new BaseInfo();
        return saveBaseInfo(request, baseInfo);
    }

    public BaseInfoDTO updateBaseInfo(Long id, BaseInfoRequest request) {
        BaseInfo baseInfo = baseInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BaseInfo not found with id: " + id));
        return saveBaseInfo(request, baseInfo);
    }

    private BaseInfoDTO saveBaseInfo(BaseInfoRequest request, BaseInfo baseInfo) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));

        baseInfo.setName(request.getName());
        baseInfo.setTitle(request.getTitle());
        baseInfo.setCategory(category);

        if (request.getParentId() != null) {
            BaseInfo parent = baseInfoRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent BaseInfo not found with id: " + request.getParentId()));
            baseInfo.setParent(parent);
            if(parent.getLevel() != null)
                baseInfo.setLevel(parent.getLevel() + 1);
        } else {
            baseInfo.setParent(null);
            baseInfo.setLevel(0);
        }

        return convertToDTO(baseInfoRepository.save(baseInfo));
    }

    private BaseInfoDTO convertToDTO(BaseInfo baseInfo) {
        BaseInfoDTO dto = new BaseInfoDTO();
        dto.setId(baseInfo.getId());
        dto.setName(baseInfo.getName());
        dto.setTitle(baseInfo.getTitle());

        if (baseInfo.getCategory() != null) {
            dto.setCategoryId(baseInfo.getCategory().getId());
            dto.setCategoryName(baseInfo.getCategory().getName());
            CategoryDTO categoryDTO = new CategoryDTO(baseInfo.getCategory());
            Integer level = baseInfo.getLevel();
            if(level !=null){
                if(level < categoryDTO.getChildren().size())
                    dto.setLevel(categoryDTO.getChildren().get(level));
                if(level < categoryDTO.getChildren().size() -1)
                    dto.setChildrenLevel(categoryDTO.getChildren().get(level+1));
            }
        }

        if (baseInfo.getParent() != null) {
            dto.setParentId(baseInfo.getParent().getId());
            dto.setParentName(baseInfo.getParent().getName());
        }

        return dto;
    }

    public BaseInfoDTO findById(Long id) {
        Optional<BaseInfo> byId = baseInfoRepository.findById(id);
        return convertToDTO(byId.orElseThrow(() -> new RuntimeException("BaseInfo not found with id: " + id)));
    }
}