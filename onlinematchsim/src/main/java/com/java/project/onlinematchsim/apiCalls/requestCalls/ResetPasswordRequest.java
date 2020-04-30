package com.java.project.onlinematchsim.apiCalls.requestCalls;

import javax.validation.constraints.*;
public class ResetPasswordRequest {
	
		@NotBlank
		private String id;
		
		@NotBlank
	    @Size(min = 4, max = 40)
	    private String name;

	    @NotBlank
	    @Size(min = 3, max = 15)
	    private String username;

	    @NotBlank
	    @Size(min = 6, max = 20)
	    private String password;

	    @NotBlank
	    private String district;

	    @NotBlank
	    private String schoolname;
	    
	    

	    public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
	        return name;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }

	    public String getUsername() {
	        return username;
	    }

	    public void setUsername(String username) {
	        this.username = username;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
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
