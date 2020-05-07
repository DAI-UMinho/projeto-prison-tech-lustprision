package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.QuestionQuiz;
import com.lustprision.admin.repository.QuestionQuizRepository;
import com.lustprision.admin.service.dto.QuestionResultDTO;
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
 * REST controller for managing {@link com.lustprision.admin.domain.QuestionQuiz}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class QuestionQuizResource {

    private final Logger log = LoggerFactory.getLogger(QuestionQuizResource.class);

    private static final String ENTITY_NAME = "questionQuiz";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionQuizRepository questionQuizRepository;

    public QuestionQuizResource(QuestionQuizRepository questionQuizRepository) {
        this.questionQuizRepository = questionQuizRepository;
    }

    /**
     * {@code POST  /question-quizs} : Create a new questionQuiz.
     *
     * @param questionQuiz the questionQuiz to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionQuiz, or with status {@code 400 (Bad Request)} if the questionQuiz has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/question-quizs")
    public ResponseEntity<QuestionQuiz> createQuestionQuiz(@RequestBody QuestionQuiz questionQuiz) throws URISyntaxException {
        log.debug("REST request to save QuestionQuiz : {}", questionQuiz);
        if (questionQuiz.getId() != null) {
            throw new BadRequestAlertException("A new questionQuiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuestionQuiz result = questionQuizRepository.save(questionQuiz);
        return ResponseEntity.created(new URI("/api/question-quizs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /question-quizs} : Updates an existing questionQuiz.
     *
     * @param questionQuiz the questionQuiz to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionQuiz,
     * or with status {@code 400 (Bad Request)} if the questionQuiz is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionQuiz couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/question-quizs")
    public ResponseEntity<QuestionQuiz> updateQuestionQuiz(@RequestBody QuestionQuiz questionQuiz) throws URISyntaxException {
        log.debug("REST request to update QuestionQuiz : {}", questionQuiz);
        if (questionQuiz.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuestionQuiz result = questionQuizRepository.save(questionQuiz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionQuiz.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /question-quizs} : get all the questionQuizs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionQuizs in body.
     */
    @GetMapping("/question-quizs")
    public List<QuestionQuiz> getAllQuestionQuizs() {
        log.debug("REST request to get all QuestionQuizs");
        return questionQuizRepository.findAll();
    }

    /**
     * {@code GET  /question-quizs/:id} : get the "id" questionQuiz.
     *
     * @param id the id of the questionQuiz to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionQuiz, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/question-quizs/{id}")
    public ResponseEntity<QuestionQuiz> getQuestionQuiz(@PathVariable Long id) {
        log.debug("REST request to get QuestionQuiz : {}", id);
        Optional<QuestionQuiz> questionQuiz = questionQuizRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(questionQuiz);
    }

    /**
     * {@code DELETE  /question-quizs/:id} : delete the "id" questionQuiz.
     *
     * @param id the id of the questionQuiz to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/question-quizs/{id}")
    public ResponseEntity<Void> deleteQuestionQuiz(@PathVariable Long id) {
        log.debug("REST request to delete QuestionQuiz : {}", id);
        questionQuizRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
