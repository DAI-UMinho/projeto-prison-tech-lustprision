package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.State;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.PressWorkRepository;
import com.lustprision.admin.repository.PrisionerRepository;
import com.lustprision.admin.repository.StateRepository;
import com.lustprision.admin.repository.WorkRepository;
import com.lustprision.admin.service.WorkService;
import com.lustprision.admin.service.dto.WorkDTO;
import com.lustprision.admin.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.lustprision.admin.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PressWorkResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class PressWorkResourceIT {

    private static final LocalDate DEFAULT_WORK_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_WORK_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PressWorkRepository pressWorkRepository;
    @Autowired
    private PrisionerRepository prisionerRepository;
    @Autowired
    private WorkRepository workRepository;
    @Autowired
    private StateRepository stateRepository;
    @Autowired
    private WorkService workService;

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

    private MockMvc restPressWorkMockMvc;

    private PressWork pressWork;
    private Prisioner prisioner;
    private Work work;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PressWorkResource pressWorkResource = new PressWorkResource(pressWorkRepository, stateRepository, workService);
        this.restPressWorkMockMvc = MockMvcBuilders.standaloneSetup(pressWorkResource)
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
    public static PressWork createEntity(EntityManager em) {
        PressWork pressWork = new PressWork()
            .workDate(DEFAULT_WORK_DATE);
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
            .workDate(UPDATED_WORK_DATE);
        return pressWork;
    }

    @BeforeEach
    public void initTest() {
        pressWork = createEntity(em);
    }

    @Test
    @Transactional
    public void cancelWorkPres() throws Exception {
        pressWorkRepository.saveAndFlush(pressWork);
        int databaseSizeBeforeCreate = pressWorkRepository.findAll().size();
        System.out.println(pressWork.getState());

        System.out.println(pressWork.getWork()); //null

        restPressWorkMockMvc.perform(put("/press-works/{id}/cancel", pressWork.getId())
            .accept(TestUtil.APPLICATION_JSON));

        // Validate the Prisioner in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        System.out.println(pressWorkList.get(0).getWork());

        //assertThat(pressWorkList).hasSize(databaseSizeBeforeCreate-1);
    }

    @Test
    @Transactional
    public void  despedir() throws Exception {

        Prisioner nome = PrisionerResourceIT.createEntity(em);
        prisionerRepository.saveAndFlush(nome);

        Work trabalho =  WorkResourceIT.createEntity(em);
        workRepository.saveAndFlush(trabalho);

        State estado = StateResourceIT.createPendingState(em);
        stateRepository.saveAndFlush(estado);

        pressWork.setState(estado);
        pressWork.setWork(trabalho);
        pressWork.setPrisioner(nome);
        System.out.println(pressWork);
//        System.out.println(mState);
        pressWorkRepository.saveAndFlush(pressWork);
        System.out.println(pressWork);
        System.out.println(pressWork.getState());

        restPressWorkMockMvc.perform(put("/api/press-works/{id}/cancel", pressWork.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pressWork.getId().intValue())));
        //System.out.println(prisionerService.getPrisionerWork((long) 1001));

        List<PressWork> pressWorkList = pressWorkRepository.findAll();
    }


    @Test
    @Transactional
    public void createPressWork() throws Exception {
        int databaseSizeBeforeCreate = pressWorkRepository.findAll().size();

        // Create the PressWork
        restPressWorkMockMvc.perform(post("/api/press-works")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pressWork)))
            .andExpect(status().isCreated());

        // Validate the PressWork in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeCreate + 1);
        PressWork testPressWork = pressWorkList.get(pressWorkList.size() - 1);
        assertThat(testPressWork.getWorkDate()).isEqualTo(DEFAULT_WORK_DATE);
    }

    @Test
    @Transactional
    public void createPressWorkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pressWorkRepository.findAll().size();

        // Create the PressWork with an existing ID
        pressWork.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPressWorkMockMvc.perform(post("/api/press-works")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .andExpect(jsonPath("$.[*].workDate").value(hasItem(DEFAULT_WORK_DATE.toString())));
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
            .andExpect(jsonPath("$.workDate").value(DEFAULT_WORK_DATE.toString()));
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
            .workDate(UPDATED_WORK_DATE);

        restPressWorkMockMvc.perform(put("/api/press-works")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPressWork)))
            .andExpect(status().isOk());

        // Validate the PressWork in the database
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeUpdate);
        PressWork testPressWork = pressWorkList.get(pressWorkList.size() - 1);
        assertThat(testPressWork.getWorkDate()).isEqualTo(UPDATED_WORK_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPressWork() throws Exception {
        int databaseSizeBeforeUpdate = pressWorkRepository.findAll().size();

        // Create the PressWork

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPressWorkMockMvc.perform(put("/api/press-works")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PressWork> pressWorkList = pressWorkRepository.findAll();
        assertThat(pressWorkList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
