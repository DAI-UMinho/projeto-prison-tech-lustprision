package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.AdminEmploy;
import com.lustprision.admin.repository.AdminEmployRepository;
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
 * Integration tests for the {@link AdminEmployResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class AdminEmployResourceIT {

    private static final String DEFAULT_NAME_ADMIN_EMP = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ADMIN_EMP = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private AdminEmployRepository adminEmployRepository;

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

    private MockMvc restAdminEmployMockMvc;

    private AdminEmploy adminEmploy;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdminEmployResource adminEmployResource = new AdminEmployResource(adminEmployRepository);
        this.restAdminEmployMockMvc = MockMvcBuilders.standaloneSetup(adminEmployResource)
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
    public static AdminEmploy createEntity(EntityManager em) {
        AdminEmploy adminEmploy = new AdminEmploy()
            .nameAdminEmp(DEFAULT_NAME_ADMIN_EMP)
            .password(DEFAULT_PASSWORD);
        return adminEmploy;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdminEmploy createUpdatedEntity(EntityManager em) {
        AdminEmploy adminEmploy = new AdminEmploy()
            .nameAdminEmp(UPDATED_NAME_ADMIN_EMP)
            .password(UPDATED_PASSWORD);
        return adminEmploy;
    }

    @BeforeEach
    public void initTest() {
        adminEmploy = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdminEmploy() throws Exception {
        int databaseSizeBeforeCreate = adminEmployRepository.findAll().size();

        // Create the AdminEmploy
        restAdminEmployMockMvc.perform(post("/api/admin-employs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(adminEmploy)))
            .andExpect(status().isCreated());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeCreate + 1);
        AdminEmploy testAdminEmploy = adminEmployList.get(adminEmployList.size() - 1);
        assertThat(testAdminEmploy.getNameAdminEmp()).isEqualTo(DEFAULT_NAME_ADMIN_EMP);
        assertThat(testAdminEmploy.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createAdminEmployWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = adminEmployRepository.findAll().size();

        // Create the AdminEmploy with an existing ID
        adminEmploy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdminEmployMockMvc.perform(post("/api/admin-employs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(adminEmploy)))
            .andExpect(status().isBadRequest());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAdminEmploys() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        // Get all the adminEmployList
        restAdminEmployMockMvc.perform(get("/api/admin-employs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adminEmploy.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameAdminEmp").value(hasItem(DEFAULT_NAME_ADMIN_EMP)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getAdminEmploy() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        // Get the adminEmploy
        restAdminEmployMockMvc.perform(get("/api/admin-employs/{id}", adminEmploy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(adminEmploy.getId().intValue()))
            .andExpect(jsonPath("$.nameAdminEmp").value(DEFAULT_NAME_ADMIN_EMP))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }

    @Test
    @Transactional
    public void getNonExistingAdminEmploy() throws Exception {
        // Get the adminEmploy
        restAdminEmployMockMvc.perform(get("/api/admin-employs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdminEmploy() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        int databaseSizeBeforeUpdate = adminEmployRepository.findAll().size();

        // Update the adminEmploy
        AdminEmploy updatedAdminEmploy = adminEmployRepository.findById(adminEmploy.getId()).get();
        // Disconnect from session so that the updates on updatedAdminEmploy are not directly saved in db
        em.detach(updatedAdminEmploy);
        updatedAdminEmploy
            .nameAdminEmp(UPDATED_NAME_ADMIN_EMP)
            .password(UPDATED_PASSWORD);

        restAdminEmployMockMvc.perform(put("/api/admin-employs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdminEmploy)))
            .andExpect(status().isOk());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeUpdate);
        AdminEmploy testAdminEmploy = adminEmployList.get(adminEmployList.size() - 1);
        assertThat(testAdminEmploy.getNameAdminEmp()).isEqualTo(UPDATED_NAME_ADMIN_EMP);
        assertThat(testAdminEmploy.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingAdminEmploy() throws Exception {
        int databaseSizeBeforeUpdate = adminEmployRepository.findAll().size();

        // Create the AdminEmploy

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdminEmployMockMvc.perform(put("/api/admin-employs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(adminEmploy)))
            .andExpect(status().isBadRequest());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdminEmploy() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        int databaseSizeBeforeDelete = adminEmployRepository.findAll().size();

        // Delete the adminEmploy
        restAdminEmployMockMvc.perform(delete("/api/admin-employs/{id}", adminEmploy.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
