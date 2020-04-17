package com.lustprision.admin.service;

import com.lustprision.admin.domain.AdminEmploy;
import com.lustprision.admin.domain.User;
import com.lustprision.admin.repository.AdminEmployRepository;
import com.lustprision.admin.repository.AuthorityRepository;
import com.lustprision.admin.security.AuthoritiesConstants;
import com.lustprision.admin.security.SecurityUtils;
import com.lustprision.admin.service.dto.AdminEmployDTO;
import io.github.jhipster.security.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminEmployService {


    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final AdminEmployRepository adminEmployRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthorityRepository authorityRepository;

    private final CacheManager cacheManager;

    public AdminEmployService(AdminEmployRepository adminEmployRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository, CacheManager cacheManager) {
        this.adminEmployRepository = adminEmployRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.cacheManager = cacheManager;
    }

    public AdminEmploy registerEmployee(AdminEmployDTO employDTO) {

        adminEmployRepository.findOneByEmail(employDTO.getEmail()).ifPresent(existingEmployee -> {
            boolean removed = removeNonActivatedUser(existingEmployee);
            if (!removed) {
                throw new EmailAlreadyUsedException();
            }
        });

        AdminEmploy adminEmploy = new AdminEmploy();
        if (employDTO.getEmail() != null) {
            adminEmploy.setEmail(employDTO.getEmail().toLowerCase());
        }
        adminEmploy.setNameAdminEmp(employDTO.getNameAdminEmp());
        adminEmploy.setActivated(true);
        adminEmploy.setActitionKey(RandomUtil.generateActivationKey());
        authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authority -> adminEmploy.setAuthority(authority));
        adminEmployRepository.save(adminEmploy);
        log.debug("Created Information for Employee: {}", adminEmploy);
        return adminEmploy;
    }

    @Transactional(readOnly = true)
    public Optional<AdminEmploy> getUserWithAuthorities(Long id) {
        return adminEmployRepository.findOneWithAuthoritiesById(id);
    }

    private boolean removeNonActivatedUser(AdminEmploy existingEmployee) {
        if (existingEmployee.isActivated()) {
            return false;
        }
        adminEmployRepository.delete(existingEmployee);
        adminEmployRepository.flush();
//        this.clearUserCaches(existingEmployee);
        return true;
    }
}
