package com.java.project.onlinematchsim.repos;

import com.java.project.onlinematchsim.model.BlockedDays;
//import com.java.project.onlinematchsim.model.GamesCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import java.util.Optional;

@Repository
public interface BlockedDaysRepo extends JpaRepository<BlockedDays, Long> {



}
