package com.example.stockexchange.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF if not needed
                .cors() // Enable CORS
                .and()
                .authorizeRequests()
                .antMatchers("/api/**").permitAll() // Adjust paths as needed
                .anyRequest().authenticated();

        return http.build();
    }
}

