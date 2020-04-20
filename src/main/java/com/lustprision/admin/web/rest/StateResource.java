package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.State;
import com.lustprision.admin.repository.StateRepository;
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
 * REST controller for managing {@link com.lustprision.admin.domain.State}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StateResource {

    private final Logger log = LoggerFactory.getLogger(StateResource.class);

    private final StateRepository stateRepository;

    public StateResource(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    /**
     * {@code GET  /states} : get all the states.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of states in body.
     */
    @GetMapping("/states")
    public List<State> getAllStates() {
        log.debug("REST request to get all States");
        return stateRepository.findAll();
    }

    /**
     * {@code GET  /states/:id} : get the "id" state.
     *
     * @param id the id of the state to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the state, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/states/{id}")
    public ResponseEntity<State> getState(@PathVariable Long id) {
        log.debug("REST request to get State : {}", id);
        Optional<State> state = stateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(state);
    }
}
