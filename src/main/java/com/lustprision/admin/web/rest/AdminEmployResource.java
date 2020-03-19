package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.AdminEmploy;
import com.lustprision.admin.repository.AdminEmployRepository;
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
 * REST controller for managing {@link com.lustprision.admin.domain.AdminEmploy}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AdminEmployResource {

    private final Logger log = LoggerFactory.getLogger(AdminEmployResource.class);

    private static final String ENTITY_NAME = "adminEmploy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdminEmployRepository adminEmployRepository;

    public AdminEmployResource(AdminEmployRepository adminEmployRepository) {
        this.adminEmployRepository = adminEmployRepository;
    }

    /**
     * {@code POST  /admin-employs} : Create a new adminEmploy.
     *
     * @param adminEmploy the adminEmploy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new adminEmploy, or with status {@code 400 (Bad Request)} if the adminEmploy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/admin-employs")
    public ResponseEntity<AdminEmploy> createAdminEmploy(@RequestBody AdminEmploy adminEmploy) throws URISyntaxException {
        log.debug("REST request to save AdminEmploy : {}", adminEmploy);
        if (adminEmploy.getId() != null) {
            throw new BadRequestAlertException("A new adminEmploy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdminEmploy result = adminEmployRepository.save(adminEmploy);
        return ResponseEntity.created(new URI("/api/admin-employs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /admin-employs} : Updates an existing adminEmploy.
     *
     * @param adminEmploy the adminEmploy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adminEmploy,
     * or with status {@code 400 (Bad Request)} if the adminEmploy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the adminEmploy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/admin-employs")
    public ResponseEntity<AdminEmploy> updateAdminEmploy(@RequestBody AdminEmploy adminEmploy) throws URISyntaxException {
        log.debug("REST request to update AdminEmploy : {}", adminEmploy);
        if (adminEmploy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AdminEmploy result = adminEmployRepository.save(adminEmploy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, adminEmploy.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /admin-employs} : get all the adminEmploys.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of adminEmploys in body.
     */
    @GetMapping("/admin-employs")
    public List<AdminEmploy> getAllAdminEmploys() {
        log.debug("REST request to get all AdminEmploys");
        return adminEmployRepository.findAll();
    }

    /**
     * {@code GET  /admin-employs/:id} : get the "id" adminEmploy.
     *
     * @param id the id of the adminEmploy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the adminEmploy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/admin-employs/{id}")
    public ResponseEntity<AdminEmploy> getAdminEmploy(@PathVariable Long id) {
        log.debug("REST request to get AdminEmploy : {}", id);
        Optional<AdminEmploy> adminEmploy = adminEmployRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(adminEmploy);
    }

    /**
     * {@code DELETE  /admin-employs/:id} : delete the "id" adminEmploy.
     *
     * @param id the id of the adminEmploy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/admin-employs/{id}")
    public ResponseEntity<Void> deleteAdminEmploy(@PathVariable Long id) {
        log.debug("REST request to delete AdminEmploy : {}", id);
        adminEmployRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
