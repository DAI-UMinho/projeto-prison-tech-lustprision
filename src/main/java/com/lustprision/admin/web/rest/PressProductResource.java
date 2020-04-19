package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.repository.PressProductRepository;
import com.lustprision.admin.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lustprision.admin.domain.PressProduct}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PressProductResource {

    private final Logger log = LoggerFactory.getLogger(PressProductResource.class);

    private static final String ENTITY_NAME = "pressProduct";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PressProductRepository pressProductRepository;

    public PressProductResource(PressProductRepository pressProductRepository) {
        this.pressProductRepository = pressProductRepository;
    }

    /**
     * {@code POST  /press-products} : Create a new pressProduct.
     *
     * @param pressProduct the pressProduct to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pressProduct, or with status {@code 400 (Bad Request)} if the pressProduct has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/press-products")
    public ResponseEntity<PressProduct> createPressProduct(@RequestBody PressProduct pressProduct) throws URISyntaxException {
        log.debug("REST request to save PressProduct : {}", pressProduct);
        if (pressProduct.getId() != null) {
            throw new BadRequestAlertException("A new pressProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PressProduct result = pressProductRepository.save(pressProduct);
        return ResponseEntity.created(new URI("/api/press-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /press-products} : Updates an existing pressProduct.
     *
     * @param pressProduct the pressProduct to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pressProduct,
     * or with status {@code 400 (Bad Request)} if the pressProduct is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pressProduct couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/press-products")
    public ResponseEntity<PressProduct> updatePressProduct(@RequestBody PressProduct pressProduct) throws URISyntaxException {
        log.debug("REST request to update PressProduct : {}", pressProduct);
        if (pressProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PressProduct result = pressProductRepository.save(pressProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pressProduct.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /press-products} : get all the pressProducts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pressProducts in body.
     */
    @GetMapping("/press-products")
    public List<PressProduct> getAllPressProducts() {
        log.debug("REST request to get all PressProducts");
        return pressProductRepository.findAll();
    }

    /**
     * {@code GET  /press-products/:id} : get the "id" pressProduct.
     *
     * @param id the id of the pressProduct to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pressProduct, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/press-products/{id}")
    public ResponseEntity<PressProduct> getPressProduct(@PathVariable Long id) {
        log.debug("REST request to get PressProduct : {}", id);
        Optional<PressProduct> pressProduct = pressProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pressProduct);
    }

    /**
     * {@code DELETE  /press-products/:id} : delete the "id" pressProduct.
     *
     * @param id the id of the pressProduct to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/press-products/{id}")
    public ResponseEntity<Void> deletePressProduct(@PathVariable Long id) {
        log.debug("REST request to delete PressProduct : {}", id);
        pressProductRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /** Exception Handler for a new order on a 0 stock product  */
    @ResponseStatus(value=HttpStatus.CONFLICT, reason="Not enough stock for the order")  // 409
    @ExceptionHandler({SQLException.class, DataAccessException.class})
    public void conflict() {
    }
}
