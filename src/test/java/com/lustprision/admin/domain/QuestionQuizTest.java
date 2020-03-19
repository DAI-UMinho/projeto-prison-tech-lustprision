package com.lustprision.admin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lustprision.admin.web.rest.TestUtil;

public class QuestionQuizTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionQuiz.class);
        QuestionQuiz questionQuiz1 = new QuestionQuiz();
        questionQuiz1.setId(1L);
        QuestionQuiz questionQuiz2 = new QuestionQuiz();
        questionQuiz2.setId(questionQuiz1.getId());
        assertThat(questionQuiz1).isEqualTo(questionQuiz2);
        questionQuiz2.setId(2L);
        assertThat(questionQuiz1).isNotEqualTo(questionQuiz2);
        questionQuiz1.setId(null);
        assertThat(questionQuiz1).isNotEqualTo(questionQuiz2);
    }
}
