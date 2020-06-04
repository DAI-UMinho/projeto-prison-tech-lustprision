package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.State;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.PressWorkRepository;
import com.lustprision.admin.repository.StateRepository;
import com.lustprision.admin.service.WorkService;
import com.lustprision.admin.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.management.BadAttributeValueExpException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lustprision.admin.domain.PressWork}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PressWorkResource {

    private final Logger log = LoggerFactory.getLogger(PressWorkResource.class);

    private static final String ENTITY_NAME = "pressWork";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PressWorkRepository pressWorkRepository;

    private final StateRepository stateRepository;

    private final WorkService workService;

    public PressWorkResource(PressWorkRepository pressWorkRepository, StateRepository stateRepository, WorkService workService) {
        this.pressWorkRepository = pressWorkRepository;
        this.stateRepository = stateRepository;
        this.workService = workService;
    }

    /**
     * {@code POST  /press-works} : Create a new pressWork.
     *
     * @param pressWork the pressWork to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pressWork, or with status {@code 400 (Bad Request)} if the pressWork has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/press-works")
    public ResponseEntity<PressWork> createPressWork(@RequestBody PressWork pressWork) throws URISyntaxException {
        log.debug("REST request to save PressWork : {}", pressWork);
        if (pressWork.getId() != null) {
            throw new BadRequestAlertException("A new pressWork cannot already have an ID", ENTITY_NAME, "idexists");
        }else if(pressWorkRepository.findOneByPrisionerAndWork(pressWork.getPrisioner(), pressWork.getWork()).isPresent()){
            throw new BadRequestAlertException("Prisoner already subbed on this work", ENTITY_NAME, "newSub");
        }else if(pressWork.getPrisioner().getWorking() == 1){
            throw new BadRequestAlertException("Prisoner is already signed on a work", ENTITY_NAME, "newSubWorking");
        } else if(pressWork.getState() == null) {
            pressWork.setState(stateRepository.getOne(1L));
        }

        PressWork result = pressWorkRepository.save(pressWork);
        return ResponseEntity.created(new URI("/api/press-works/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /press-works} : Updates an existing pressWork.
     *
     * @param pressWork the pressWork to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pressWork,
     * or with status {@code 400 (Bad Request)} if the pressWork is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pressWork couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/press-works")
    public ResponseEntity<PressWork> updatePressWork(@RequestBody PressWork pressWork) throws URISyntaxException {
        log.debug("REST request to update PressWork : {}", pressWork);
        if (pressWork.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        PressWork result = pressWorkRepository.save(pressWork);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pressWork.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /press-works} : get all the pressWorks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pressWorks in body.
     */
    @GetMapping("/press-works")
    public List<PressWork> getAllPressWorks() {
        log.debug("REST request to get all PressWorks");
        return pressWorkRepository.findAll();
    }

    /**
     * {@code GET  /press-works/:id} : get the "id" pressWork.
     *
     * @param id the id of the pressWork to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pressWork, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/press-works/{id}")
    public ResponseEntity<PressWork> getPressWork(@PathVariable Long id) {
        log.debug("REST request to get PressWork : {}", id);
        Optional<PressWork> pressWork = pressWorkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pressWork);
    }

    /**
     * {@code DELETE  /press-works/:id} : delete the "id" pressWork.
     *
     * @param id the id of the pressWork to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/press-works/{id}")
    public ResponseEntity<Void> deletePressWork(@PathVariable Long id) {
        log.debug("REST request to delete PressWork : {}", id);
        pressWorkRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/press-works/{id}/cancel")
    public ResponseEntity<PressWork> cancelPressWork(@PathVariable Long id) {
        log.debug("REST request to delete PressWork : {}", id);
        PressWork result = pressWorkRepository.findById(id).get();
        State mState = stateRepository.getOne(3L);
        result.setState(mState);

        workService.firePrisoner(result.getWork().getId());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}
