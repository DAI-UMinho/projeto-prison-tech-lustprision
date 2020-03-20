package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.SystemAdmin;
import com.lustprision.admin.repository.SystemAdminRepository;
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
 * REST controller for managing {@link com.lustprision.admin.domain.SystemAdmin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SystemAdminResource {

    private final Logger log = LoggerFactory.getLogger(SystemAdminResource.class);

    private static final String ENTITY_NAME = "systemAdmin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SystemAdminRepository systemAdminRepository;

    public SystemAdminResource(SystemAdminRepository systemAdminRepository) {
        this.systemAdminRepository = systemAdminRepository;
    }

    /**
     * {@code POST  /system-admins} : Create a new systemAdmin.
     *
     * @param systemAdmin the systemAdmin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new systemAdmin, or with status {@code 400 (Bad Request)} if the systemAdmin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/system-admins")
    public ResponseEntity<SystemAdmin> createSystemAdmin(@RequestBody SystemAdmin systemAdmin) throws URISyntaxException {
        log.debug("REST request to save SystemAdmin : {}", systemAdmin);
        if (systemAdmin.getId() != null) {
            throw new BadRequestAlertException("A new systemAdmin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemAdmin result = systemAdminRepository.save(systemAdmin);
        return ResponseEntity.created(new URI("/api/system-admins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /system-admins} : Updates an existing systemAdmin.
     *
     * @param systemAdmin the systemAdmin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated systemAdmin,
     * or with status {@code 400 (Bad Request)} if the systemAdmin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the systemAdmin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/system-admins")
    public ResponseEntity<SystemAdmin> updateSystemAdmin(@RequestBody SystemAdmin systemAdmin) throws URISyntaxException {
        log.debug("REST request to update SystemAdmin : {}", systemAdmin);
        if (systemAdmin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemAdmin result = systemAdminRepository.save(systemAdmin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, systemAdmin.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /system-admins} : get all the systemAdmins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of systemAdmins in body.
     */
    @GetMapping("/system-admins")
    public List<SystemAdmin> getAllSystemAdmins() {
        log.debug("REST request to get all SystemAdmins");
        return systemAdminRepository.findAll();
    }

    /**
     * {@code GET  /system-admins/:id} : get the "id" systemAdmin.
     *
     * @param id the id of the systemAdmin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the systemAdmin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/system-admins/{id}")
    public ResponseEntity<SystemAdmin> getSystemAdmin(@PathVariable Long id) {
        log.debug("REST request to get SystemAdmin : {}", id);
        Optional<SystemAdmin> systemAdmin = systemAdminRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemAdmin);
    }

    /**
     * {@code DELETE  /system-admins/:id} : delete the "id" systemAdmin.
     *
     * @param id the id of the systemAdmin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/system-admins/{id}")
    public ResponseEntity<Void> deleteSystemAdmin(@PathVariable Long id) {
        log.debug("REST request to delete SystemAdmin : {}", id);
        systemAdminRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
