package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.PrisQuiz;
import com.lustprision.admin.repository.PrisQuizRepository;
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
 * REST controller for managing {@link com.lustprision.admin.domain.PrisQuiz}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrisQuizResource {

    private final Logger log = LoggerFactory.getLogger(PrisQuizResource.class);

    private static final String ENTITY_NAME = "prisQuiz";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrisQuizRepository prisQuizRepository;

    public PrisQuizResource(PrisQuizRepository prisQuizRepository) {
        this.prisQuizRepository = prisQuizRepository;
    }

    /**
     * {@code POST  /pris-quizs} : Create a new prisQuiz.
     *
     * @param prisQuiz the prisQuiz to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prisQuiz, or with status {@code 400 (Bad Request)} if the prisQuiz has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pris-quizs")
    public ResponseEntity<PrisQuiz> createPrisQuiz(@RequestBody PrisQuiz prisQuiz) throws URISyntaxException {
        log.debug("REST request to save PrisQuiz : {}", prisQuiz);
        if (prisQuiz.getId() != null) {
            throw new BadRequestAlertException("A new prisQuiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrisQuiz result = prisQuizRepository.save(prisQuiz);
        return ResponseEntity.created(new URI("/api/pris-quizs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pris-quizs} : Updates an existing prisQuiz.
     *
     * @param prisQuiz the prisQuiz to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prisQuiz,
     * or with status {@code 400 (Bad Request)} if the prisQuiz is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prisQuiz couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pris-quizs")
    public ResponseEntity<PrisQuiz> updatePrisQuiz(@RequestBody PrisQuiz prisQuiz) throws URISyntaxException {
        log.debug("REST request to update PrisQuiz : {}", prisQuiz);
        if (prisQuiz.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrisQuiz result = prisQuizRepository.save(prisQuiz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prisQuiz.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pris-quizs} : get all the prisQuizs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prisQuizs in body.
     */
    @GetMapping("/pris-quizs")
    public List<PrisQuiz> getAllPrisQuizs() {
        log.debug("REST request to get all PrisQuizs");
        return prisQuizRepository.findAll();
    }

    /**
     * {@code GET  /pris-quizs/:id} : get the "id" prisQuiz.
     *
     * @param id the id of the prisQuiz to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prisQuiz, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pris-quizs/{id}")
    public ResponseEntity<PrisQuiz> getPrisQuiz(@PathVariable Long id) {
        log.debug("REST request to get PrisQuiz : {}", id);
        Optional<PrisQuiz> prisQuiz = prisQuizRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prisQuiz);
    }

    /**
     * {@code DELETE  /pris-quizs/:id} : delete the "id" prisQuiz.
     *
     * @param id the id of the prisQuiz to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pris-quizs/{id}")
    public ResponseEntity<Void> deletePrisQuiz(@PathVariable Long id) {
        log.debug("REST request to delete PrisQuiz : {}", id);
        prisQuizRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
