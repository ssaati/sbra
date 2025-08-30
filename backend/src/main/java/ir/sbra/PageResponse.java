package ir.sbra;

import lombok.Data;

import java.util.List;

@Data
public class PageResponse<T extends Object> {
    List data;
    Long total;
}
