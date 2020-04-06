package com.java.project.onlinematchsim.apiCalls.requestCalls;

import com.java.project.onlinematchsim.model.GamesCalendar;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class MultipleGamesRequest {

    private List<GamesCalendar> gameslist;

    public List<GamesCalendar> getGameslist() {
        return gameslist;
    }

    public void setGameslist(List<GamesCalendar> gameslist) {
        this.gameslist = gameslist;
    }
}
