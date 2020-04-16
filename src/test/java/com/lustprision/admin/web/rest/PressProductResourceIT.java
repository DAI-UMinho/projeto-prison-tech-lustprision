package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.repository.PressProductRepository;
import com.lustprision.admin.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.lustprision.admin.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PressProductResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class PressProductResourceIT {

    private static final Integer DEFAULT_QTY = 1;
    private static final Integer UPDATED_QTY = 2;

    private static final Long DEFAULT_PRICE_EACH = 1L;
    private static final Long UPDATED_PRICE_EACH = 2L;

    @Autowired
    private PressProductRepository pressProductRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPressProductMockMvc;

    private PressProduct pressProduct;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PressProductResource pressProductResource = new PressProductResource(pressProductRepository);
        this.restPressProductMockMvc = MockMvcBuilders.standaloneSetup(pressProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PressProduct createEntity(EntityManager em) {
        PressProduct pressProduct = new PressProduct()
            .qty(DEFAULT_QTY)
            .priceEach(DEFAULT_PRICE_EACH);
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
            .qty(UPDATED_QTY)
            .priceEach(UPDATED_PRICE_EACH);
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
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressProduct)))
            .andExpect(status().isCreated());

        // Validate the PressProduct in the database
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeCreate + 1);
        PressProduct testPressProduct = pressProductList.get(pressProductList.size() - 1);
        assertThat(testPressProduct.getQty()).isEqualTo(DEFAULT_QTY);
        assertThat(testPressProduct.getPriceTotal()).isEqualTo(DEFAULT_PRICE_EACH);
    }

    @Test
    @Transactional
    public void createPressProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pressProductRepository.findAll().size();

        // Create the PressProduct with an existing ID
        pressProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPressProductMockMvc.perform(post("/api/press-products")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .andExpect(jsonPath("$.[*].qty").value(hasItem(DEFAULT_QTY)))
            .andExpect(jsonPath("$.[*].priceEach").value(hasItem(DEFAULT_PRICE_EACH.intValue())));
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
            .andExpect(jsonPath("$.qty").value(DEFAULT_QTY))
            .andExpect(jsonPath("$.priceEach").value(DEFAULT_PRICE_EACH.intValue()));
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
            .qty(UPDATED_QTY)
            .priceEach(UPDATED_PRICE_EACH);

        restPressProductMockMvc.perform(put("/api/press-products")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPressProduct)))
            .andExpect(status().isOk());

        // Validate the PressProduct in the database
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeUpdate);
        PressProduct testPressProduct = pressProductList.get(pressProductList.size() - 1);
        assertThat(testPressProduct.getQty()).isEqualTo(UPDATED_QTY);
        assertThat(testPressProduct.getPriceTotal()).isEqualTo(UPDATED_PRICE_EACH);
    }

    @Test
    @Transactional
    public void updateNonExistingPressProduct() throws Exception {
        int databaseSizeBeforeUpdate = pressProductRepository.findAll().size();

        // Create the PressProduct

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPressProductMockMvc.perform(put("/api/press-products")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PressProduct> pressProductList = pressProductRepository.findAll();
        assertThat(pressProductList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
