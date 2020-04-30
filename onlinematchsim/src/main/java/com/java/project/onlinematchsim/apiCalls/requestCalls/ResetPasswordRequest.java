package com.java.project.onlinematchsim.apiCalls.requestCalls;

import javax.validation.constraints.*;
public class ResetPasswordRequest {
	
	@NotBlank
	private String id;
	
	@NotBlank
    @Size(min = 6, max = 20)
    private String password;
	
	public ResetPasswordRequest(String id, String password)
	{
		super();
		 setId(id);
		 setPassword(password);
		 this.id=getId();
		 this.password=getPassword();
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
