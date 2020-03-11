package com.java.project.onlinematchsim.model;


import javax.validation.constraints.NotBlank;
import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="gamesCalendar", uniqueConstraints= {
		@UniqueConstraint(columnNames = {"matchId"})
})

public class GamesCalendar 
{
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long matchId;
	
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

	public GamesCalendar(long matchId, String homeTeamName, String awayTeamName,
			 String date,  String location,  String teamLevel,  String gender, String status) {
		super();
		this.matchId = matchId;
		this.homeTeamName = homeTeamName;
		this.awayTeamName = awayTeamName;
		this.date = date;
		this.location = location;
		this.teamLevel = teamLevel;
		this.gender = gender;
		this.status = status;
	}

	public GamesCalendar() {
		// TODO Auto-generated constructor stub
	}

	public long getMatchId() {
		return matchId;
	}

	public void setMatchId(long matchId) {
		this.matchId = matchId;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
	
	
	
}
