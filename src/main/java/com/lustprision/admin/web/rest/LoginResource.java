package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.Login;
import com.lustprision.admin.repository.LoginRepository;
import com.lustprision.admin.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lustprision.admin.domain.Login}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LoginResource {

    private final Logger log = LoggerFactory.getLogger(LoginResource.class);

    private static final String ENTITY_NAME = "login";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LoginRepository loginRepository;

    public LoginResource(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    /**
     * {@code POST  /logins} : Create a new login.
     *
     * @param login the login to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new login, or with status {@code 400 (Bad Request)} if the login has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/logins")
    public ResponseEntity<Login> createLogin(@RequestBody Login login) throws URISyntaxException {
        log.debug("REST request to save Login : {}", login);
        if (login.getId() != null) {
            throw new BadRequestAlertException("A new login cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Login result = loginRepository.save(login);
        return ResponseEntity.created(new URI("/api/logins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /logins} : Updates an existing login.
     *
     * @param login the login to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated login,
     * or with status {@code 400 (Bad Request)} if the login is not valid,
     * or with status {@code 500 (Internal Server Error)} if the login couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/logins")
    public ResponseEntity<Login> updateLogin(@RequestBody Login login) throws URISyntaxException {
        log.debug("REST request to update Login : {}", login);
        if (login.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Login result = loginRepository.save(login);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, login.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /logins} : get all the logins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of logins in body.
     */
    @GetMapping("/logins")
    public List<Login> getAllLogins() {
        log.debug("REST request to get all Logins");
        return loginRepository.findAll();
    }

    /**
     * {@code GET  /logins/:id} : get the "id" login.
     *
     * @param id the id of the login to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the login, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/logins/{id}")
    public ResponseEntity<Login> getLogin(@PathVariable Long id) {
        log.debug("REST request to get Login : {}", id);
        Optional<Login> login = loginRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(login);
    }

    /**
     * {@code DELETE  /logins/:id} : delete the "id" login.
     *
     * @param id the id of the login to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/logins/{id}")
    public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
        log.debug("REST request to delete Login : {}", id);
        loginRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
