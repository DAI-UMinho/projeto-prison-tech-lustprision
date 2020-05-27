package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Purchase;
import com.lustprision.admin.repository.PrisionerRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.service.AuditService;
import com.lustprision.admin.service.PrisionerService;
import com.lustprision.admin.service.dto.*;
import com.lustprision.admin.web.rest.errors.BadRequestAlertException;

import com.lustprision.admin.web.rest.errors.PrisonerNumberAlredyUsed;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.history.Revision;
import org.springframework.data.history.Revisions;
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
    private final PrisionerService prisionerService;
    private final AuditService auditService;

    public PrisionerResource(PrisionerRepository prisionerRepository, PrisionerService prisionerService, AuditService auditService) {
        this.prisionerRepository = prisionerRepository;
        this.prisionerService = prisionerService;
        this.auditService = auditService;
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
        }else if(prisionerRepository.findOneByNumPrisioner(prisioner.getNumPrisioner()).isPresent()){
            throw new PrisonerNumberAlredyUsed();
        }else if(prisionerRepository.findOneByNumCell(prisioner.getNumCell()).isPresent()){
            throw new BadRequestAlertException("Cell number alredy in use", ENTITY_NAME, "prisonerCellNum");
        }else if(prisionerRepository.findOneByBi(prisioner.getBi()).isPresent()){
            throw new BadRequestAlertException("BI number alredy in use", ENTITY_NAME, "prisonerBi");
        }else if(prisionerRepository.findOneByNfcCode(prisioner.getNfcCode()).isPresent()){
            throw new BadRequestAlertException("NFC code alredy in use", ENTITY_NAME, "prisonerNfcCode");
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
        return  prisionerRepository.findAll();
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

    @GetMapping("/prisioners/{id}/purchases")
    public List<PurchaseDTO> getPrisionerPurchases(@PathVariable Long id){
        log.debug("REST request to get all Prisioner purchases : {}", id);
        return prisionerService.getPrisionerPurchases(id);
    }

    @GetMapping("/prisioners/{id}/work")
    public List<WorkDTO> getPrisionerWork(@PathVariable Long id){
        log.debug("REST request to get all Prisioner work jobs : {}", id);
        return prisionerService.getPrisionerWork(id);
    }

    @GetMapping("/prisioners/{id}/quizs")
    public List<CompletedQuizDTO> getPrisionerQuizs(@PathVariable Long id){
        log.debug("REST request to get all Prisioner work jobs : {}", id);
        return prisionerService.getPrisionerQuizs(id);
    }

    @GetMapping("/prisioners/{id}/logs")
    public List<PrisonerDTO> getPrisionerLog(@PathVariable Long id){
        log.debug("REST request to get all Prisioner work jobs : {}", id);
        return auditService.getPrisonerLogs(id);
    }


}
