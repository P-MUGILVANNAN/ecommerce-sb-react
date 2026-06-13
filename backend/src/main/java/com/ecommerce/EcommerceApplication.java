package com.ecommerce;

import com.ecommerce.entity.Admin;
import com.ecommerce.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	@Bean
	public CommandLineRunner initAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (adminRepository.findByEmail("admin@gmail.com").isEmpty()) {
				Admin admin = new Admin("admin@gmail.com", passwordEncoder.encode("admin123"));
				adminRepository.save(admin);
				System.out.println("Default admin user initialized: admin@gmail.com / admin123");
			}
		};
	}
}
