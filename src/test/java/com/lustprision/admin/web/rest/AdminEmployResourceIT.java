package com.lustprision.admin.web.rest;

import com.lustprision.admin.LustPrisionApp;
import com.lustprision.admin.domain.AdminEmploy;
import com.lustprision.admin.repository.AdminEmployRepository;

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
 * Integration tests for the {@link AdminEmployResource} REST controller.
 */
@SpringBootTest(classes = LustPrisionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AdminEmployResourceIT {

    private static final Integer DEFAULT_ID_ADMIN_EMP = 1;
    private static final Integer UPDATED_ID_ADMIN_EMP = 2;

    private static final String DEFAULT_NAME_ADMIN_EMP = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ADMIN_EMP = "BBBBBBBBBB";

    private static final String DEFAULT_LOGIN_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Integer DEFAULT_PERMISSION_ID_PERMISSION = 1;
    private static final Integer UPDATED_PERMISSION_ID_PERMISSION = 2;

    @Autowired
    private AdminEmployRepository adminEmployRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdminEmployMockMvc;

    private AdminEmploy adminEmploy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdminEmploy createEntity(EntityManager em) {
        AdminEmploy adminEmploy = new AdminEmploy()
            .idAdminEmp(DEFAULT_ID_ADMIN_EMP)
            .nameAdminEmp(DEFAULT_NAME_ADMIN_EMP)
            .loginUserName(DEFAULT_LOGIN_USER_NAME)
            .password(DEFAULT_PASSWORD)
            .permissionIdPermission(DEFAULT_PERMISSION_ID_PERMISSION);
        return adminEmploy;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdminEmploy createUpdatedEntity(EntityManager em) {
        AdminEmploy adminEmploy = new AdminEmploy()
            .idAdminEmp(UPDATED_ID_ADMIN_EMP)
            .nameAdminEmp(UPDATED_NAME_ADMIN_EMP)
            .loginUserName(UPDATED_LOGIN_USER_NAME)
            .password(UPDATED_PASSWORD)
            .permissionIdPermission(UPDATED_PERMISSION_ID_PERMISSION);
        return adminEmploy;
    }

    @BeforeEach
    public void initTest() {
        adminEmploy = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdminEmploy() throws Exception {
        int databaseSizeBeforeCreate = adminEmployRepository.findAll().size();

        // Create the AdminEmploy
        restAdminEmployMockMvc.perform(post("/api/admin-employs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(adminEmploy)))
            .andExpect(status().isCreated());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeCreate + 1);
        AdminEmploy testAdminEmploy = adminEmployList.get(adminEmployList.size() - 1);
        assertThat(testAdminEmploy.getIdAdminEmp()).isEqualTo(DEFAULT_ID_ADMIN_EMP);
        assertThat(testAdminEmploy.getNameAdminEmp()).isEqualTo(DEFAULT_NAME_ADMIN_EMP);
        assertThat(testAdminEmploy.getLoginUserName()).isEqualTo(DEFAULT_LOGIN_USER_NAME);
        assertThat(testAdminEmploy.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testAdminEmploy.getPermissionIdPermission()).isEqualTo(DEFAULT_PERMISSION_ID_PERMISSION);
    }

    @Test
    @Transactional
    public void createAdminEmployWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = adminEmployRepository.findAll().size();

        // Create the AdminEmploy with an existing ID
        adminEmploy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdminEmployMockMvc.perform(post("/api/admin-employs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(adminEmploy)))
            .andExpect(status().isBadRequest());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAdminEmploys() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        // Get all the adminEmployList
        restAdminEmployMockMvc.perform(get("/api/admin-employs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adminEmploy.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAdminEmp").value(hasItem(DEFAULT_ID_ADMIN_EMP)))
            .andExpect(jsonPath("$.[*].nameAdminEmp").value(hasItem(DEFAULT_NAME_ADMIN_EMP)))
            .andExpect(jsonPath("$.[*].loginUserName").value(hasItem(DEFAULT_LOGIN_USER_NAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].permissionIdPermission").value(hasItem(DEFAULT_PERMISSION_ID_PERMISSION)));
    }
    
    @Test
    @Transactional
    public void getAdminEmploy() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        // Get the adminEmploy
        restAdminEmployMockMvc.perform(get("/api/admin-employs/{id}", adminEmploy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(adminEmploy.getId().intValue()))
            .andExpect(jsonPath("$.idAdminEmp").value(DEFAULT_ID_ADMIN_EMP))
            .andExpect(jsonPath("$.nameAdminEmp").value(DEFAULT_NAME_ADMIN_EMP))
            .andExpect(jsonPath("$.loginUserName").value(DEFAULT_LOGIN_USER_NAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.permissionIdPermission").value(DEFAULT_PERMISSION_ID_PERMISSION));
    }

    @Test
    @Transactional
    public void getNonExistingAdminEmploy() throws Exception {
        // Get the adminEmploy
        restAdminEmployMockMvc.perform(get("/api/admin-employs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdminEmploy() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        int databaseSizeBeforeUpdate = adminEmployRepository.findAll().size();

        // Update the adminEmploy
        AdminEmploy updatedAdminEmploy = adminEmployRepository.findById(adminEmploy.getId()).get();
        // Disconnect from session so that the updates on updatedAdminEmploy are not directly saved in db
        em.detach(updatedAdminEmploy);
        updatedAdminEmploy
            .idAdminEmp(UPDATED_ID_ADMIN_EMP)
            .nameAdminEmp(UPDATED_NAME_ADMIN_EMP)
            .loginUserName(UPDATED_LOGIN_USER_NAME)
            .password(UPDATED_PASSWORD)
            .permissionIdPermission(UPDATED_PERMISSION_ID_PERMISSION);

        restAdminEmployMockMvc.perform(put("/api/admin-employs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdminEmploy)))
            .andExpect(status().isOk());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeUpdate);
        AdminEmploy testAdminEmploy = adminEmployList.get(adminEmployList.size() - 1);
        assertThat(testAdminEmploy.getIdAdminEmp()).isEqualTo(UPDATED_ID_ADMIN_EMP);
        assertThat(testAdminEmploy.getNameAdminEmp()).isEqualTo(UPDATED_NAME_ADMIN_EMP);
        assertThat(testAdminEmploy.getLoginUserName()).isEqualTo(UPDATED_LOGIN_USER_NAME);
        assertThat(testAdminEmploy.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testAdminEmploy.getPermissionIdPermission()).isEqualTo(UPDATED_PERMISSION_ID_PERMISSION);
    }

    @Test
    @Transactional
    public void updateNonExistingAdminEmploy() throws Exception {
        int databaseSizeBeforeUpdate = adminEmployRepository.findAll().size();

        // Create the AdminEmploy

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdminEmployMockMvc.perform(put("/api/admin-employs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(adminEmploy)))
            .andExpect(status().isBadRequest());

        // Validate the AdminEmploy in the database
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdminEmploy() throws Exception {
        // Initialize the database
        adminEmployRepository.saveAndFlush(adminEmploy);

        int databaseSizeBeforeDelete = adminEmployRepository.findAll().size();

        // Delete the adminEmploy
        restAdminEmployMockMvc.perform(delete("/api/admin-employs/{id}", adminEmploy.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AdminEmploy> adminEmployList = adminEmployRepository.findAll();
        assertThat(adminEmployList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
