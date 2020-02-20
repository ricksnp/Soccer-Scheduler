package com.java.project.onlinematchsim.repos;

import com.java.project.onlinematchsim.model.GamesCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GamesRepository extends JpaRepository<GamesCalendar, Long> 
{
	List<GamesCalendar> findByMatchId(List<Long> matchId);
	Boolean existsById(long id);
}
