package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class PrisQuizTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrisQuiz.class);
        PrisQuiz prisQuiz1 = new PrisQuiz();
        prisQuiz1.setId(1L);
        PrisQuiz prisQuiz2 = new PrisQuiz();
        prisQuiz2.setId(prisQuiz1.getId());
        assertThat(prisQuiz1).isEqualTo(prisQuiz2);
        prisQuiz2.setId(2L);
        assertThat(prisQuiz1).isNotEqualTo(prisQuiz2);
        prisQuiz1.setId(null);
        assertThat(prisQuiz1).isNotEqualTo(prisQuiz2);
    }
}
