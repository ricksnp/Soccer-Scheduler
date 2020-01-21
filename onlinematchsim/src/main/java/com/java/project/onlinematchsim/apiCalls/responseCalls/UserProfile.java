package com.java.project.onlinematchsim.apiCalls.responseCalls;



public class UserProfile {
    private Long id;
    private String username;
    private String name;

    public UserProfile(Long id, String username, String name)
    {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


}