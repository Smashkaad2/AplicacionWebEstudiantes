package edu.javeriana.tallernotasAOP;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class MvcrestApplication {

    public static void main(String[] args) {
        SpringApplication.run(MvcrestApplication.class, args);
    }

}
