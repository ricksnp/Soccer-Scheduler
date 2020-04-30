package com.java.project.onlinematchsim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = { 
		MatchSim.class,
		Jsr310JpaConverters.class 
})


public class MatchSim {

	public static void main(String[] args) {
		SpringApplication.run(MatchSim.class, args);
	}

}
