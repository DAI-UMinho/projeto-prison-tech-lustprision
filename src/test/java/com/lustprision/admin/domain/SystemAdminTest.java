package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class SystemAdminTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SystemAdmin.class);
        SystemAdmin systemAdmin1 = new SystemAdmin();
        systemAdmin1.setId(1L);
        SystemAdmin systemAdmin2 = new SystemAdmin();
        systemAdmin2.setId(systemAdmin1.getId());
        assertThat(systemAdmin1).isEqualTo(systemAdmin2);
        systemAdmin2.setId(2L);
        assertThat(systemAdmin1).isNotEqualTo(systemAdmin2);
        systemAdmin1.setId(null);
        assertThat(systemAdmin1).isNotEqualTo(systemAdmin2);
    }
}
