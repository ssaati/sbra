package ir.sbra.base;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @Controller
    public class HomeController {
        @GetMapping("/")
        public String index() {
            return "index.html";
        }
    }
}
