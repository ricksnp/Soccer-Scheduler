package com.java.project.onlinematchsim.apiCalls.requestCalls;


import javax.validation.constraints.*;

public class GamesEntryRequest {
	
	@NotBlank
	private String homeTeamName;
	
	@NotBlank
	private String awayTeamName;
	
	@NotBlank
	private String date;
	
	@NotBlank
	private String location;
	
	@NotBlank
	private String teamLevel;
	
	@NotBlank
	private String gender;
	
	@NotBlank
	private String status;
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getHomeTeamName() {
		return homeTeamName;
	}

	public void setHomeTeamName(String homeTeamName) {
		this.homeTeamName = homeTeamName;
	}

	public String getAwayTeamName() {
		return awayTeamName;
	}

	public void setAwayTeamName(String awayTeamName) {
		this.awayTeamName = awayTeamName;
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

	public String getTeamLevel() {
		return teamLevel;
	}

	public void setTeamLevel(String teamLevel) {
		this.teamLevel = teamLevel;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	
}
