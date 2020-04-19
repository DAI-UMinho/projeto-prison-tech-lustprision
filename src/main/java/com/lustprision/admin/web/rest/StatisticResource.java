package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.Purchase;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.ProductRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.repository.WorkRepository;
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
 * REST controller for managing {@link Work}.
 */
@RestController
@RequestMapping("/api/stats")
@Transactional
public class StatisticResource {

    private final Logger log = LoggerFactory.getLogger(StatisticResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkRepository workRepository;
    private final ProductRepository productRepository;
    private final PurchaseRepository purchaseRepository;

    public StatisticResource(WorkRepository workRepository, ProductRepository productRepository,
                             PurchaseRepository purchaseRepository) {
        this.workRepository = workRepository;
        this.productRepository = productRepository;
        this.purchaseRepository = purchaseRepository;
    }

    @GetMapping("/products-total")
    public Integer getAllProducts() {
        log.debug("REST request to get all Works");
        return productRepository.getTotalProductNumber();
    }

    @GetMapping("/purchases-total")
    public Integer getAllPurchases() {
        log.debug("REST request to get all Works");
        return purchaseRepository.getTotalPurchaseNumber();
    }

    @GetMapping("/works-total")
    public Integer getAllWorks() {
        log.debug("REST request to get all Works");
        return workRepository.getTotalWorkNumber();
    }

}
