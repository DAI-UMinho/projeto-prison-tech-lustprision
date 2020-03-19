package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class AdminEmployTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdminEmploy.class);
        AdminEmploy adminEmploy1 = new AdminEmploy();
        adminEmploy1.setId(1L);
        AdminEmploy adminEmploy2 = new AdminEmploy();
        adminEmploy2.setId(adminEmploy1.getId());
        assertThat(adminEmploy1).isEqualTo(adminEmploy2);
        adminEmploy2.setId(2L);
        assertThat(adminEmploy1).isNotEqualTo(adminEmploy2);
        adminEmploy1.setId(null);
        assertThat(adminEmploy1).isNotEqualTo(adminEmploy2);
    }
}
