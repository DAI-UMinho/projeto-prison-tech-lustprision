package sample.model;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class QuizTest {
    private final ArrayList<Questoes> questoes = new ArrayList();
    private final Quiz quiz = new Quiz(1, 4, questoes);
    @Test
    void getIdQuiz() {
    System.out.println(quiz.getIdQuiz());
    }

    @Test
    void getQtdQuestoes() {
    }

    @Test
    void getQuestoes() {
    }
}
