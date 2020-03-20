package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.QuestionQuiz;
import com.lustprision.admin.repository.QuestionQuizRepository;
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
 * Integration tests for the {@link QuestionQuizResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class QuestionQuizResourceIT {

    private static final Integer DEFAULT_QUESTION_QUIZ_ID = 1;
    private static final Integer UPDATED_QUESTION_QUIZ_ID = 2;

    @Autowired
    private QuestionQuizRepository questionQuizRepository;

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

    private MockMvc restQuestionQuizMockMvc;

    private QuestionQuiz questionQuiz;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionQuizResource questionQuizResource = new QuestionQuizResource(questionQuizRepository);
        this.restQuestionQuizMockMvc = MockMvcBuilders.standaloneSetup(questionQuizResource)
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
    public static QuestionQuiz createEntity(EntityManager em) {
        QuestionQuiz questionQuiz = new QuestionQuiz()
            .questionQuizId(DEFAULT_QUESTION_QUIZ_ID);
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
            .questionQuizId(UPDATED_QUESTION_QUIZ_ID);
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
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionQuiz)))
            .andExpect(status().isCreated());

        // Validate the QuestionQuiz in the database
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionQuiz testQuestionQuiz = questionQuizList.get(questionQuizList.size() - 1);
        assertThat(testQuestionQuiz.getQuestionQuizId()).isEqualTo(DEFAULT_QUESTION_QUIZ_ID);
    }

    @Test
    @Transactional
    public void createQuestionQuizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionQuizRepository.findAll().size();

        // Create the QuestionQuiz with an existing ID
        questionQuiz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionQuizMockMvc.perform(post("/api/question-quizs")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .andExpect(jsonPath("$.[*].questionQuizId").value(hasItem(DEFAULT_QUESTION_QUIZ_ID)));
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
            .andExpect(jsonPath("$.questionQuizId").value(DEFAULT_QUESTION_QUIZ_ID));
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
            .questionQuizId(UPDATED_QUESTION_QUIZ_ID);

        restQuestionQuizMockMvc.perform(put("/api/question-quizs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestionQuiz)))
            .andExpect(status().isOk());

        // Validate the QuestionQuiz in the database
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeUpdate);
        QuestionQuiz testQuestionQuiz = questionQuizList.get(questionQuizList.size() - 1);
        assertThat(testQuestionQuiz.getQuestionQuizId()).isEqualTo(UPDATED_QUESTION_QUIZ_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestionQuiz() throws Exception {
        int databaseSizeBeforeUpdate = questionQuizRepository.findAll().size();

        // Create the QuestionQuiz

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionQuizMockMvc.perform(put("/api/question-quizs")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuestionQuiz> questionQuizList = questionQuizRepository.findAll();
        assertThat(questionQuizList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
