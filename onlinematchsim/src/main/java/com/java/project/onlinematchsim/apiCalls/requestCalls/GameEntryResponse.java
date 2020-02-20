package com.java.project.onlinematchsim.apiCalls.requestCalls;

import com.fasterxml.jackson.annotation.JsonInclude;

public class GameEntryResponse {
	private Long id;
	private String homeTeamName;
	private String awayTeamName;
	private String date;
	private String teamLevel;
	private String gender;
	private String location;
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	
	
	public Long getId() {
		return id;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public void setId(Long id) {
		this.id = id;
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
