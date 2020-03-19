package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.WorkRepository;

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
 * Integration tests for the {@link WorkResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class WorkResourceIT {

    private static final Integer DEFAULT_ID_WORK = 1;
    private static final Integer UPDATED_ID_WORK = 2;

    private static final String DEFAULT_NAME_WORK = "AAAAAAAAAA";
    private static final String UPDATED_NAME_WORK = "BBBBBBBBBB";

    private static final Long DEFAULT_PRICE_HOUR = 1L;
    private static final Long UPDATED_PRICE_HOUR = 2L;

    private static final Integer DEFAULT_NUM_VACANCIES = 1;
    private static final Integer UPDATED_NUM_VACANCIES = 2;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWorkMockMvc;

    private Work work;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Work createEntity(EntityManager em) {
        Work work = new Work()
            .idWork(DEFAULT_ID_WORK)
            .nameWork(DEFAULT_NAME_WORK)
            .priceHour(DEFAULT_PRICE_HOUR)
            .numVacancies(DEFAULT_NUM_VACANCIES);
        return work;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Work createUpdatedEntity(EntityManager em) {
        Work work = new Work()
            .idWork(UPDATED_ID_WORK)
            .nameWork(UPDATED_NAME_WORK)
            .priceHour(UPDATED_PRICE_HOUR)
            .numVacancies(UPDATED_NUM_VACANCIES);
        return work;
    }

    @BeforeEach
    public void initTest() {
        work = createEntity(em);
    }

    @Test
    @Transactional
    public void createWork() throws Exception {
        int databaseSizeBeforeCreate = workRepository.findAll().size();

        // Create the Work
        restWorkMockMvc.perform(post("/api/works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(work)))
            .andExpect(status().isCreated());

        // Validate the Work in the database
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeCreate + 1);
        Work testWork = workList.get(workList.size() - 1);
        assertThat(testWork.getIdWork()).isEqualTo(DEFAULT_ID_WORK);
        assertThat(testWork.getNameWork()).isEqualTo(DEFAULT_NAME_WORK);
        assertThat(testWork.getPriceHour()).isEqualTo(DEFAULT_PRICE_HOUR);
        assertThat(testWork.getNumVacancies()).isEqualTo(DEFAULT_NUM_VACANCIES);
    }

    @Test
    @Transactional
    public void createWorkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workRepository.findAll().size();

        // Create the Work with an existing ID
        work.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkMockMvc.perform(post("/api/works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(work)))
            .andExpect(status().isBadRequest());

        // Validate the Work in the database
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWorks() throws Exception {
        // Initialize the database
        workRepository.saveAndFlush(work);

        // Get all the workList
        restWorkMockMvc.perform(get("/api/works?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(work.getId().intValue())))
            .andExpect(jsonPath("$.[*].idWork").value(hasItem(DEFAULT_ID_WORK)))
            .andExpect(jsonPath("$.[*].nameWork").value(hasItem(DEFAULT_NAME_WORK)))
            .andExpect(jsonPath("$.[*].priceHour").value(hasItem(DEFAULT_PRICE_HOUR.intValue())))
            .andExpect(jsonPath("$.[*].numVacancies").value(hasItem(DEFAULT_NUM_VACANCIES)));
    }
    
    @Test
    @Transactional
    public void getWork() throws Exception {
        // Initialize the database
        workRepository.saveAndFlush(work);

        // Get the work
        restWorkMockMvc.perform(get("/api/works/{id}", work.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(work.getId().intValue()))
            .andExpect(jsonPath("$.idWork").value(DEFAULT_ID_WORK))
            .andExpect(jsonPath("$.nameWork").value(DEFAULT_NAME_WORK))
            .andExpect(jsonPath("$.priceHour").value(DEFAULT_PRICE_HOUR.intValue()))
            .andExpect(jsonPath("$.numVacancies").value(DEFAULT_NUM_VACANCIES));
    }

    @Test
    @Transactional
    public void getNonExistingWork() throws Exception {
        // Get the work
        restWorkMockMvc.perform(get("/api/works/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWork() throws Exception {
        // Initialize the database
        workRepository.saveAndFlush(work);

        int databaseSizeBeforeUpdate = workRepository.findAll().size();

        // Update the work
        Work updatedWork = workRepository.findById(work.getId()).get();
        // Disconnect from session so that the updates on updatedWork are not directly saved in db
        em.detach(updatedWork);
        updatedWork
            .idWork(UPDATED_ID_WORK)
            .nameWork(UPDATED_NAME_WORK)
            .priceHour(UPDATED_PRICE_HOUR)
            .numVacancies(UPDATED_NUM_VACANCIES);

        restWorkMockMvc.perform(put("/api/works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedWork)))
            .andExpect(status().isOk());

        // Validate the Work in the database
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeUpdate);
        Work testWork = workList.get(workList.size() - 1);
        assertThat(testWork.getIdWork()).isEqualTo(UPDATED_ID_WORK);
        assertThat(testWork.getNameWork()).isEqualTo(UPDATED_NAME_WORK);
        assertThat(testWork.getPriceHour()).isEqualTo(UPDATED_PRICE_HOUR);
        assertThat(testWork.getNumVacancies()).isEqualTo(UPDATED_NUM_VACANCIES);
    }

    @Test
    @Transactional
    public void updateNonExistingWork() throws Exception {
        int databaseSizeBeforeUpdate = workRepository.findAll().size();

        // Create the Work

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkMockMvc.perform(put("/api/works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(work)))
            .andExpect(status().isBadRequest());

        // Validate the Work in the database
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWork() throws Exception {
        // Initialize the database
        workRepository.saveAndFlush(work);

        int databaseSizeBeforeDelete = workRepository.findAll().size();

        // Delete the work
        restWorkMockMvc.perform(delete("/api/works/{id}", work.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
