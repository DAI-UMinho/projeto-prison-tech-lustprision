package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class PressWorkTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PressWork.class);
        PressWork pressWork1 = new PressWork();
        pressWork1.setId(1L);
        PressWork pressWork2 = new PressWork();
        pressWork2.setId(pressWork1.getId());
        assertThat(pressWork1).isEqualTo(pressWork2);
        pressWork2.setId(2L);
        assertThat(pressWork1).isNotEqualTo(pressWork2);
        pressWork1.setId(null);
        assertThat(pressWork1).isNotEqualTo(pressWork2);
    }
}
