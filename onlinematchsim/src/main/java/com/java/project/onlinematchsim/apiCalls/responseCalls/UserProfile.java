package com.java.project.onlinematchsim.apiCalls.responseCalls;



public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private String role;
    private String district;
    private String schoolname;

    public UserProfile(Long id, String username, String name, String role, String district, String schoolname)
    {
        this.id = id;
        this.username = username;
        this.name = name;
        this.role = role;
        this.district = district;
        this.schoolname = schoolname;
    }


    
    
    public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
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

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getSchoolname() {
        return schoolname;
    }

    public void setSchoolname(String schoolname) {
        this.schoolname = schoolname;
    }
}