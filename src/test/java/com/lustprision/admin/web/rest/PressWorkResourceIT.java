package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.repository.PressWorkRepository;

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
 * Integration tests for the {@link PressWorkResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PressWorkResourceIT {

    private static final Integer DEFAULT_PRISIONER_ID = 1;
    private static final Integer UPDATED_PRISIONER_ID = 2;

    private static final Integer DEFAULT_WORK_ID = 1;
    private static final Integer UPDATED_WORK_ID = 2;

    @Autowired
    private PressWorkRepository pressWorkRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPressWorkMockMvc;

    private PressWork pressWork;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PressWork createEntity(EntityManager em) {
        PressWork pressWork = new PressWork()
            .prisionerId(DEFAULT_PRISIONER_ID)
            .workId(DEFAULT_WORK_ID);
        return pressWork;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PressWork createUpdatedEntity(EntityManager em) {
        PressWork pressWork = new PressWork()
            .prisionerId(UPDATED_PRISIONER_ID)
            .workId(UPDATED_WORK_ID);
        return pressWork;
    }

    @BeforeEach
    public void initTest() {
        pressWork = createEntity(em);
    }

    @Test
    @Transactional
    public void createPressWork() throws Exception {
        int databaseSizeBeforeCreate = pressWorkRepository.findAll().size();

        // Create the PressWork
        restPressWorkMockMvc.perform(post("/api/press-works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressWork)))
            .andExpect(status().isCreated());

        // Validate the PressWork in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeCreate + 1);
        PressWork testPressWork = pressWorkList.get(pressWorkList.size() - 1);
        assertThat(testPressWork.getPrisionerId()).isEqualTo(DEFAULT_PRISIONER_ID);
        assertThat(testPressWork.getWorkId()).isEqualTo(DEFAULT_WORK_ID);
    }

    @Test
    @Transactional
    public void createPressWorkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pressWorkRepository.findAll().size();

        // Create the PressWork with an existing ID
        pressWork.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPressWorkMockMvc.perform(post("/api/press-works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressWork)))
            .andExpect(status().isBadRequest());

        // Validate the PressWork in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPressWorks() throws Exception {
        // Initialize the database
        pressWorkRepository.saveAndFlush(pressWork);

        // Get all the pressWorkList
        restPressWorkMockMvc.perform(get("/api/press-works?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pressWork.getId().intValue())))
            .andExpect(jsonPath("$.[*].prisionerId").value(hasItem(DEFAULT_PRISIONER_ID)))
            .andExpect(jsonPath("$.[*].workId").value(hasItem(DEFAULT_WORK_ID)));
    }
    
    @Test
    @Transactional
    public void getPressWork() throws Exception {
        // Initialize the database
        pressWorkRepository.saveAndFlush(pressWork);

        // Get the pressWork
        restPressWorkMockMvc.perform(get("/api/press-works/{id}", pressWork.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pressWork.getId().intValue()))
            .andExpect(jsonPath("$.prisionerId").value(DEFAULT_PRISIONER_ID))
            .andExpect(jsonPath("$.workId").value(DEFAULT_WORK_ID));
    }

    @Test
    @Transactional
    public void getNonExistingPressWork() throws Exception {
        // Get the pressWork
        restPressWorkMockMvc.perform(get("/api/press-works/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePressWork() throws Exception {
        // Initialize the database
        pressWorkRepository.saveAndFlush(pressWork);

        int databaseSizeBeforeUpdate = pressWorkRepository.findAll().size();

        // Update the pressWork
        PressWork updatedPressWork = pressWorkRepository.findById(pressWork.getId()).get();
        // Disconnect from session so that the updates on updatedPressWork are not directly saved in db
        em.detach(updatedPressWork);
        updatedPressWork
            .prisionerId(UPDATED_PRISIONER_ID)
            .workId(UPDATED_WORK_ID);

        restPressWorkMockMvc.perform(put("/api/press-works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPressWork)))
            .andExpect(status().isOk());

        // Validate the PressWork in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeUpdate);
        PressWork testPressWork = pressWorkList.get(pressWorkList.size() - 1);
        assertThat(testPressWork.getPrisionerId()).isEqualTo(UPDATED_PRISIONER_ID);
        assertThat(testPressWork.getWorkId()).isEqualTo(UPDATED_WORK_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingPressWork() throws Exception {
        int databaseSizeBeforeUpdate = pressWorkRepository.findAll().size();

        // Create the PressWork

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPressWorkMockMvc.perform(put("/api/press-works")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressWork)))
            .andExpect(status().isBadRequest());

        // Validate the PressWork in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePressWork() throws Exception {
        // Initialize the database
        pressWorkRepository.saveAndFlush(pressWork);

        int databaseSizeBeforeDelete = pressWorkRepository.findAll().size();

        // Delete the pressWork
        restPressWorkMockMvc.perform(delete("/api/press-works/{id}", pressWork.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
