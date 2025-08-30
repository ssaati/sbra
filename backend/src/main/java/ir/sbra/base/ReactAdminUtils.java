package ir.sbra.base;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReactAdminUtils {

    public static Map<String, Object> buildFilter(String filterStr){
        Map<String, Object> stringListMap = new HashMap();
        if(filterStr != null) {
            try {
                stringListMap = ObjectMapperProvider.get().readValue(filterStr, Map.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        return stringListMap;
    }
    public static Pageable buildPageable(String rangeStr, String sortStr) {
        List<Integer> range = parseRange(rangeStr);
        List<String> sort = parseSort(sortStr);

        int page = 0;
        int size = 10;

        if (range != null && range.size() == 2) {
            int start = range.get(0);
            int end = range.get(1);
            size = end - start + 1;
            page = start / size;
        }

        String sortField = "id";
        Sort.Direction direction = Sort.Direction.ASC;

        if (sort != null && sort.size() == 2) {
            sortField = sort.get(0);
            direction = Sort.Direction.fromString(sort.get(1));
        }

        return PageRequest.of(page, size, Sort.by(direction, sortField));
    }
    public static List<Integer> parseRange(String rangeStr) {
        if (rangeStr == null || rangeStr.isEmpty()) return Arrays.asList(0, 9);
        rangeStr = rangeStr.replaceAll("[\\[\\]\\s]", "");
        String[] parts = rangeStr.split(",");
        return Arrays.asList(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));
    }

    public static List<String> parseSort(String sortStr) {
        if (sortStr == null || sortStr.isEmpty()) return Arrays.asList("id", "ASC");
        sortStr = sortStr.replaceAll("[\\[\\]\\s\"]", "");
        String[] parts = sortStr.split(",");
        return Arrays.asList(parts[0], parts[1]);
    }
}
