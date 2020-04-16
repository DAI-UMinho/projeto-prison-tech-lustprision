package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.Login;
import com.lustprision.admin.domain.AdminEmploy;
import com.lustprision.admin.repository.LoginRepository;
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
 * Integration tests for the {@link LoginResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class LoginResourceIT {

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private LoginRepository loginRepository;

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

    private MockMvc restLoginMockMvc;

    private Login login;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LoginResource loginResource = new LoginResource(loginRepository);
        this.restLoginMockMvc = MockMvcBuilders.standaloneSetup(loginResource)
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
    public static Login createEntity(EntityManager em) {
        Login login = new Login()
            .userName(DEFAULT_USER_NAME)
            .password(DEFAULT_PASSWORD)
            .type(DEFAULT_TYPE);
        // Add required entity
        AdminEmploy adminEmploy;
        if (TestUtil.findAll(em, AdminEmploy.class).isEmpty()) {
            adminEmploy = AdminEmployResourceIT.createEntity(em);
            em.persist(adminEmploy);
            em.flush();
        } else {
            adminEmploy = TestUtil.findAll(em, AdminEmploy.class).get(0);
        }
        login.setAdminEmploy(adminEmploy);
        return login;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Login createUpdatedEntity(EntityManager em) {
        Login login = new Login()
            .userName(UPDATED_USER_NAME)
            .password(UPDATED_PASSWORD)
            .type(UPDATED_TYPE);
        // Add required entity
        AdminEmploy adminEmploy;
        if (TestUtil.findAll(em, AdminEmploy.class).isEmpty()) {
            adminEmploy = AdminEmployResourceIT.createUpdatedEntity(em);
            em.persist(adminEmploy);
            em.flush();
        } else {
            adminEmploy = TestUtil.findAll(em, AdminEmploy.class).get(0);
        }
        login.setAdminEmploy(adminEmploy);
        return login;
    }

    @BeforeEach
    public void initTest() {
        login = createEntity(em);
    }

    @Test
    @Transactional
    public void createLogin() throws Exception {
        int databaseSizeBeforeCreate = loginRepository.findAll().size();

        // Create the Login
        restLoginMockMvc.perform(post("/api/logins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(login)))
            .andExpect(status().isCreated());

        // Validate the Login in the database
        List<Login> loginList = loginRepository.findAll();
        assertThat(loginList).hasSize(databaseSizeBeforeCreate + 1);
        Login testLogin = loginList.get(loginList.size() - 1);
        assertThat(testLogin.getUserName()).isEqualTo(DEFAULT_USER_NAME);
        assertThat(testLogin.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testLogin.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createLoginWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loginRepository.findAll().size();

        // Create the Login with an existing ID
        login.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoginMockMvc.perform(post("/api/logins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(login)))
            .andExpect(status().isBadRequest());

        // Validate the Login in the database
        List<Login> loginList = loginRepository.findAll();
        assertThat(loginList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLogins() throws Exception {
        // Initialize the database
        loginRepository.saveAndFlush(login);

        // Get all the loginList
        restLoginMockMvc.perform(get("/api/logins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(login.getId().intValue())))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getLogin() throws Exception {
        // Initialize the database
        loginRepository.saveAndFlush(login);

        // Get the login
        restLoginMockMvc.perform(get("/api/logins/{id}", login.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(login.getId().intValue()))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingLogin() throws Exception {
        // Get the login
        restLoginMockMvc.perform(get("/api/logins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLogin() throws Exception {
        // Initialize the database
        loginRepository.saveAndFlush(login);

        int databaseSizeBeforeUpdate = loginRepository.findAll().size();

        // Update the login
        Login updatedLogin = loginRepository.findById(login.getId()).get();
        // Disconnect from session so that the updates on updatedLogin are not directly saved in db
        em.detach(updatedLogin);
        updatedLogin
            .userName(UPDATED_USER_NAME)
            .password(UPDATED_PASSWORD)
            .type(UPDATED_TYPE);

        restLoginMockMvc.perform(put("/api/logins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLogin)))
            .andExpect(status().isOk());

        // Validate the Login in the database
        List<Login> loginList = loginRepository.findAll();
        assertThat(loginList).hasSize(databaseSizeBeforeUpdate);
        Login testLogin = loginList.get(loginList.size() - 1);
        assertThat(testLogin.getUserName()).isEqualTo(UPDATED_USER_NAME);
        assertThat(testLogin.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testLogin.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingLogin() throws Exception {
        int databaseSizeBeforeUpdate = loginRepository.findAll().size();

        // Create the Login

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLoginMockMvc.perform(put("/api/logins")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(login)))
            .andExpect(status().isBadRequest());

        // Validate the Login in the database
        List<Login> loginList = loginRepository.findAll();
        assertThat(loginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLogin() throws Exception {
        // Initialize the database
        loginRepository.saveAndFlush(login);

        int databaseSizeBeforeDelete = loginRepository.findAll().size();

        // Delete the login
        restLoginMockMvc.perform(delete("/api/logins/{id}", login.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Login> loginList = loginRepository.findAll();
        assertThat(loginList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
