package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Product;
import com.lustprision.admin.domain.Purchase;
import com.lustprision.admin.repository.PressProductRepository;
import com.lustprision.admin.repository.PrisionerRepository;
import com.lustprision.admin.repository.ProductRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.service.AuditService;
import com.lustprision.admin.service.ProductService;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.lustprision.admin.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class ProductResourceIT {

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

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");

    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PrisionerRepository prisionerRepository;
    @Autowired
    private PurchaseRepository purchasetRepository;
    @Autowired
    private PressProductRepository pressProductRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private AuditService auditService;

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

    private MockMvc restProductMockMvc;

    private Product product;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductResource productResource = new ProductResource(productRepository, productService, auditService);
        this.restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
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
    public static Product createEntity(EntityManager em) {
        Product product = new Product()
            .nameProd(DEFAULT_NAME_PROD)
            .price(DEFAULT_PRICE)
            .seler(DEFAULT_SELER)
            .descriptionProd(DEFAULT_DESCRIPTION_PROD)
            .quantyInStock(DEFAULT_QUANTY_IN_STOCK)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
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
            .nameProd(UPDATED_NAME_PROD)
            .price(UPDATED_PRICE)
            .seler(UPDATED_SELER)
            .descriptionProd(UPDATED_DESCRIPTION_PROD)
            .quantyInStock(UPDATED_QUANTY_IN_STOCK)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        return product;
    }

    @BeforeEach
    public void initTest() {
        product = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduct() throws Exception {
        int Produtosiniciais = productRepository.findAll().size();
        System.out.println("Numero de produtos existentes: "+Produtosiniciais);
        // Create the Product
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isCreated());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(Produtosiniciais+ 1);
        Product testProduct = productList.get(productList.size() - 1);
        //  assertThat(testProduct.getProductLinId()).isEqualTo(DEFAULT_PRODUCT_LIN_ID);
        assertThat(testProduct.getNameProd()).isEqualTo(DEFAULT_NAME_PROD);
        assertThat(testProduct.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testProduct.getSeler()).isEqualTo(DEFAULT_SELER);
        assertThat(testProduct.getDescriptionProd()).isEqualTo(DEFAULT_DESCRIPTION_PROD);
        assertThat(testProduct.getQuantyInStock()).isEqualTo(DEFAULT_QUANTY_IN_STOCK);
        //assertThat(testProduct.getBuyPrice()).isEqualTo(DEFAULT_BUY_PRICE);
        assertThat(testProduct.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProduct.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        System.out.println("Numero de produtos existentes: "+productRepository.getTotalProductNumber());
        System.out.println("O produto existe na lista de produtos:"+productList.contains(testProduct));
    }

    @Test
    @Transactional
    public void createProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product with an existing ID
        product.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .andExpect(jsonPath("$.[*].nameProd").value(hasItem(DEFAULT_NAME_PROD)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].seler").value(hasItem(DEFAULT_SELER)))
            .andExpect(jsonPath("$.[*].descriptionProd").value(hasItem(DEFAULT_DESCRIPTION_PROD)))
            .andExpect(jsonPath("$.[*].quantyInStock").value(hasItem(DEFAULT_QUANTY_IN_STOCK)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
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
            .andExpect(jsonPath("$.nameProd").value(DEFAULT_NAME_PROD))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.seler").value(DEFAULT_SELER))
            .andExpect(jsonPath("$.descriptionProd").value(DEFAULT_DESCRIPTION_PROD))
            .andExpect(jsonPath("$.quantyInStock").value(DEFAULT_QUANTY_IN_STOCK))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
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
            .nameProd(UPDATED_NAME_PROD)
            .price(UPDATED_PRICE)
            .seler(UPDATED_SELER)
            .descriptionProd(UPDATED_DESCRIPTION_PROD)
            .quantyInStock(UPDATED_QUANTY_IN_STOCK)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduct)))
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getNameProd()).isEqualTo(UPDATED_NAME_PROD);
        assertThat(testProduct.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testProduct.getSeler()).isEqualTo(UPDATED_SELER);
        assertThat(testProduct.getDescriptionProd()).isEqualTo(UPDATED_DESCRIPTION_PROD);
        assertThat(testProduct.getQuantyInStock()).isEqualTo(UPDATED_QUANTY_IN_STOCK);
        assertThat(testProduct.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProduct.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Create the Product

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeDelete - 1);
    }
    @Test
    @Transactional
    public void getProductSales() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);
        Prisioner prisioner =PrisionerResourceIT.createEntity(em);
        Purchase purchase = PurchaseResourceIT.createEntity(em);

        purchase.setPrisioner(prisioner);
        prisionerRepository.saveAndFlush(prisioner);

        purchasetRepository.saveAndFlush(purchase);
        PressProduct nome =PressProductResourceIT.createEntity(em);
        nome.setPurchase(purchase);
        nome.setProduct(product);
        pressProductRepository.saveAndFlush(nome);


        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}/sales", product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].purchaseID").value(hasItem(nome.getPurchase().getId().intValue())))
        .andExpect(jsonPath("$.[*].purchaseDate").value(hasItem(nome.getPurchase().getDate().toString())))
            .andExpect(jsonPath("$.[*].prisonerName").value(hasItem(nome.getPurchase().getPrisioner().getName())));
            System.out.println(productService.getPressProductFromProduct(product.getId()));
    }

}
