package com.java.project.onlinematchsim.apiCalls.responseCalls;

import com.fasterxml.jackson.annotation.JsonInclude;

public class BlockedDaysResponse {

    private String name;
    private String date;
    private Long id;

    @JsonInclude(JsonInclude.Include.NON_NULL)

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
