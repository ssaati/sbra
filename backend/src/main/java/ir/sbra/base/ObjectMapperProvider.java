package ir.sbra.base;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ObjectMapperProvider {

    private static ObjectMapper objectMapper;

    @Autowired
    public ObjectMapperProvider(ObjectMapper mapper) {
        ObjectMapperProvider.objectMapper = mapper;
    }

    public static ObjectMapper get() {
        return objectMapper;
    }
}