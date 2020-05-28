package com.lustprision.admin.web.rest;

import com.lustprision.admin.config.Utilities;
import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.*;
import com.lustprision.admin.service.dto.WorkStatDTO;
import com.lustprision.admin.service.dto.stats.MonthDataDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.*;

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

    private final PressWorkRepository pressWorkRepository;
    private final WorkRepository workRepository;
    private final ProductRepository productRepository;
    private final PurchaseRepository purchaseRepository;
    private final PressProductRepository pressProductRepository;

    public StatisticResource(PressWorkRepository pressWorkRepository, WorkRepository workRepository,
                             ProductRepository productRepository, PurchaseRepository purchaseRepository,
                             PressProductRepository pressProductRepository) {
        this.pressWorkRepository = pressWorkRepository;
        this.workRepository = workRepository;
        this.productRepository = productRepository;
        this.purchaseRepository = purchaseRepository;
        this.pressProductRepository = pressProductRepository;
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

    @GetMapping("/work-state-total")
    public WorkStatDTO getWorkStateData() {
        WorkStatDTO stat = new WorkStatDTO();
        stat.setCompleted(workRepository.getTotalCompletedWorkNumber());
        stat.setCanceled(workRepository.getTotalCanceledWorkNumber());
        return stat;
    }

    @GetMapping("/completed-works/{id}")
    public Integer get(@PathVariable Long id) {
        log.debug("REST request to get all Works");
        return pressWorkRepository.getTotalCompletedWorks(id);
    }

    @GetMapping("/prisoner/{id}/work-stat")
    public WorkStatDTO getPrisonerWorkStats(@PathVariable Long id) {
        WorkStatDTO stat = new WorkStatDTO();
        stat.setCompleted(pressWorkRepository.getTotalCompletedWorks(id));
        stat.setCanceled(pressWorkRepository.getTotalCanceledWorks(id));
//        stat.setCreditsEarned(pressWorkRepository.getTotalCreditsFromWork(id));
        return stat;
    }

    @GetMapping("/completed-work/half-year")
    public List<MonthDataDTO> getLastHalfYearWorkAdoption() {
        log.debug("REST request to get all Works");
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        List<MonthDataDTO> data = new ArrayList<>();

        for(int i = 0; i < 6; i++){
            String initialDate = Utilities.getDateFormatted(i, Utilities.MONTH_FIRST_DAY);
            String finalDate = Utilities.getDateFormatted(i, Utilities.MONTH_LAST_DAY_IDENTIFIER);

            int value = pressWorkRepository.getCompletedFromDateRange(initialDate, finalDate);
            data.add(new MonthDataDTO(Utilities.convertMonth(i), value));
        }
        Collections.reverse(data);
        return data;
    }

    @GetMapping("/product/{id}/sales-half-year")
    public List<MonthDataDTO> getLastHalfYearProductSales(@PathVariable Long id) {
        log.debug("REST request to get last half year sales from a product");
        List<MonthDataDTO> data = new ArrayList<>();

        for(int i = 0; i < 6; i++){
            String initialDate = Utilities.getDateFormatted(i, Utilities.MONTH_FIRST_DAY);
            String finalDate = Utilities.getDateFormatted(i, Utilities.MONTH_LAST_DAY_IDENTIFIER);

            int value = pressProductRepository.getProductSalesFromDateRange(id, initialDate, finalDate);
            data.add(new MonthDataDTO(Utilities.convertMonth(i), value));
        }
        Collections.reverse(data);
        return data;
    }

    @GetMapping("/purchases/purchases-half-year")
    public List<MonthDataDTO> getLastYearProductPurchases() {
        log.debug("REST request to get last half year sales from a product");
        List<MonthDataDTO> data = new ArrayList<>();

        for(int i = 0; i < 12; i++){
            String initialDate = Utilities.getDateFormatted(i, Utilities.MONTH_FIRST_DAY);
            String finalDate = Utilities.getDateFormatted(i, Utilities.MONTH_LAST_DAY_IDENTIFIER);

            int value = purchaseRepository.getProductSalesFromDateRange(initialDate,finalDate );
            data.add(new MonthDataDTO(Utilities.convertMonth(i), value));
        }
        Collections.reverse(data);
        return data;
    }
}


