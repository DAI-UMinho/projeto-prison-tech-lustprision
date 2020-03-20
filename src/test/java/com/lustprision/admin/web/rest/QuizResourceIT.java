package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.Quiz;
import com.lustprision.admin.repository.QuizRepository;
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
 * Integration tests for the {@link QuizResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class QuizResourceIT {

    private static final Integer DEFAULT_ID_QUIZ = 1;
    private static final Integer UPDATED_ID_QUIZ = 2;

    private static final Integer DEFAULT_QTY_QUESTION = 1;
    private static final Integer UPDATED_QTY_QUESTION = 2;

    @Autowired
    private QuizRepository quizRepository;

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

    private MockMvc restQuizMockMvc;

    private Quiz quiz;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizResource quizResource = new QuizResource(quizRepository);
        this.restQuizMockMvc = MockMvcBuilders.standaloneSetup(quizResource)
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
    public static Quiz createEntity(EntityManager em) {
        Quiz quiz = new Quiz()
            .idQuiz(DEFAULT_ID_QUIZ)
            .qtyQuestion(DEFAULT_QTY_QUESTION);
        return quiz;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quiz createUpdatedEntity(EntityManager em) {
        Quiz quiz = new Quiz()
            .idQuiz(UPDATED_ID_QUIZ)
            .qtyQuestion(UPDATED_QTY_QUESTION);
        return quiz;
    }

    @BeforeEach
    public void initTest() {
        quiz = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuiz() throws Exception {
        int databaseSizeBeforeCreate = quizRepository.findAll().size();

        // Create the Quiz
        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quiz)))
            .andExpect(status().isCreated());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeCreate + 1);
        Quiz testQuiz = quizList.get(quizList.size() - 1);
        assertThat(testQuiz.getIdQuiz()).isEqualTo(DEFAULT_ID_QUIZ);
        assertThat(testQuiz.getQtyQuestion()).isEqualTo(DEFAULT_QTY_QUESTION);
    }

    @Test
    @Transactional
    public void createQuizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizRepository.findAll().size();

        // Create the Quiz with an existing ID
        quiz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quiz)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuizzes() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        // Get all the quizList
        restQuizMockMvc.perform(get("/api/quizzes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].idQuiz").value(hasItem(DEFAULT_ID_QUIZ)))
            .andExpect(jsonPath("$.[*].qtyQuestion").value(hasItem(DEFAULT_QTY_QUESTION)));
    }
    
    @Test
    @Transactional
    public void getQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        // Get the quiz
        restQuizMockMvc.perform(get("/api/quizzes/{id}", quiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quiz.getId().intValue()))
            .andExpect(jsonPath("$.idQuiz").value(DEFAULT_ID_QUIZ))
            .andExpect(jsonPath("$.qtyQuestion").value(DEFAULT_QTY_QUESTION));
    }

    @Test
    @Transactional
    public void getNonExistingQuiz() throws Exception {
        // Get the quiz
        restQuizMockMvc.perform(get("/api/quizzes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        int databaseSizeBeforeUpdate = quizRepository.findAll().size();

        // Update the quiz
        Quiz updatedQuiz = quizRepository.findById(quiz.getId()).get();
        // Disconnect from session so that the updates on updatedQuiz are not directly saved in db
        em.detach(updatedQuiz);
        updatedQuiz
            .idQuiz(UPDATED_ID_QUIZ)
            .qtyQuestion(UPDATED_QTY_QUESTION);

        restQuizMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuiz)))
            .andExpect(status().isOk());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeUpdate);
        Quiz testQuiz = quizList.get(quizList.size() - 1);
        assertThat(testQuiz.getIdQuiz()).isEqualTo(UPDATED_ID_QUIZ);
        assertThat(testQuiz.getQtyQuestion()).isEqualTo(UPDATED_QTY_QUESTION);
    }

    @Test
    @Transactional
    public void updateNonExistingQuiz() throws Exception {
        int databaseSizeBeforeUpdate = quizRepository.findAll().size();

        // Create the Quiz

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(quiz)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        int databaseSizeBeforeDelete = quizRepository.findAll().size();

        // Delete the quiz
        restQuizMockMvc.perform(delete("/api/quizzes/{id}", quiz.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
