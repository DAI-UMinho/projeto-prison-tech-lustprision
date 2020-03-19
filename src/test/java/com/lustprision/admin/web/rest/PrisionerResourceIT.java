package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.repository.PrisionerRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PrisionerResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PrisionerResourceIT {

    private static final Integer DEFAULT_ID_PRISIONER = 1;
    private static final Integer UPDATED_ID_PRISIONER = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_BI = 1;
    private static final Integer UPDATED_BI = 2;

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_PRISIONER = 1;
    private static final Integer UPDATED_NUM_PRISIONER = 2;

    private static final Integer DEFAULT_NUM_CELL = 1;
    private static final Integer UPDATED_NUM_CELL = 2;

    private static final LocalDate DEFAULT_DATA_NASCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_NASCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_BALANCE = 1D;
    private static final Double UPDATED_BALANCE = 2D;

    private static final String DEFAULT_LOGIN_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN_USER_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PERMISSINID_PERMISSION = 1;
    private static final Integer UPDATED_PERMISSINID_PERMISSION = 2;

    private static final Integer DEFAULT_WORKING = 1;
    private static final Integer UPDATED_WORKING = 2;

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private PrisionerRepository prisionerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrisionerMockMvc;

    private Prisioner prisioner;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prisioner createEntity(EntityManager em) {
        Prisioner prisioner = new Prisioner()
            .idPrisioner(DEFAULT_ID_PRISIONER)
            .name(DEFAULT_NAME)
            .bi(DEFAULT_BI)
            .image(DEFAULT_IMAGE)
            .numPrisioner(DEFAULT_NUM_PRISIONER)
            .numCell(DEFAULT_NUM_CELL)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO)
            .balance(DEFAULT_BALANCE)
            .loginUserName(DEFAULT_LOGIN_USER_NAME)
            .permissinidPermission(DEFAULT_PERMISSINID_PERMISSION)
            .working(DEFAULT_WORKING)
            .password(DEFAULT_PASSWORD);
        return prisioner;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prisioner createUpdatedEntity(EntityManager em) {
        Prisioner prisioner = new Prisioner()
            .idPrisioner(UPDATED_ID_PRISIONER)
            .name(UPDATED_NAME)
            .bi(UPDATED_BI)
            .image(UPDATED_IMAGE)
            .numPrisioner(UPDATED_NUM_PRISIONER)
            .numCell(UPDATED_NUM_CELL)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .balance(UPDATED_BALANCE)
            .loginUserName(UPDATED_LOGIN_USER_NAME)
            .permissinidPermission(UPDATED_PERMISSINID_PERMISSION)
            .working(UPDATED_WORKING)
            .password(UPDATED_PASSWORD);
        return prisioner;
    }

    @BeforeEach
    public void initTest() {
        prisioner = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrisioner() throws Exception {
        int databaseSizeBeforeCreate = prisionerRepository.findAll().size();

        // Create the Prisioner
        restPrisionerMockMvc.perform(post("/api/prisioners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisioner)))
            .andExpect(status().isCreated());

        // Validate the Prisioner in the database
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeCreate + 1);
        Prisioner testPrisioner = prisionerList.get(prisionerList.size() - 1);
        assertThat(testPrisioner.getIdPrisioner()).isEqualTo(DEFAULT_ID_PRISIONER);
        assertThat(testPrisioner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPrisioner.getBi()).isEqualTo(DEFAULT_BI);
        assertThat(testPrisioner.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPrisioner.getNumPrisioner()).isEqualTo(DEFAULT_NUM_PRISIONER);
        assertThat(testPrisioner.getNumCell()).isEqualTo(DEFAULT_NUM_CELL);
        assertThat(testPrisioner.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
        assertThat(testPrisioner.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testPrisioner.getLoginUserName()).isEqualTo(DEFAULT_LOGIN_USER_NAME);
        assertThat(testPrisioner.getPermissinidPermission()).isEqualTo(DEFAULT_PERMISSINID_PERMISSION);
        assertThat(testPrisioner.getWorking()).isEqualTo(DEFAULT_WORKING);
        assertThat(testPrisioner.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createPrisionerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prisionerRepository.findAll().size();

        // Create the Prisioner with an existing ID
        prisioner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrisionerMockMvc.perform(post("/api/prisioners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisioner)))
            .andExpect(status().isBadRequest());

        // Validate the Prisioner in the database
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrisioners() throws Exception {
        // Initialize the database
        prisionerRepository.saveAndFlush(prisioner);

        // Get all the prisionerList
        restPrisionerMockMvc.perform(get("/api/prisioners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prisioner.getId().intValue())))
            .andExpect(jsonPath("$.[*].idPrisioner").value(hasItem(DEFAULT_ID_PRISIONER)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].bi").value(hasItem(DEFAULT_BI)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].numPrisioner").value(hasItem(DEFAULT_NUM_PRISIONER)))
            .andExpect(jsonPath("$.[*].numCell").value(hasItem(DEFAULT_NUM_CELL)))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].loginUserName").value(hasItem(DEFAULT_LOGIN_USER_NAME)))
            .andExpect(jsonPath("$.[*].permissinidPermission").value(hasItem(DEFAULT_PERMISSINID_PERMISSION)))
            .andExpect(jsonPath("$.[*].working").value(hasItem(DEFAULT_WORKING)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getPrisioner() throws Exception {
        // Initialize the database
        prisionerRepository.saveAndFlush(prisioner);

        // Get the prisioner
        restPrisionerMockMvc.perform(get("/api/prisioners/{id}", prisioner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prisioner.getId().intValue()))
            .andExpect(jsonPath("$.idPrisioner").value(DEFAULT_ID_PRISIONER))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.bi").value(DEFAULT_BI))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.numPrisioner").value(DEFAULT_NUM_PRISIONER))
            .andExpect(jsonPath("$.numCell").value(DEFAULT_NUM_CELL))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.loginUserName").value(DEFAULT_LOGIN_USER_NAME))
            .andExpect(jsonPath("$.permissinidPermission").value(DEFAULT_PERMISSINID_PERMISSION))
            .andExpect(jsonPath("$.working").value(DEFAULT_WORKING))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }

    @Test
    @Transactional
    public void getNonExistingPrisioner() throws Exception {
        // Get the prisioner
        restPrisionerMockMvc.perform(get("/api/prisioners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrisioner() throws Exception {
        // Initialize the database
        prisionerRepository.saveAndFlush(prisioner);

        int databaseSizeBeforeUpdate = prisionerRepository.findAll().size();

        // Update the prisioner
        Prisioner updatedPrisioner = prisionerRepository.findById(prisioner.getId()).get();
        // Disconnect from session so that the updates on updatedPrisioner are not directly saved in db
        em.detach(updatedPrisioner);
        updatedPrisioner
            .idPrisioner(UPDATED_ID_PRISIONER)
            .name(UPDATED_NAME)
            .bi(UPDATED_BI)
            .image(UPDATED_IMAGE)
            .numPrisioner(UPDATED_NUM_PRISIONER)
            .numCell(UPDATED_NUM_CELL)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .balance(UPDATED_BALANCE)
            .loginUserName(UPDATED_LOGIN_USER_NAME)
            .permissinidPermission(UPDATED_PERMISSINID_PERMISSION)
            .working(UPDATED_WORKING)
            .password(UPDATED_PASSWORD);

        restPrisionerMockMvc.perform(put("/api/prisioners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrisioner)))
            .andExpect(status().isOk());

        // Validate the Prisioner in the database
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeUpdate);
        Prisioner testPrisioner = prisionerList.get(prisionerList.size() - 1);
        assertThat(testPrisioner.getIdPrisioner()).isEqualTo(UPDATED_ID_PRISIONER);
        assertThat(testPrisioner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPrisioner.getBi()).isEqualTo(UPDATED_BI);
        assertThat(testPrisioner.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPrisioner.getNumPrisioner()).isEqualTo(UPDATED_NUM_PRISIONER);
        assertThat(testPrisioner.getNumCell()).isEqualTo(UPDATED_NUM_CELL);
        assertThat(testPrisioner.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testPrisioner.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testPrisioner.getLoginUserName()).isEqualTo(UPDATED_LOGIN_USER_NAME);
        assertThat(testPrisioner.getPermissinidPermission()).isEqualTo(UPDATED_PERMISSINID_PERMISSION);
        assertThat(testPrisioner.getWorking()).isEqualTo(UPDATED_WORKING);
        assertThat(testPrisioner.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingPrisioner() throws Exception {
        int databaseSizeBeforeUpdate = prisionerRepository.findAll().size();

        // Create the Prisioner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrisionerMockMvc.perform(put("/api/prisioners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisioner)))
            .andExpect(status().isBadRequest());

        // Validate the Prisioner in the database
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrisioner() throws Exception {
        // Initialize the database
        prisionerRepository.saveAndFlush(prisioner);

        int databaseSizeBeforeDelete = prisionerRepository.findAll().size();

        // Delete the prisioner
        restPrisionerMockMvc.perform(delete("/api/prisioners/{id}", prisioner.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
