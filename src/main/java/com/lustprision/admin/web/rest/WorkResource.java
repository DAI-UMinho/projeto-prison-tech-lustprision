package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.State;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.StateRepository;
import com.lustprision.admin.repository.WorkRepository;
import com.lustprision.admin.service.AuditService;
import com.lustprision.admin.service.WorkService;
import com.lustprision.admin.service.dto.ProductDTO;
import com.lustprision.admin.service.dto.ProductSaleDTO;
import com.lustprision.admin.service.dto.WorkDTO;
import com.lustprision.admin.service.dto.WorkSubsDTO;
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
 * REST controller for managing {@link com.lustprision.admin.domain.Work}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WorkResource {

    private final Logger log = LoggerFactory.getLogger(WorkResource.class);

    private static final String ENTITY_NAME = "work";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkRepository workRepository;

    private final WorkService workService;

    private final StateRepository stateRepository;

    private final AuditService auditService;

    public WorkResource(WorkRepository workRepository, StateRepository stateRepository, WorkService workService,
                        AuditService auditService) {
        this.workRepository = workRepository;
        this.stateRepository = stateRepository;
        this.workService = workService;
        this.auditService = auditService;
    }

    /**
     * {@code POST  /works} : Create a new work.
     *
     * @param work the work to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new work, or with status {@code 400 (Bad Request)} if the work has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/works")
    public ResponseEntity<Work> createWork(@RequestBody Work work) throws URISyntaxException {
        log.debug("REST request to save Work : {}", work);
        if (work.getId() != null) {
            throw new BadRequestAlertException("A new work cannot already have an ID", ENTITY_NAME, "idexists");
        }else if(!workService.checkValidDate(work.getDate())){
            throw new BadRequestAlertException("The work date is invalid", ENTITY_NAME, "workDate");
        }
        Work result = workRepository.save(work);
        return ResponseEntity.created(new URI("/api/works/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /works} : Updates an existing work.
     *
     * @param work the work to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated work,
     * or with status {@code 400 (Bad Request)} if the work is not valid,
     * or with status {@code 500 (Internal Server Error)} if the work couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/works")
    public ResponseEntity<Work> updateWork(@RequestBody Work work) throws URISyntaxException {
        log.debug("REST request to update Work : {}", work);
        if (work.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }else if(work.getState().getId() > 1L){
            throw new BadRequestAlertException("Can't update the work at this time", ENTITY_NAME, "workUpdate");
        }
        Work result = workRepository.save(work);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, work.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /works} : get all the works.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of works in body.
     */
    @GetMapping("/works")
    public List<Work> getAllWorks() {
        log.debug("REST request to get all Works");
        return workRepository.findAll();
    }

    /**
     * {@code GET  /works/:id} : get the "id" work.
     *
     * @param id the id of the work to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the work, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/works/{id}")
    public ResponseEntity<Work> getWork(@PathVariable Long id) {
        log.debug("REST request to get Work : {}", id);
        Optional<Work> work = workRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(work);
    }

    /**
     * {@code DELETE  /works/:id} : delete the "id" work.
     *
     * @param id the id of the work to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/works/{id}")
    public ResponseEntity<Void> deleteWork(@PathVariable Long id) {
        log.debug("REST request to delete Work : {}", id);
        workRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/works/{id}/cancel")
    public ResponseEntity<Work> cancelWork(@PathVariable Long id) {
        log.debug("REST request to delete PressWork : {}", id);
        Work result = workRepository.findById(id).get();
        State mState = stateRepository.getOne(Long.valueOf(3));
        result.setState(mState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/works/{id}/complete")
    public ResponseEntity<Work> completeWork(@PathVariable Long id) {
        log.debug("REST request to change the status to complete of the work : {}", id);
        Work result = workRepository.findById(id).get();
        State mState = stateRepository.getOne(2L);
        result.setState(mState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @GetMapping("/works/{id}/subs")
    public List<WorkSubsDTO> getWorkSubs(@PathVariable Long id) {
        log.debug("REST request to get all Products Sales");
        return workService.getCurrentWorkSubs(id);
    }

    @GetMapping("/works/{id}/logs")
    public List<WorkDTO> getWorkLog(@PathVariable Long id){
        log.debug("REST request to get all Prisioner work jobs : {}", id);
        return auditService.getWorkLogs(id);
    }
}
