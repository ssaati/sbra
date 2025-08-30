package ir.sbra.baseinfo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseInfoRepository extends JpaRepository<BaseInfo, Long> {
    Page<BaseInfo> findByCategoryId(Long categoryId, Pageable pageable);

    Page<BaseInfo> findByParentId(Long parentId, Pageable pageable);

    @Query("SELECT bi FROM BaseInfo bi WHERE bi.parent IS NULL AND bi.category.id = :categoryId")
    Page<BaseInfo> findRootBaseInfosByCategory(@Param("categoryId") Long categoryId, Pageable pageable);
}