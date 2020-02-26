package com.java.project.onlinematchsim.repos;

import com.java.project.onlinematchsim.model.GamesCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GamesRepository extends JpaRepository<GamesCalendar, Long> 
{
	Optional<GamesCalendar> findByMatchId(Long matchId);
	Optional<GamesCalendar> findAllGames(String name);
	Boolean existsById(long id);
}


