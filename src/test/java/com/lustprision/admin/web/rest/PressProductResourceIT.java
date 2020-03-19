package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.repository.PressProductRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PressProductResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PressProductResourceIT {

    private static final Integer DEFAULT_ORDER_ID = 1;
    private static final Integer UPDATED_ORDER_ID = 2;

    private static final Integer DEFAULT_PRODUCT_CODE = 1;
    private static final Integer UPDATED_PRODUCT_CODE = 2;

    private static final Integer DEFAULT_QUATY = 1;
    private static final Integer UPDATED_QUATY = 2;

    private static final Long DEFAULT_PRICE_EACH = 1L;
    private static final Long UPDATED_PRICE_EACH = 2L;

    private static final Integer DEFAULT_PURCHASE_ID_PURCHASE = 1;
    private static final Integer UPDATED_PURCHASE_ID_PURCHASE = 2;

    @Autowired
    private PressProductRepository pressProductRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPressProductMockMvc;

    private PressProduct pressProduct;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PressProduct createEntity(EntityManager em) {
        PressProduct pressProduct = new PressProduct()
            .orderId(DEFAULT_ORDER_ID)
            .productCode(DEFAULT_PRODUCT_CODE)
            .quaty(DEFAULT_QUATY)
            .priceEach(DEFAULT_PRICE_EACH)
            .purchaseIdPurchase(DEFAULT_PURCHASE_ID_PURCHASE);
        return pressProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PressProduct createUpdatedEntity(EntityManager em) {
        PressProduct pressProduct = new PressProduct()
            .orderId(UPDATED_ORDER_ID)
            .productCode(UPDATED_PRODUCT_CODE)
            .quaty(UPDATED_QUATY)
            .priceEach(UPDATED_PRICE_EACH)
            .purchaseIdPurchase(UPDATED_PURCHASE_ID_PURCHASE);
        return pressProduct;
    }

    @BeforeEach
    public void initTest() {
        pressProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createPressProduct() throws Exception {
        int databaseSizeBeforeCreate = pressProductRepository.findAll().size();

        // Create the PressProduct
        restPressProductMockMvc.perform(post("/api/press-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressProduct)))
            .andExpect(status().isCreated());

        // Validate the PressProduct in the database
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeCreate + 1);
        PressProduct testPressProduct = pressProductList.get(pressProductList.size() - 1);
        assertThat(testPressProduct.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testPressProduct.getProductCode()).isEqualTo(DEFAULT_PRODUCT_CODE);
        assertThat(testPressProduct.getQuaty()).isEqualTo(DEFAULT_QUATY);
        assertThat(testPressProduct.getPriceEach()).isEqualTo(DEFAULT_PRICE_EACH);
        assertThat(testPressProduct.getPurchaseIdPurchase()).isEqualTo(DEFAULT_PURCHASE_ID_PURCHASE);
    }

    @Test
    @Transactional
    public void createPressProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pressProductRepository.findAll().size();

        // Create the PressProduct with an existing ID
        pressProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPressProductMockMvc.perform(post("/api/press-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressProduct)))
            .andExpect(status().isBadRequest());

        // Validate the PressProduct in the database
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPressProducts() throws Exception {
        // Initialize the database
        pressProductRepository.saveAndFlush(pressProduct);

        // Get all the pressProductList
        restPressProductMockMvc.perform(get("/api/press-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pressProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID)))
            .andExpect(jsonPath("$.[*].productCode").value(hasItem(DEFAULT_PRODUCT_CODE)))
            .andExpect(jsonPath("$.[*].quaty").value(hasItem(DEFAULT_QUATY)))
            .andExpect(jsonPath("$.[*].priceEach").value(hasItem(DEFAULT_PRICE_EACH.intValue())))
            .andExpect(jsonPath("$.[*].purchaseIdPurchase").value(hasItem(DEFAULT_PURCHASE_ID_PURCHASE)));
    }
    
    @Test
    @Transactional
    public void getPressProduct() throws Exception {
        // Initialize the database
        pressProductRepository.saveAndFlush(pressProduct);

        // Get the pressProduct
        restPressProductMockMvc.perform(get("/api/press-products/{id}", pressProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pressProduct.getId().intValue()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID))
            .andExpect(jsonPath("$.productCode").value(DEFAULT_PRODUCT_CODE))
            .andExpect(jsonPath("$.quaty").value(DEFAULT_QUATY))
            .andExpect(jsonPath("$.priceEach").value(DEFAULT_PRICE_EACH.intValue()))
            .andExpect(jsonPath("$.purchaseIdPurchase").value(DEFAULT_PURCHASE_ID_PURCHASE));
    }

    @Test
    @Transactional
    public void getNonExistingPressProduct() throws Exception {
        // Get the pressProduct
        restPressProductMockMvc.perform(get("/api/press-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePressProduct() throws Exception {
        // Initialize the database
        pressProductRepository.saveAndFlush(pressProduct);

        int databaseSizeBeforeUpdate = pressProductRepository.findAll().size();

        // Update the pressProduct
        PressProduct updatedPressProduct = pressProductRepository.findById(pressProduct.getId()).get();
        // Disconnect from session so that the updates on updatedPressProduct are not directly saved in db
        em.detach(updatedPressProduct);
        updatedPressProduct
            .orderId(UPDATED_ORDER_ID)
            .productCode(UPDATED_PRODUCT_CODE)
            .quaty(UPDATED_QUATY)
            .priceEach(UPDATED_PRICE_EACH)
            .purchaseIdPurchase(UPDATED_PURCHASE_ID_PURCHASE);

        restPressProductMockMvc.perform(put("/api/press-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPressProduct)))
            .andExpect(status().isOk());

        // Validate the PressProduct in the database
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeUpdate);
        PressProduct testPressProduct = pressProductList.get(pressProductList.size() - 1);
        assertThat(testPressProduct.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testPressProduct.getProductCode()).isEqualTo(UPDATED_PRODUCT_CODE);
        assertThat(testPressProduct.getQuaty()).isEqualTo(UPDATED_QUATY);
        assertThat(testPressProduct.getPriceEach()).isEqualTo(UPDATED_PRICE_EACH);
        assertThat(testPressProduct.getPurchaseIdPurchase()).isEqualTo(UPDATED_PURCHASE_ID_PURCHASE);
    }

    @Test
    @Transactional
    public void updateNonExistingPressProduct() throws Exception {
        int databaseSizeBeforeUpdate = pressProductRepository.findAll().size();

        // Create the PressProduct

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPressProductMockMvc.perform(put("/api/press-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressProduct)))
            .andExpect(status().isBadRequest());

        // Validate the PressProduct in the database
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePressProduct() throws Exception {
        // Initialize the database
        pressProductRepository.saveAndFlush(pressProduct);

        int databaseSizeBeforeDelete = pressProductRepository.findAll().size();

        // Delete the pressProduct
        restPressProductMockMvc.perform(delete("/api/press-products/{id}", pressProduct.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
