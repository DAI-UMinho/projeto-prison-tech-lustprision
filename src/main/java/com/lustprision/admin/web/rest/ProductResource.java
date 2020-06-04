package com.lustprision.admin.web.rest;

import com.lustprision.admin.domain.Product;
import com.lustprision.admin.repository.ProductRepository;
import com.lustprision.admin.repository.SellerRepository;
import com.lustprision.admin.service.AuditService;
import com.lustprision.admin.service.ProductService;
import com.lustprision.admin.service.dto.*;
import com.lustprision.admin.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lustprision.admin.domain.Product}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductRepository productRepository;

    private final SellerRepository sellerRepository;

    private final ProductService productService;

    private final AuditService auditService;


    public ProductResource(ProductRepository productRepository,SellerRepository sellerRepository,
                           ProductService productService, AuditService auditService) {
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
        this.productService = productService;
        this.auditService = auditService;
    }

    /**
     * {@code POST  /products} : Create a new product.
     *
     * @param product the product to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new product, or with status {@code 400 (Bad Request)} if the product has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to save Product : {}", product);
        if (product.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        product.setSeller(sellerRepository.getByName(product.getSeller().getName()).get());
        log.debug("REST request to save Product : {}", product.getSeller());
        Product result = productRepository.save(product);
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /products} : Updates an existing product.
     *
     * @param product the product to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated product,
     * or with status {@code 400 (Bad Request)} if the product is not valid,
     * or with status {@code 500 (Internal Server Error)} if the product couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to update Product : {}", product);
        if (product.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        product.setSeller(sellerRepository.getByName(product.getSeller().getName()).get());
        Product result = productRepository.save(product);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, product.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /products} : get all the products.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        log.debug("REST request to get all Products");
        return productRepository.findAll();
    }

    /*@GetMapping("/products/byname")
    public List<Product> getAllProductsByName(@RequestParam(value = "name") String name) {
        log.debug("REST request to get all Products with name : {}", name);
        return productRepository.getAllByNameProdContaining(name);
    }*/

    @GetMapping("/products/byname")
    public ResponseEntity<List<Product>> getAllProductsByName(Pageable pageable, @RequestParam(value = "name") String name,
                                                              @RequestParam(value = "low") Long lower,
                                                              @RequestParam(value = "high") Long higher) {
        log.debug("REST request to get all Products with name : {}", name);
        final Page<Product> page = productRepository.findAllByNameProdContainingAndPriceBetween(name, lower, higher, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/products/bypage")
    public ResponseEntity<List<Product>> getAllProductsPage(Pageable pageable) {
        log.debug("REST request to get all Products by PAGE");
        final Page<Product> page = productRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/products/byrange")
    public ResponseEntity<List<Product>> getAllProductsByPriceRange(Pageable pageable, @RequestParam(value = "low") Long lower,
                                                    @RequestParam(value = "high") Long higher) {
        final Page<Product> page = productRepository.findAllByPriceBetween(lower, higher, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /*@GetMapping("/products/byrange")
    public List<Product> getAllProductsByPriceRange(@RequestParam(value = "low") Long lower,
                                                    @RequestParam(value = "high") Long higher) {
        log.debug("REST request to get all Products with low : {}", lower);
        return productRepository.getAllByPriceBetween(lower, higher);
    }*/

    /**
     * {@code GET  /products/:id} : get the "id" product.
     *
     * @param id the id of the product to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the product, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<Product> product = productRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(product);
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" product.
     *
     * @param id the id of the product to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/products/{id}/sales")
    public List<ProductSaleDTO> getProductSales(@PathVariable Long id) {
        log.debug("REST request to get all Products Sales");
        return productService.getPressProductFromProduct(id);
    }

    @GetMapping("/products/{id}/logs")
    public List<ProductDTO> getProductLog(@PathVariable Long id){
        log.debug("REST request to get all Prisioner work jobs : {}", id);
        return auditService.getProductLogs(id);
    }

    @GetMapping("/products/max-price")
    public Integer getProductLog(@RequestParam (value = "name") String name){
        return productRepository.getProductMaxValueFilter(name);
    }
}
