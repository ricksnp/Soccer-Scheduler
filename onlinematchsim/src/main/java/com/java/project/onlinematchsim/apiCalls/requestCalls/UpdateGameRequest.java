package com.java.project.onlinematchsim.apiCalls.requestCalls;

import javax.validation.constraints.*;
public class UpdateGameRequest {
	
	@NotBlank
	private String status;

	private String date;

	private String teamLevel;
	
	private String gender;

	private String location;
	
	private Long id;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTeamLevel() {
		return teamLevel;
	}

	public void setTeamLevel(String level) {
		teamLevel = level;
	}

	public String getGender(){
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}


	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
}
