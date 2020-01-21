package com.java.project.onlinematchsim.repos;

import com.java.project.onlinematchsim.model.Role;
import com.java.project.onlinematchsim.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}