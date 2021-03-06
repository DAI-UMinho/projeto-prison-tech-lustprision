package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.State;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.StateRepository;
import com.lustprision.admin.repository.WorkRepository;
import com.lustprision.admin.service.AuditService;
import com.lustprision.admin.service.WorkService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.lustprision.admin.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link WorkResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class WorkResourceIT {

    private static final String DEFAULT_NAME_WORK = "Pesca";
    private static final String UPDATED_NAME_WORK = "BBBBBBBBBB";

    private static final Long DEFAULT_PRICE_HOUR = 1L;
    private static final Long UPDATED_PRICE_HOUR = 2L;

    private static final Integer DEFAULT_NUM_REMAINING_ENTRIES = 1;
    private static final Integer UPDATED_NUM_REMAINING_ENTRIES = 2;

    private static final LocalDate DEFAULT_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());


    @Autowired
    private WorkService workService;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private AuditService auditService;

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

    private MockMvc restWorkMockMvc;

    private Work work;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkResource workResource = new WorkResource(workRepository, stateRepository, workService, auditService);
        this.restWorkMockMvc = MockMvcBuilders.standaloneSetup(workResource)
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
    public static Work createEntity(EntityManager em) {
        Work work = new Work()
            .nameWork(DEFAULT_NAME_WORK)
            .priceHour(DEFAULT_PRICE_HOUR)
            .numVacancies(DEFAULT_NUM_REMAINING_ENTRIES)
            .date(DEFAULT_DATE);
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
            .nameWork(UPDATED_NAME_WORK)
            .priceHour(UPDATED_PRICE_HOUR)
            .numVacancies(UPDATED_NUM_REMAINING_ENTRIES)
            .date(UPDATED_DATE);
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
System.out.println(databaseSizeBeforeCreate);
        // Create the Work
        Work work = WorkResourceIT.createEntity(em);

        restWorkMockMvc.perform(post("/api/works")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(work)))
            .andExpect(status().isCreated());

        // Validate the Work in the database
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeCreate + 1);
        Work testWork = workList.get(workList.size() - 1);
        assertThat(testWork.getNameWork()).isEqualTo(DEFAULT_NAME_WORK);
        assertThat(testWork.getTotalCredits()).isEqualTo(DEFAULT_PRICE_HOUR);
        assertThat(testWork.getNumRemainingEntries()).isEqualTo(DEFAULT_NUM_REMAINING_ENTRIES);
        assertThat(testWork.getDate()).isEqualTo(DEFAULT_DATE);
        System.out.println("Número de trabalhos antes do teste: " +databaseSizeBeforeCreate);
        System.out.println("Número de trabalhos criados: " +workList.size());
        System.out.println("Nome do trabalho: " +testWork.getNameWork());
        System.out.println("Salário por hora do trabalho: " +testWork.getTotalCredits());
        System.out.println("Vagas neste trabalho: " +testWork.getNumRemainingEntries());
    }

    @Test
    @Transactional
    public void createWorkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workRepository.findAll().size();

        // Create the Work with an existing ID
        work.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkMockMvc.perform(post("/api/works")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .andExpect(jsonPath("$.[*].nameWork").value(hasItem(DEFAULT_NAME_WORK)))
            //.andExpect(jsonPath("$.[*].priceHour").value(hasItem(DEFAULT_PRICE_HOUR.intValue())))
            //.andExpect(jsonPath("$.[*].numVacancies").value(hasItem(DEFAULT_NUM_VACANCIES)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
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
            .andExpect(jsonPath("$.nameWork").value(DEFAULT_NAME_WORK))
            //.andExpect(jsonPath("$.priceHour").value(DEFAULT_PRICE_HOUR.intValue()))
            .andExpect(jsonPath("$.numRemainingEntries").value(DEFAULT_NUM_REMAINING_ENTRIES))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
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
        State state = StateResourceIT.createPendingState(em);

        // Update the work
        Work updatedWork = workRepository.findById(work.getId()).get();
        // Disconnect from session so that the updates on updatedWork are not directly saved in db
        em.detach(updatedWork);
        updatedWork
            .nameWork(UPDATED_NAME_WORK)
            .priceHour(UPDATED_PRICE_HOUR)
            .numVacancies(UPDATED_NUM_REMAINING_ENTRIES)
            .state(state)
            .date(UPDATED_DATE);

        restWorkMockMvc.perform(put("/api/works")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedWork)))
            .andExpect(status().isOk());

        // Validate the Work in the database
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeUpdate);
        Work testWork = workList.get(workList.size() - 1);
        assertThat(testWork.getNameWork()).isEqualTo(UPDATED_NAME_WORK);
        assertThat(testWork.getTotalCredits()).isEqualTo(UPDATED_PRICE_HOUR);
        assertThat(testWork.getNumRemainingEntries()).isEqualTo(UPDATED_NUM_REMAINING_ENTRIES);
        assertThat(testWork.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingWork() throws Exception {
        int databaseSizeBeforeUpdate = workRepository.findAll().size();

        // Create the Work

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkMockMvc.perform(put("/api/works")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Work> workList = workRepository.findAll();
        assertThat(workList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
