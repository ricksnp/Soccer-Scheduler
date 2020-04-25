package com.java.project.onlinematchsim.apiCalls.requestCalls;

import javax.validation.constraints.NotBlank;

public class BlockedDaysRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String date;

    private Long id;

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
