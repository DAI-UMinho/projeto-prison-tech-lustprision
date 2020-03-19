package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.Product;
import com.lustprision.admin.repository.ProductRepository;

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
 * Integration tests for the {@link ProductResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProductResourceIT {

    private static final Integer DEFAULT_CODE_PROD = 1;
    private static final Integer UPDATED_CODE_PROD = 2;

    private static final Integer DEFAULT_PRODUCT_LIN_ID = 1;
    private static final Integer UPDATED_PRODUCT_LIN_ID = 2;

    private static final String DEFAULT_NAME_PROD = "AAAAAAAAAA";
    private static final String UPDATED_NAME_PROD = "BBBBBBBBBB";

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    private static final String DEFAULT_SELER = "AAAAAAAAAA";
    private static final String UPDATED_SELER = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_PROD = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_PROD = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTY_IN_STOCK = 1;
    private static final Integer UPDATED_QUANTY_IN_STOCK = 2;

    private static final Long DEFAULT_BUY_PRICE = 1L;
    private static final Long UPDATED_BUY_PRICE = 2L;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductMockMvc;

    private Product product;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createEntity(EntityManager em) {
        Product product = new Product()
            .codeProd(DEFAULT_CODE_PROD)
            .productLinId(DEFAULT_PRODUCT_LIN_ID)
            .nameProd(DEFAULT_NAME_PROD)
            .price(DEFAULT_PRICE)
            .seler(DEFAULT_SELER)
            .descriptionProd(DEFAULT_DESCRIPTION_PROD)
            .quantyInStock(DEFAULT_QUANTY_IN_STOCK)
            .buyPrice(DEFAULT_BUY_PRICE);
        return product;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createUpdatedEntity(EntityManager em) {
        Product product = new Product()
            .codeProd(UPDATED_CODE_PROD)
            .productLinId(UPDATED_PRODUCT_LIN_ID)
            .nameProd(UPDATED_NAME_PROD)
            .price(UPDATED_PRICE)
            .seler(UPDATED_SELER)
            .descriptionProd(UPDATED_DESCRIPTION_PROD)
            .quantyInStock(UPDATED_QUANTY_IN_STOCK)
            .buyPrice(UPDATED_BUY_PRICE);
        return product;
    }

    @BeforeEach
    public void initTest() {
        product = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduct() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product
        restProductMockMvc.perform(post("/api/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isCreated());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate + 1);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getCodeProd()).isEqualTo(DEFAULT_CODE_PROD);
        assertThat(testProduct.getProductLinId()).isEqualTo(DEFAULT_PRODUCT_LIN_ID);
        assertThat(testProduct.getNameProd()).isEqualTo(DEFAULT_NAME_PROD);
        assertThat(testProduct.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testProduct.getSeler()).isEqualTo(DEFAULT_SELER);
        assertThat(testProduct.getDescriptionProd()).isEqualTo(DEFAULT_DESCRIPTION_PROD);
        assertThat(testProduct.getQuantyInStock()).isEqualTo(DEFAULT_QUANTY_IN_STOCK);
        assertThat(testProduct.getBuyPrice()).isEqualTo(DEFAULT_BUY_PRICE);
    }

    @Test
    @Transactional
    public void createProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product with an existing ID
        product.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductMockMvc.perform(post("/api/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProducts() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get all the productList
        restProductMockMvc.perform(get("/api/products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeProd").value(hasItem(DEFAULT_CODE_PROD)))
            .andExpect(jsonPath("$.[*].productLinId").value(hasItem(DEFAULT_PRODUCT_LIN_ID)))
            .andExpect(jsonPath("$.[*].nameProd").value(hasItem(DEFAULT_NAME_PROD)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].seler").value(hasItem(DEFAULT_SELER)))
            .andExpect(jsonPath("$.[*].descriptionProd").value(hasItem(DEFAULT_DESCRIPTION_PROD)))
            .andExpect(jsonPath("$.[*].quantyInStock").value(hasItem(DEFAULT_QUANTY_IN_STOCK)))
            .andExpect(jsonPath("$.[*].buyPrice").value(hasItem(DEFAULT_BUY_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(product.getId().intValue()))
            .andExpect(jsonPath("$.codeProd").value(DEFAULT_CODE_PROD))
            .andExpect(jsonPath("$.productLinId").value(DEFAULT_PRODUCT_LIN_ID))
            .andExpect(jsonPath("$.nameProd").value(DEFAULT_NAME_PROD))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.seler").value(DEFAULT_SELER))
            .andExpect(jsonPath("$.descriptionProd").value(DEFAULT_DESCRIPTION_PROD))
            .andExpect(jsonPath("$.quantyInStock").value(DEFAULT_QUANTY_IN_STOCK))
            .andExpect(jsonPath("$.buyPrice").value(DEFAULT_BUY_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProduct() throws Exception {
        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product
        Product updatedProduct = productRepository.findById(product.getId()).get();
        // Disconnect from session so that the updates on updatedProduct are not directly saved in db
        em.detach(updatedProduct);
        updatedProduct
            .codeProd(UPDATED_CODE_PROD)
            .productLinId(UPDATED_PRODUCT_LIN_ID)
            .nameProd(UPDATED_NAME_PROD)
            .price(UPDATED_PRICE)
            .seler(UPDATED_SELER)
            .descriptionProd(UPDATED_DESCRIPTION_PROD)
            .quantyInStock(UPDATED_QUANTY_IN_STOCK)
            .buyPrice(UPDATED_BUY_PRICE);

        restProductMockMvc.perform(put("/api/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduct)))
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getCodeProd()).isEqualTo(UPDATED_CODE_PROD);
        assertThat(testProduct.getProductLinId()).isEqualTo(UPDATED_PRODUCT_LIN_ID);
        assertThat(testProduct.getNameProd()).isEqualTo(UPDATED_NAME_PROD);
        assertThat(testProduct.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testProduct.getSeler()).isEqualTo(UPDATED_SELER);
        assertThat(testProduct.getDescriptionProd()).isEqualTo(UPDATED_DESCRIPTION_PROD);
        assertThat(testProduct.getQuantyInStock()).isEqualTo(UPDATED_QUANTY_IN_STOCK);
        assertThat(testProduct.getBuyPrice()).isEqualTo(UPDATED_BUY_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Create the Product

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc.perform(put("/api/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        int databaseSizeBeforeDelete = productRepository.findAll().size();

        // Delete the product
        restProductMockMvc.perform(delete("/api/products/{id}", product.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
