package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class PrisionerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prisioner.class);
        Prisioner prisioner1 = new Prisioner();
        prisioner1.setId(1L);
        Prisioner prisioner2 = new Prisioner();
        prisioner2.setId(prisioner1.getId());
        assertThat(prisioner1).isEqualTo(prisioner2);
        prisioner2.setId(2L);
        assertThat(prisioner1).isNotEqualTo(prisioner2);
        prisioner1.setId(null);
        assertThat(prisioner1).isNotEqualTo(prisioner2);
    }
}
