package com.java.project.onlinematchsim.apiCalls.requestCalls;

import javax.validation.constraints.*;
public class UpdateGameRequest {
	
	@NotBlank
	private String status;
	
	
	private Long id;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
