package com.java.project.onlinematchsim.service;

//import com.java.project.onlinematchsim.exception.BadRequestException;
//import com.java.project.onlinematchsim.exception.ResourceNotFoundException;

import com.java.project.onlinematchsim.apiCalls.requestCalls.*;
import com.java.project.onlinematchsim.model.*;
//import com.java.project.onlinematchsim.repos.UserRepository;
import com.java.project.onlinematchsim.repos.BlockedDaysRepo;
import com.java.project.onlinematchsim.repos.GamesRepository;
import com.java.project.onlinematchsim.security.UserPrincipal;
import com.java.project.onlinematchsim.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.java.project.onlinematchsim.apiCalls.responseCalls.BlockedDaysResponse;
import com.java.project.onlinematchsim.apiCalls.requestCalls.BlockedDaysRequest;


@Service
public class CalendarService {
	@Autowired 
	private GamesRepository gamesRepository;

	@Autowired
	private BlockedDaysRepo blockedDaysRepo;
	
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

	public void createMultipleGames(List<GamesCalendar> gamesCalendarList)
	{

		for(int i = 0; i < gamesCalendarList.size(); i++) {

			GamesCalendar gameCal = new GamesCalendar();
			gameCal.setHomeTeamName(gamesCalendarList.get(i).getHomeTeamName());
			gameCal.setAwayTeamName(gamesCalendarList.get(i).getAwayTeamName());
			gameCal.setDate(gamesCalendarList.get(i).getDate());
			gameCal.setLocation(gamesCalendarList.get(i).getLocation());
			gameCal.setGender(gamesCalendarList.get(i).getGender());
			gameCal.setStatus(gamesCalendarList.get(i).getStatus());
			gameCal.setTeamLevel(gamesCalendarList.get(i).getTeamLevel());

			gamesRepository.save(gameCal);
		}
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
			respo.setStatus(each.getStatus());
			lii1.add(respo);
		}
		return lii1;
					
	}
	
	public GamesCalendar updateGame(Long matchId, UpdateGameRequest updateGameRequest)
	{
		GamesCalendar gamesCal = gamesRepository.findByMatchId(matchId).orElseThrow( () -> new ResourceNotFoundException("Game","id", matchId));

		UpdateGameResponse game = new UpdateGameResponse();


		gamesCal.setMatchId(updateGameRequest.getId());
		gamesCal.setStatus(updateGameRequest.getStatus());
		gamesCal.setDate(updateGameRequest.getDate());
		gamesCal.setLocation(updateGameRequest.getLocation());

		gamesRepository.save(gamesCal);
		game.setId(updateGameRequest.getId());
		game.setStatus(updateGameRequest.getStatus());

		return gamesRepository.save(gamesCal);
	}

	public BlockedDays editBlockedDays(BlockedDaysRequest blockedDaysRequest)
	{
		String date = blockedDaysRequest.getDate();
		String name = blockedDaysRequest.getName();
		Long id = blockedDaysRequest.getId();

		BlockedDays blockedDays = blockedDaysRepo.findById(id).orElseThrow( () -> new ResourceNotFoundException("Game","id", id));

		blockedDays.setName(name);
		blockedDays.setDate(date);

		return blockedDaysRepo.save(blockedDays);
	}

	public BlockedDays addBlockedDay(BlockedDaysRequest blockedDaysRequest)
	{
		String date = blockedDaysRequest.getDate();
		String name = blockedDaysRequest.getName();

		BlockedDays blockedDays = new BlockedDays();
		blockedDays.setName(name);
		blockedDays.setDate(date);

		return blockedDaysRepo.save(blockedDays);
	}

	public List<BlockedDaysResponse> getBlockedGames( UserPrincipal currentuser)
	{
		List<BlockedDays> lii = blockedDaysRepo.findAll();
		List<BlockedDaysResponse> lii1 = new ArrayList<>();
		BlockedDaysResponse respo;
		for(BlockedDays each : lii)
		{
			respo = new BlockedDaysResponse();
			respo.setId(each.getId());
			respo.setName(each.getName());
			respo.setDate(each.getDate());
			lii1.add(respo);
		}
		return lii1;

	}

	
	
	
}
