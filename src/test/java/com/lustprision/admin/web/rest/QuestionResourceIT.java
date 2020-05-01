package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.Question;
import com.lustprision.admin.repository.QuestionRepository;

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
 * Integration tests for the {@link QuestionResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class QuestionResourceIT {

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final Double DEFAULT_VALUE = 1D;
    private static final Double UPDATED_VALUE = 2D;

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    private static final String DEFAULT_WRONG_ANSWER_1 = "AAAAAAAAAA";
    private static final String UPDATED_WRONG_ANSWER_1 = "BBBBBBBBBB";

    private static final String DEFAULT_WRONG_ANSWER_2 = "AAAAAAAAAA";
    private static final String UPDATED_WRONG_ANSWER_2 = "BBBBBBBBBB";

    private static final String DEFAULT_WRONG_ANSWER_3 = "AAAAAAAAAA";
    private static final String UPDATED_WRONG_ANSWER_3 = "BBBBBBBBBB";

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestionMockMvc;

    private Question question;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Question createEntity(EntityManager em) {
        Question question = new Question()
            .question(DEFAULT_QUESTION)
            .value(DEFAULT_VALUE)
            .answer(DEFAULT_ANSWER)
            .wrongAnswer1(DEFAULT_WRONG_ANSWER_1)
            .wrongAnswer2(DEFAULT_WRONG_ANSWER_2)
            .wrongAnswer3(DEFAULT_WRONG_ANSWER_3);
        return question;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Question createUpdatedEntity(EntityManager em) {
        Question question = new Question()
            .question(UPDATED_QUESTION)
            .value(UPDATED_VALUE)
            .answer(UPDATED_ANSWER)
            .wrongAnswer1(UPDATED_WRONG_ANSWER_1)
            .wrongAnswer2(UPDATED_WRONG_ANSWER_2)
            .wrongAnswer3(UPDATED_WRONG_ANSWER_3);
        return question;
    }

    @BeforeEach
    public void initTest() {
        question = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestion() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate + 1);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testQuestion.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testQuestion.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testQuestion.getWrongAnswer1()).isEqualTo(DEFAULT_WRONG_ANSWER_1);
        assertThat(testQuestion.getWrongAnswer2()).isEqualTo(DEFAULT_WRONG_ANSWER_2);
        assertThat(testQuestion.getWrongAnswer3()).isEqualTo(DEFAULT_WRONG_ANSWER_3);
    }

    @Test
    @Transactional
    public void createQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question with an existing ID
        question.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuestions() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId().intValue())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER)))
            .andExpect(jsonPath("$.[*].wrongAnswer1").value(hasItem(DEFAULT_WRONG_ANSWER_1)))
            .andExpect(jsonPath("$.[*].wrongAnswer2").value(hasItem(DEFAULT_WRONG_ANSWER_2)))
            .andExpect(jsonPath("$.[*].wrongAnswer3").value(hasItem(DEFAULT_WRONG_ANSWER_3)));
    }
    
    @Test
    @Transactional
    public void getQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", question.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(question.getId().intValue()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER))
            .andExpect(jsonPath("$.wrongAnswer1").value(DEFAULT_WRONG_ANSWER_1))
            .andExpect(jsonPath("$.wrongAnswer2").value(DEFAULT_WRONG_ANSWER_2))
            .andExpect(jsonPath("$.wrongAnswer3").value(DEFAULT_WRONG_ANSWER_3));
    }

    @Test
    @Transactional
    public void getNonExistingQuestion() throws Exception {
        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Update the question
        Question updatedQuestion = questionRepository.findById(question.getId()).get();
        // Disconnect from session so that the updates on updatedQuestion are not directly saved in db
        em.detach(updatedQuestion);
        updatedQuestion
            .question(UPDATED_QUESTION)
            .value(UPDATED_VALUE)
            .answer(UPDATED_ANSWER)
            .wrongAnswer1(UPDATED_WRONG_ANSWER_1)
            .wrongAnswer2(UPDATED_WRONG_ANSWER_2)
            .wrongAnswer3(UPDATED_WRONG_ANSWER_3);

        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestion)))
            .andExpect(status().isOk());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testQuestion.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testQuestion.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testQuestion.getWrongAnswer1()).isEqualTo(UPDATED_WRONG_ANSWER_1);
        assertThat(testQuestion.getWrongAnswer2()).isEqualTo(UPDATED_WRONG_ANSWER_2);
        assertThat(testQuestion.getWrongAnswer3()).isEqualTo(UPDATED_WRONG_ANSWER_3);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestion() throws Exception {
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Create the Question

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        int databaseSizeBeforeDelete = questionRepository.findAll().size();

        // Delete the question
        restQuestionMockMvc.perform(delete("/api/questions/{id}", question.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
