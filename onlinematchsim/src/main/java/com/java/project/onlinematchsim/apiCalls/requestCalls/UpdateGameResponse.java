package com.java.project.onlinematchsim.apiCalls.requestCalls;

import com.fasterxml.jackson.annotation.JsonInclude;

public class UpdateGameResponse {
	private Long id;
	private String status;
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
