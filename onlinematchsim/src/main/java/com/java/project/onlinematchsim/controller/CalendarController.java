package com.java.project.onlinematchsim.controller;

import com.java.project.onlinematchsim.model.GamesCalendar;
import com.java.project.onlinematchsim.exception.ResourceNotFoundException;
import com.java.project.onlinematchsim.repos.GamesRepository;
import com.java.project.onlinematchsim.security.UserPrincipal;
import com.java.project.onlinematchsim.service.CalendarService;
import com.java.project.onlinematchsim.security.CurrentUser;
import com.java.project.onlinematchsim.apiCalls.responseCalls.*;
import com.java.project.onlinematchsim.apiCalls.requestCalls.*;
import com.java.project.onlinematchsim.repos.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController 
{
	@Autowired
	private GamesRepository gamesRepository;
	
	@Autowired
	private CalendarService calendarService;
	
	
	@PostMapping
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> registerGames(@Valid @RequestBody GamesEntryRequest gameReq)
	{
		GamesCalendar gamesCalendar = calendarService.createGame(gameReq);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{matchId}").buildAndExpand(gamesCalendar.getMatchId()).toUri();
		return ResponseEntity.created(location).body(new ApiResponse(true, "Game Created Successfully"));
	}
	
	@GetMapping("/allgames")
	public List<GameEntryResponse> getAllGames(@CurrentUser UserPrincipal currentUser)
	{
		return calendarService.getAllGames(currentUser);
	}
	
	
}
