package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.SystemAdmin;
import com.lustprision.admin.repository.SystemAdminRepository;
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
 * Integration tests for the {@link SystemAdminResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class SystemAdminResourceIT {

    private static final Integer DEFAULT_ID_SYS_ADMIN = 1;
    private static final Integer UPDATED_ID_SYS_ADMIN = 2;

    private static final String DEFAULT_NAME_ADMIN = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ADMIN = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private SystemAdminRepository systemAdminRepository;

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

    private MockMvc restSystemAdminMockMvc;

    private SystemAdmin systemAdmin;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SystemAdminResource systemAdminResource = new SystemAdminResource(systemAdminRepository);
        this.restSystemAdminMockMvc = MockMvcBuilders.standaloneSetup(systemAdminResource)
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
    public static SystemAdmin createEntity(EntityManager em) {
        SystemAdmin systemAdmin = new SystemAdmin()
            .idSysAdmin(DEFAULT_ID_SYS_ADMIN)
            .nameAdmin(DEFAULT_NAME_ADMIN)
            .password(DEFAULT_PASSWORD);
        return systemAdmin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SystemAdmin createUpdatedEntity(EntityManager em) {
        SystemAdmin systemAdmin = new SystemAdmin()
            .idSysAdmin(UPDATED_ID_SYS_ADMIN)
            .nameAdmin(UPDATED_NAME_ADMIN)
            .password(UPDATED_PASSWORD);
        return systemAdmin;
    }

    @BeforeEach
    public void initTest() {
        systemAdmin = createEntity(em);
    }

    @Test
    @Transactional
    public void createSystemAdmin() throws Exception {
        int databaseSizeBeforeCreate = systemAdminRepository.findAll().size();

        // Create the SystemAdmin
        restSystemAdminMockMvc.perform(post("/api/system-admins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(systemAdmin)))
            .andExpect(status().isCreated());

        // Validate the SystemAdmin in the database
        List<SystemAdmin> systemAdminList = systemAdminRepository.findAll();
        assertThat(systemAdminList).hasSize(databaseSizeBeforeCreate + 1);
        SystemAdmin testSystemAdmin = systemAdminList.get(systemAdminList.size() - 1);
        assertThat(testSystemAdmin.getIdSysAdmin()).isEqualTo(DEFAULT_ID_SYS_ADMIN);
        assertThat(testSystemAdmin.getNameAdmin()).isEqualTo(DEFAULT_NAME_ADMIN);
        assertThat(testSystemAdmin.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createSystemAdminWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = systemAdminRepository.findAll().size();

        // Create the SystemAdmin with an existing ID
        systemAdmin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSystemAdminMockMvc.perform(post("/api/system-admins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(systemAdmin)))
            .andExpect(status().isBadRequest());

        // Validate the SystemAdmin in the database
        List<SystemAdmin> systemAdminList = systemAdminRepository.findAll();
        assertThat(systemAdminList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSystemAdmins() throws Exception {
        // Initialize the database
        systemAdminRepository.saveAndFlush(systemAdmin);

        // Get all the systemAdminList
        restSystemAdminMockMvc.perform(get("/api/system-admins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(systemAdmin.getId().intValue())))
            .andExpect(jsonPath("$.[*].idSysAdmin").value(hasItem(DEFAULT_ID_SYS_ADMIN)))
            .andExpect(jsonPath("$.[*].nameAdmin").value(hasItem(DEFAULT_NAME_ADMIN)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getSystemAdmin() throws Exception {
        // Initialize the database
        systemAdminRepository.saveAndFlush(systemAdmin);

        // Get the systemAdmin
        restSystemAdminMockMvc.perform(get("/api/system-admins/{id}", systemAdmin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(systemAdmin.getId().intValue()))
            .andExpect(jsonPath("$.idSysAdmin").value(DEFAULT_ID_SYS_ADMIN))
            .andExpect(jsonPath("$.nameAdmin").value(DEFAULT_NAME_ADMIN))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }

    @Test
    @Transactional
    public void getNonExistingSystemAdmin() throws Exception {
        // Get the systemAdmin
        restSystemAdminMockMvc.perform(get("/api/system-admins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSystemAdmin() throws Exception {
        // Initialize the database
        systemAdminRepository.saveAndFlush(systemAdmin);

        int databaseSizeBeforeUpdate = systemAdminRepository.findAll().size();

        // Update the systemAdmin
        SystemAdmin updatedSystemAdmin = systemAdminRepository.findById(systemAdmin.getId()).get();
        // Disconnect from session so that the updates on updatedSystemAdmin are not directly saved in db
        em.detach(updatedSystemAdmin);
        updatedSystemAdmin
            .idSysAdmin(UPDATED_ID_SYS_ADMIN)
            .nameAdmin(UPDATED_NAME_ADMIN)
            .password(UPDATED_PASSWORD);

        restSystemAdminMockMvc.perform(put("/api/system-admins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSystemAdmin)))
            .andExpect(status().isOk());

        // Validate the SystemAdmin in the database
        List<SystemAdmin> systemAdminList = systemAdminRepository.findAll();
        assertThat(systemAdminList).hasSize(databaseSizeBeforeUpdate);
        SystemAdmin testSystemAdmin = systemAdminList.get(systemAdminList.size() - 1);
        assertThat(testSystemAdmin.getIdSysAdmin()).isEqualTo(UPDATED_ID_SYS_ADMIN);
        assertThat(testSystemAdmin.getNameAdmin()).isEqualTo(UPDATED_NAME_ADMIN);
        assertThat(testSystemAdmin.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingSystemAdmin() throws Exception {
        int databaseSizeBeforeUpdate = systemAdminRepository.findAll().size();

        // Create the SystemAdmin

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSystemAdminMockMvc.perform(put("/api/system-admins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(systemAdmin)))
            .andExpect(status().isBadRequest());

        // Validate the SystemAdmin in the database
        List<SystemAdmin> systemAdminList = systemAdminRepository.findAll();
        assertThat(systemAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSystemAdmin() throws Exception {
        // Initialize the database
        systemAdminRepository.saveAndFlush(systemAdmin);

        int databaseSizeBeforeDelete = systemAdminRepository.findAll().size();

        // Delete the systemAdmin
        restSystemAdminMockMvc.perform(delete("/api/system-admins/{id}", systemAdmin.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SystemAdmin> systemAdminList = systemAdminRepository.findAll();
        assertThat(systemAdminList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
