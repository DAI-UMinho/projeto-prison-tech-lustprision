package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Purchase;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.PressWorkRepository;
import com.lustprision.admin.repository.PrisionerRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.repository.WorkRepository;
import com.lustprision.admin.service.PrisionerService;
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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link PrisionerResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)
public class PrisionerResourceIT {

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

    private static final Integer DEFAULT_WORKING = 1;
    private static final Integer UPDATED_WORKING = 2;

    private static final byte[] DEFAULT_PROFILE_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROFILE_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PROFILE_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROFILE_IMAGE_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_NFC_CODE = 30;
    private static final Integer UPDATED_NFC_CODE = 29;

    private static final Integer DEFAULT_CODIGO_CARTAO = 4;
    private static final Integer UPDATED_CODIGO_CARTAO = 5;

    @Autowired
    private PrisionerRepository prisionerRepository;
    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    private WorkRepository workRepository;
    @Autowired
    private PressWorkRepository pressworkRepository;
    @Autowired
    private PrisionerService prisionerService;

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

    private MockMvc restPrisionerMockMvc;

    private Prisioner prisioner;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrisionerResource prisionerResource = new PrisionerResource(prisionerRepository, prisionerService);
        this.restPrisionerMockMvc = MockMvcBuilders.standaloneSetup(prisionerResource)
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
    public static Prisioner createEntity(EntityManager em) {
        Prisioner prisioner = new Prisioner()
            .name(DEFAULT_NAME)
            .bi(DEFAULT_BI)
            .numPrisioner(DEFAULT_NUM_PRISIONER)
            .numCell(DEFAULT_NUM_CELL)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO)
            .balance(DEFAULT_BALANCE)
            .working(DEFAULT_WORKING)
            .profileImage(DEFAULT_PROFILE_IMAGE)
            .profileImageContentType(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)
            .nfcCode(DEFAULT_NFC_CODE)
            .codigoCartao(DEFAULT_CODIGO_CARTAO);
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
            .name(UPDATED_NAME)
            .bi(UPDATED_BI)
            .numPrisioner(UPDATED_NUM_PRISIONER)
            .numCell(UPDATED_NUM_CELL)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .balance(UPDATED_BALANCE)
            .working(UPDATED_WORKING)
            .profileImage(UPDATED_PROFILE_IMAGE)
            .profileImageContentType(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);
//            .nfcCode(UPDATED_NFC_CODE)
//            .codigoCartao(UPDATED_CODIGO_CARTAO);
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
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prisioner)))
            .andExpect(status().isCreated());

        // Validate the Prisioner in the database
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeCreate + 1);
        Prisioner testPrisioner = prisionerList.get(prisionerList.size() - 1);
        assertThat(testPrisioner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPrisioner.getBi()).isEqualTo(DEFAULT_BI);
        assertThat(testPrisioner.getNumPrisioner()).isEqualTo(DEFAULT_NUM_PRISIONER);
        assertThat(testPrisioner.getNumCell()).isEqualTo(DEFAULT_NUM_CELL);
        assertThat(testPrisioner.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
        assertThat(testPrisioner.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testPrisioner.getWorking()).isEqualTo(DEFAULT_WORKING);
        assertThat(testPrisioner.getProfileImage()).isEqualTo(DEFAULT_PROFILE_IMAGE);
        assertThat(testPrisioner.getProfileImageContentType()).isEqualTo(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE);
//        assertThat(testPrisioner.getNfcCode()).isEqualTo(DEFAULT_NFC_CODE);
//        assertThat(testPrisioner.getCodigoCartao()).isEqualTo(DEFAULT_CODIGO_CARTAO);
    }

    @Test
    @Transactional
    public void createPrisionerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prisionerRepository.findAll().size();

        // Create the Prisioner with an existing ID
        prisioner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrisionerMockMvc.perform(post("/api/prisioners")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].bi").value(hasItem(DEFAULT_BI)))
            .andExpect(jsonPath("$.[*].numPrisioner").value(hasItem(DEFAULT_NUM_PRISIONER)))
            .andExpect(jsonPath("$.[*].numCell").value(hasItem(DEFAULT_NUM_CELL)))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].working").value(hasItem(DEFAULT_WORKING)))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))))
            .andExpect(jsonPath("$.[*].nfcCode").value(hasItem(DEFAULT_NFC_CODE)))
            .andExpect(jsonPath("$.[*].codigoCartao").value(hasItem(DEFAULT_CODIGO_CARTAO)));
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
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.bi").value(DEFAULT_BI))
            .andExpect(jsonPath("$.numPrisioner").value(DEFAULT_NUM_PRISIONER))
            .andExpect(jsonPath("$.numCell").value(DEFAULT_NUM_CELL))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.working").value(DEFAULT_WORKING))
            .andExpect(jsonPath("$.profileImageContentType").value(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.profileImage").value(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE)))
            .andExpect(jsonPath("$.nfcCode").value(DEFAULT_NFC_CODE))
            .andExpect(jsonPath("$.codigoCartao").value(DEFAULT_CODIGO_CARTAO));
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
            .name(UPDATED_NAME)
            .bi(UPDATED_BI)
            .numPrisioner(UPDATED_NUM_PRISIONER)
            .numCell(UPDATED_NUM_CELL)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .balance(UPDATED_BALANCE)
            .working(UPDATED_WORKING)
            .profileImage(UPDATED_PROFILE_IMAGE)
            .profileImageContentType(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);
//            .nfcCode(UPDATED_NFC_CODE)
//            .codigoCartao(UPDATED_CODIGO_CARTAO);

        restPrisionerMockMvc.perform(put("/api/prisioners")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrisioner)))
            .andExpect(status().isOk());

        // Validate the Prisioner in the database
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeUpdate);
        Prisioner testPrisioner = prisionerList.get(prisionerList.size() - 1);
        assertThat(testPrisioner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPrisioner.getBi()).isEqualTo(UPDATED_BI);
        assertThat(testPrisioner.getNumPrisioner()).isEqualTo(UPDATED_NUM_PRISIONER);
        assertThat(testPrisioner.getNumCell()).isEqualTo(UPDATED_NUM_CELL);
        assertThat(testPrisioner.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testPrisioner.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testPrisioner.getWorking()).isEqualTo(UPDATED_WORKING);
        assertThat(testPrisioner.getProfileImage()).isEqualTo(UPDATED_PROFILE_IMAGE);
        assertThat(testPrisioner.getProfileImageContentType()).isEqualTo(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);
//        assertThat(testPrisioner.getNfcCode()).isEqualTo(UPDATED_NFC_CODE);
//        assertThat(testPrisioner.getCodigoCartao()).isEqualTo(UPDATED_CODIGO_CARTAO);
    }

    @Test
    @Transactional
    public void updateNonExistingPrisioner() throws Exception {
        int databaseSizeBeforeUpdate = prisionerRepository.findAll().size();

        // Create the Prisioner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrisionerMockMvc.perform(put("/api/prisioners")
            .contentType(TestUtil.APPLICATION_JSON)
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
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prisioner> prisionerList = prisionerRepository.findAll();
        assertThat(prisionerList).hasSize(databaseSizeBeforeDelete - 1);
    }
    @Test
    @Transactional
    public void  getPrisionerPurchases() throws Exception {
        // Initialize the database
        prisionerRepository.saveAndFlush(prisioner);
        Purchase Teste =  PurchaseResourceIT.createEntity(em);
        Teste.setPrisioner(prisioner);

        purchaseRepository.saveAndFlush(Teste);
        restPrisionerMockMvc.perform(get("/api/prisioners/{id}/purchases", prisioner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(Teste.getId().intValue())));
    }



    @Test
    @Transactional
    public void  getPrisionerWork() throws Exception {
        // Initialize the database
        prisionerRepository.saveAndFlush(prisioner);
        PressWork nome = PressWorkResourceIT.createEntity(em);
        Work trabalho =  WorkResourceIT.createEntity(em);
        nome.setPrisioner(prisioner);
        nome.setWork(trabalho);
        workRepository.saveAndFlush(trabalho);
        pressworkRepository.saveAndFlush(nome);
        restPrisionerMockMvc.perform(get("/api/prisioners/{id}/work", prisioner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trabalho.getId().intValue())));
        nome.

    }
}

