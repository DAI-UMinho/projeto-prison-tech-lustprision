package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PrisQuiz;
import com.lustprision.admin.repository.PrisQuizRepository;

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
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PrisQuizResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PrisQuizResourceIT {

    private static final Instant DEFAULT_QUIZ_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_QUIZ_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_APPROVAL = 1;
    private static final Integer UPDATED_APPROVAL = 0;

    @Autowired
    private PrisQuizRepository prisQuizRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrisQuizMockMvc;

    private PrisQuiz prisQuiz;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrisQuiz createEntity(EntityManager em) {
        PrisQuiz prisQuiz = new PrisQuiz()
            .quizDate(DEFAULT_QUIZ_DATE)
            .approval(DEFAULT_APPROVAL);
        return prisQuiz;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrisQuiz createUpdatedEntity(EntityManager em) {
        PrisQuiz prisQuiz = new PrisQuiz()
            .quizDate(UPDATED_QUIZ_DATE)
            .approval(UPDATED_APPROVAL);
        return prisQuiz;
    }

    @BeforeEach
    public void initTest() {
        prisQuiz = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrisQuiz() throws Exception {
        int databaseSizeBeforeCreate = prisQuizRepository.findAll().size();

        // Create the PrisQuiz
        restPrisQuizMockMvc.perform(post("/api/pris-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisQuiz)))
            .andExpect(status().isCreated());

        // Validate the PrisQuiz in the database
        List<PrisQuiz> prisQuizList = prisQuizRepository.findAll();
        assertThat(prisQuizList).hasSize(databaseSizeBeforeCreate + 1);
        PrisQuiz testPrisQuiz = prisQuizList.get(prisQuizList.size() - 1);
        assertThat(testPrisQuiz.getQuizDate()).isEqualTo(DEFAULT_QUIZ_DATE);
        assertThat(testPrisQuiz.getApproval()).isEqualTo(DEFAULT_APPROVAL);
    }

    @Test
    @Transactional
    public void createPrisQuizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prisQuizRepository.findAll().size();

        // Create the PrisQuiz with an existing ID
        prisQuiz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrisQuizMockMvc.perform(post("/api/pris-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisQuiz)))
            .andExpect(status().isBadRequest());

        // Validate the PrisQuiz in the database
        List<PrisQuiz> prisQuizList = prisQuizRepository.findAll();
        assertThat(prisQuizList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrisQuizs() throws Exception {
        // Initialize the database
        prisQuizRepository.saveAndFlush(prisQuiz);

        // Get all the prisQuizList
        restPrisQuizMockMvc.perform(get("/api/pris-quizs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prisQuiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].quizDate").value(hasItem(DEFAULT_QUIZ_DATE.toString())))
            .andExpect(jsonPath("$.[*].approval").value(hasItem(DEFAULT_APPROVAL)));
    }

    @Test
    @Transactional
    public void getPrisQuiz() throws Exception {
        // Initialize the database
        prisQuizRepository.saveAndFlush(prisQuiz);

        // Get the prisQuiz
        restPrisQuizMockMvc.perform(get("/api/pris-quizs/{id}", prisQuiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prisQuiz.getId().intValue()))
            .andExpect(jsonPath("$.quizDate").value(DEFAULT_QUIZ_DATE.toString()))
            .andExpect(jsonPath("$.approval").value(DEFAULT_APPROVAL));
    }

    @Test
    @Transactional
    public void getNonExistingPrisQuiz() throws Exception {
        // Get the prisQuiz
        restPrisQuizMockMvc.perform(get("/api/pris-quizs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrisQuiz() throws Exception {
        // Initialize the database
        prisQuizRepository.saveAndFlush(prisQuiz);

        int databaseSizeBeforeUpdate = prisQuizRepository.findAll().size();

        // Update the prisQuiz
        PrisQuiz updatedPrisQuiz = prisQuizRepository.findById(prisQuiz.getId()).get();
        // Disconnect from session so that the updates on updatedPrisQuiz are not directly saved in db
        em.detach(updatedPrisQuiz);
        updatedPrisQuiz
            .quizDate(UPDATED_QUIZ_DATE)
            .approval(UPDATED_APPROVAL);

        restPrisQuizMockMvc.perform(put("/api/pris-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrisQuiz)))
            .andExpect(status().isOk());

        // Validate the PrisQuiz in the database
        List<PrisQuiz> prisQuizList = prisQuizRepository.findAll();
        assertThat(prisQuizList).hasSize(databaseSizeBeforeUpdate);
        PrisQuiz testPrisQuiz = prisQuizList.get(prisQuizList.size() - 1);
        assertThat(testPrisQuiz.getQuizDate()).isEqualTo(UPDATED_QUIZ_DATE);
        assertThat(testPrisQuiz.getApproval()).isEqualTo(UPDATED_APPROVAL);
    }

    @Test
    @Transactional
    public void updateNonExistingPrisQuiz() throws Exception {
        int databaseSizeBeforeUpdate = prisQuizRepository.findAll().size();

        // Create the PrisQuiz

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrisQuizMockMvc.perform(put("/api/pris-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisQuiz)))
            .andExpect(status().isBadRequest());

        // Validate the PrisQuiz in the database
        List<PrisQuiz> prisQuizList = prisQuizRepository.findAll();
        assertThat(prisQuizList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrisQuiz() throws Exception {
        // Initialize the database
        prisQuizRepository.saveAndFlush(prisQuiz);

        int databaseSizeBeforeDelete = prisQuizRepository.findAll().size();

        // Delete the prisQuiz
        restPrisQuizMockMvc.perform(delete("/api/pris-quizs/{id}", prisQuiz.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrisQuiz> prisQuizList = prisQuizRepository.findAll();
        assertThat(prisQuizList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
