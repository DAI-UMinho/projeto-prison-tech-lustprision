package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class PressProductTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PressProduct.class);
        PressProduct pressProduct1 = new PressProduct();
        pressProduct1.setId(1L);
        PressProduct pressProduct2 = new PressProduct();
        pressProduct2.setId(pressProduct1.getId());
        assertThat(pressProduct1).isEqualTo(pressProduct2);
        pressProduct2.setId(2L);
        assertThat(pressProduct1).isNotEqualTo(pressProduct2);
        pressProduct1.setId(null);
        assertThat(pressProduct1).isNotEqualTo(pressProduct2);
    }
}
