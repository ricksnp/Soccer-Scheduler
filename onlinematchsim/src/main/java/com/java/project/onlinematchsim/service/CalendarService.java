package com.java.project.onlinematchsim.service;

//import com.java.project.onlinematchsim.exception.BadRequestException;
//import com.java.project.onlinematchsim.exception.ResourceNotFoundException;

import com.java.project.onlinematchsim.model.*;
//import com.java.project.onlinematchsim.repos.UserRepository;
import com.java.project.onlinematchsim.repos.GamesRepository;
import com.java.project.onlinematchsim.security.UserPrincipal;
import com.java.project.onlinematchsim.apiCalls.requestCalls.GameEntryResponse;
import com.java.project.onlinematchsim.apiCalls.requestCalls.GamesEntryRequest;
import com.java.project.onlinematchsim.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

//import java.util.Collections;
//import java.util.List;
//import java.util.Map;
//import java.util.function.Function;
//import java.util.stream.Collectors;


@Service
public class CalendarService {
	@Autowired 
	private GamesRepository gamesRepository;
	
//	@Autowired
//	private UserRepository userRepository;
//	
//	private static final Logger logger = LoggerFactory.getLogger(CalendarService.class);s
	
	public GamesCalendar createGame(GamesEntryRequest gamesEntryRequest)
	{
		GamesCalendar gameCal = new GamesCalendar();
		gameCal.setHomeTeamName(gamesEntryRequest.getHomeTeamName());
		gameCal.setAwayTeamName(gamesEntryRequest.getAwayTeamName());
		gameCal.setDate(gamesEntryRequest.getDate());
		gameCal.setLocation(gamesEntryRequest.getLocation());
		gameCal.setGender(gamesEntryRequest.getGender());
		gameCal.setStatus(gamesEntryRequest.getStatus());
		gameCal.setTeamLevel(gamesEntryRequest.getTeamLevel());
		return gamesRepository.save(gameCal);
		
		
	}
	
	public GameEntryResponse getGamesById(Long matchId, UserPrincipal currentuser)
	{
		GamesCalendar gamesCal = gamesRepository.findByMatchId(matchId).orElseThrow( () -> new ResourceNotFoundException("Game","id", matchId));
		
		
		GameEntryResponse respo = new GameEntryResponse();
		respo.setId(gamesCal.getMatchId());
		respo.setAwayTeamName(gamesCal.getAwayTeamName());
		respo.setDate(gamesCal.getDate());
		respo.setGender(gamesCal.getGender());
		respo.setHomeTeamName(gamesCal.getHomeTeamName());
		respo.setTeamLevel(gamesCal.getTeamLevel());
		respo.setLocation(gamesCal.getLocation());
		return respo;
	}
	
	public List<GameEntryResponse> getAllGames( UserPrincipal currentuser)
	{
		List<GamesCalendar> lii = gamesRepository.findAll();
		List<GameEntryResponse> lii1 = new ArrayList<>();
		GameEntryResponse respo;
		for(GamesCalendar each : lii)
		{
			respo = new GameEntryResponse();
			respo.setId(each.getMatchId());
			respo.setAwayTeamName(each.getAwayTeamName());
			respo.setDate(each.getDate());
			respo.setGender(each.getGender());
			respo.setHomeTeamName(each.getHomeTeamName());
			respo.setTeamLevel(each.getTeamLevel());
			respo.setLocation(each.getLocation());
			lii1.add(respo);
		}
		return lii1;
		
		
		
	}
	
	
	
	
}
