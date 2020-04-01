package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.repository.PrisionerRepository;
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
 * REST controller for managing {@link com.lustprision.admin.domain.Prisioner}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrisionerResource {

    private final Logger log = LoggerFactory.getLogger(PrisionerResource.class);

    private static final String ENTITY_NAME = "prisioner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrisionerRepository prisionerRepository;

    public PrisionerResource(PrisionerRepository prisionerRepository) {
        this.prisionerRepository = prisionerRepository;
    }

    /**
     * {@code POST  /prisioners} : Create a new prisioner.
     *
     * @param prisioner the prisioner to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prisioner, or with status {@code 400 (Bad Request)} if the prisioner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prisioners")
    public ResponseEntity<Prisioner> createPrisioner(@RequestBody Prisioner prisioner) throws URISyntaxException {
        log.debug("REST request to save Prisioner : {}", prisioner);
        if (prisioner.getId() != null) {
            throw new BadRequestAlertException("A new prisioner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prisioner result = prisionerRepository.save(prisioner);
        return ResponseEntity.created(new URI("/api/prisioners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prisioners} : Updates an existing prisioner.
     *
     * @param prisioner the prisioner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prisioner,
     * or with status {@code 400 (Bad Request)} if the prisioner is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prisioner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prisioners")
    public ResponseEntity<Prisioner> updatePrisioner(@RequestBody Prisioner prisioner) throws URISyntaxException {
        log.debug("REST request to update Prisioner : {}", prisioner);
        if (prisioner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Prisioner result = prisionerRepository.save(prisioner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prisioner.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prisioners} : get all the prisioners.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prisioners in body.
     */
    @GetMapping("/prisioners")
    public List<Prisioner> getAllPrisioners() {
        log.debug("REST request to get all Prisioners");
        return prisionerRepository.findAll();
    }

    /**
     * {@code GET  /prisioners/:id} : get the "id" prisioner.
     *
     * @param id the id of the prisioner to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prisioner, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prisioners/{id}")
    public ResponseEntity<Prisioner> getPrisioner(@PathVariable Long id) {
        log.debug("REST request to get Prisioner : {}", id);
        Optional<Prisioner> prisioner = prisionerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prisioner);
    }

    /**
     * {@code DELETE  /prisioners/:id} : delete the "id" prisioner.
     *
     * @param id the id of the prisioner to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prisioners/{id}")
    public ResponseEntity<Void> deletePrisioner(@PathVariable Long id) {
        log.debug("REST request to delete Prisioner : {}", id);
        prisionerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}