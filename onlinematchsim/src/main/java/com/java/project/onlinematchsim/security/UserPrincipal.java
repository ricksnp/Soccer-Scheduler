package com.java.project.onlinematchsim.security;

import com.java.project.onlinematchsim.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;



import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@SuppressWarnings("serial")
public class UserPrincipal implements UserDetails
{
    private Long id;

    private String name;

    private String username;
    
    private String role;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private String district;

    private String schoolname;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String name, String district, String schoolname, String username, String email, String password, Collection<? extends GrantedAuthority> authorities, String role) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.district = district;
        this.schoolname = schoolname;
        this.password = password;
        this.role = role;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());

        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getDistrict(),
                user.getSchoolname(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities,
                authorities.get(0).toString()
            
        );
    }
    
    

    
    public String getRoles() {
		return role;
	}

	public void setRoles(String roles) {
		this.role = roles;
	}

	public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
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

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public String getRole() {
		return role;
	}

	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}