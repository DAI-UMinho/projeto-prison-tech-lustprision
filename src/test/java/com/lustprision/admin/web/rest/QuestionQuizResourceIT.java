package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.QuestionQuiz;
import com.lustprision.admin.repository.QuestionQuizRepository;

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
 * Integration tests for the {@link QuestionQuizResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class QuestionQuizResourceIT {

    private static final Integer DEFAULT_QUESTION_QUIZ_ID = 1;
    private static final Integer UPDATED_QUESTION_QUIZ_ID = 2;

    private static final Integer DEFAULT_ID_QUIZ = 1;
    private static final Integer UPDATED_ID_QUIZ = 2;

    private static final Integer DEFAULT_ID_QUESTION = 1;
    private static final Integer UPDATED_ID_QUESTION = 2;

    @Autowired
    private QuestionQuizRepository questionQuizRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestionQuizMockMvc;

    private QuestionQuiz questionQuiz;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionQuiz createEntity(EntityManager em) {
        QuestionQuiz questionQuiz = new QuestionQuiz()
            .questionQuizId(DEFAULT_QUESTION_QUIZ_ID)
            .idQuiz(DEFAULT_ID_QUIZ)
            .idQuestion(DEFAULT_ID_QUESTION);
        return questionQuiz;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionQuiz createUpdatedEntity(EntityManager em) {
        QuestionQuiz questionQuiz = new QuestionQuiz()
            .questionQuizId(UPDATED_QUESTION_QUIZ_ID)
            .idQuiz(UPDATED_ID_QUIZ)
            .idQuestion(UPDATED_ID_QUESTION);
        return questionQuiz;
    }

    @BeforeEach
    public void initTest() {
        questionQuiz = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestionQuiz() throws Exception {
        int databaseSizeBeforeCreate = questionQuizRepository.findAll().size();

        // Create the QuestionQuiz
        restQuestionQuizMockMvc.perform(post("/api/question-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionQuiz)))
            .andExpect(status().isCreated());

        // Validate the QuestionQuiz in the database
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionQuiz testQuestionQuiz = questionQuizList.get(questionQuizList.size() - 1);
        assertThat(testQuestionQuiz.getQuestionQuizId()).isEqualTo(DEFAULT_QUESTION_QUIZ_ID);
        assertThat(testQuestionQuiz.getIdQuiz()).isEqualTo(DEFAULT_ID_QUIZ);
        assertThat(testQuestionQuiz.getIdQuestion()).isEqualTo(DEFAULT_ID_QUESTION);
    }

    @Test
    @Transactional
    public void createQuestionQuizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionQuizRepository.findAll().size();

        // Create the QuestionQuiz with an existing ID
        questionQuiz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionQuizMockMvc.perform(post("/api/question-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionQuiz)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionQuiz in the database
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuestionQuizs() throws Exception {
        // Initialize the database
        questionQuizRepository.saveAndFlush(questionQuiz);

        // Get all the questionQuizList
        restQuestionQuizMockMvc.perform(get("/api/question-quizs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionQuiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].questionQuizId").value(hasItem(DEFAULT_QUESTION_QUIZ_ID)))
            .andExpect(jsonPath("$.[*].idQuiz").value(hasItem(DEFAULT_ID_QUIZ)))
            .andExpect(jsonPath("$.[*].idQuestion").value(hasItem(DEFAULT_ID_QUESTION)));
    }
    
    @Test
    @Transactional
    public void getQuestionQuiz() throws Exception {
        // Initialize the database
        questionQuizRepository.saveAndFlush(questionQuiz);

        // Get the questionQuiz
        restQuestionQuizMockMvc.perform(get("/api/question-quizs/{id}", questionQuiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(questionQuiz.getId().intValue()))
            .andExpect(jsonPath("$.questionQuizId").value(DEFAULT_QUESTION_QUIZ_ID))
            .andExpect(jsonPath("$.idQuiz").value(DEFAULT_ID_QUIZ))
            .andExpect(jsonPath("$.idQuestion").value(DEFAULT_ID_QUESTION));
    }

    @Test
    @Transactional
    public void getNonExistingQuestionQuiz() throws Exception {
        // Get the questionQuiz
        restQuestionQuizMockMvc.perform(get("/api/question-quizs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestionQuiz() throws Exception {
        // Initialize the database
        questionQuizRepository.saveAndFlush(questionQuiz);

        int databaseSizeBeforeUpdate = questionQuizRepository.findAll().size();

        // Update the questionQuiz
        QuestionQuiz updatedQuestionQuiz = questionQuizRepository.findById(questionQuiz.getId()).get();
        // Disconnect from session so that the updates on updatedQuestionQuiz are not directly saved in db
        em.detach(updatedQuestionQuiz);
        updatedQuestionQuiz
            .questionQuizId(UPDATED_QUESTION_QUIZ_ID)
            .idQuiz(UPDATED_ID_QUIZ)
            .idQuestion(UPDATED_ID_QUESTION);

        restQuestionQuizMockMvc.perform(put("/api/question-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestionQuiz)))
            .andExpect(status().isOk());

        // Validate the QuestionQuiz in the database
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeUpdate);
        QuestionQuiz testQuestionQuiz = questionQuizList.get(questionQuizList.size() - 1);
        assertThat(testQuestionQuiz.getQuestionQuizId()).isEqualTo(UPDATED_QUESTION_QUIZ_ID);
        assertThat(testQuestionQuiz.getIdQuiz()).isEqualTo(UPDATED_ID_QUIZ);
        assertThat(testQuestionQuiz.getIdQuestion()).isEqualTo(UPDATED_ID_QUESTION);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestionQuiz() throws Exception {
        int databaseSizeBeforeUpdate = questionQuizRepository.findAll().size();

        // Create the QuestionQuiz

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionQuizMockMvc.perform(put("/api/question-quizs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionQuiz)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionQuiz in the database
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestionQuiz() throws Exception {
        // Initialize the database
        questionQuizRepository.saveAndFlush(questionQuiz);

        int databaseSizeBeforeDelete = questionQuizRepository.findAll().size();

        // Delete the questionQuiz
        restQuestionQuizMockMvc.perform(delete("/api/question-quizs/{id}", questionQuiz.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
