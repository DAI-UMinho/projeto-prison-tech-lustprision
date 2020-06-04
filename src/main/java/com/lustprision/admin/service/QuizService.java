package com.lustprision.admin.service;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.QuestionQuiz;
import com.lustprision.admin.domain.Quiz;
import com.lustprision.admin.repository.*;
import com.lustprision.admin.service.dto.CompletedQuizDTO;
import com.lustprision.admin.service.dto.PressProductDTO;
import com.lustprision.admin.service.dto.PressProductExtendedDTO;
import com.lustprision.admin.service.dto.QuestionResultDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuizService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final PrisQuizRepository prisQuizRepository;

    private final QuizRepository quizRepository;

    private final QuestionQuizRepository questionQuizRepository;

    public QuizService(PrisQuizRepository prisQuizRepository, QuestionQuizRepository questionQuizRepository,
                       QuizRepository quizRepository){
        this.prisQuizRepository = prisQuizRepository;
        this.questionQuizRepository = questionQuizRepository;
        this.quizRepository = quizRepository;
    }

    public List<CompletedQuizDTO> getCompletedQuizzes(){
        List<CompletedQuizDTO> quizList = prisQuizRepository.getAllByApprovalAndCompleted(1, 1).stream()
            .map(CompletedQuizDTO::new)
            .collect(Collectors.toList());

        quizList.forEach(completedQuizDTO -> {
            quizRepository.findById(completedQuizDTO.getQuizID()).ifPresent(quiz -> {
                questionQuizRepository.findAllByQuiz(quiz).forEach(questionQuiz -> {
                    if(questionQuiz.getQuestionAnswer() != null &&
                        questionQuiz.getQuestionAnswer().equals(questionQuiz.getQuestion().getAnswer()))
                    {
                        completedQuizDTO.setCorrectAnswers(completedQuizDTO.getCorrectAnswers() + 1);
                    }
                });
            });
        });
        return quizList;
    }

    public  List<CompletedQuizDTO> getPrisonerCompletedQuizzes(Prisioner prisioner){
        List<CompletedQuizDTO> quizList = prisQuizRepository.getAllByPrisionerAndApprovalAndCompleted(prisioner, 1, 1)
            .stream()
            .map(CompletedQuizDTO::new)
            .collect(Collectors.toList());

        quizList.forEach(completedQuizDTO -> {
            quizRepository.findById(completedQuizDTO.getQuizID()).ifPresent(quiz -> {
                questionQuizRepository.findAllByQuiz(quiz).forEach(questionQuiz -> {
                    if(questionQuiz.getQuestionAnswer() != null &&
                        questionQuiz.getQuestionAnswer().equals(questionQuiz.getQuestion().getAnswer())){
                        completedQuizDTO.setCorrectAnswers(completedQuizDTO.getCorrectAnswers() + 1);
                    }
                });
            });
        });
        return quizList;
    }

    public List<QuestionResultDTO> getQuizResult(Long id){
        List<QuestionResultDTO> results = new ArrayList<>();
        quizRepository.findById(id).ifPresent(quiz ->
            questionQuizRepository.findAllByQuiz(quiz).forEach(questionQuiz -> {
                QuestionResultDTO mResult = new QuestionResultDTO();
                mResult.setQuestion(questionQuiz.getQuestion().getQuestion());
                mResult.setQuestionAnswer(questionQuiz.getQuestion().getAnswer());
                mResult.setUserAnswer(questionQuiz.getQuestionAnswer());

                if (questionQuiz.getQuestionAnswer() != null &&
                    questionQuiz.getQuestionAnswer().equals(questionQuiz.getQuestion().getAnswer()))
                {
                    mResult.setCorrect(true);
                } else {
                    mResult.setCorrect(false);
                }
                results.add(mResult);
            }));
        return results;
    }

    public List<QuestionResultDTO> getQuestionQuizResult(Quiz quiz){
        List<QuestionResultDTO> results = new ArrayList<>();
        questionQuizRepository.findAllByQuiz(quiz).forEach(questionQuiz -> {
            QuestionResultDTO mResult = new QuestionResultDTO();
            mResult.setQuestion(questionQuiz.getQuestion().getQuestion());
            mResult.setQuestionAnswer(questionQuiz.getQuestion().getAnswer());
            mResult.setUserAnswer(questionQuiz.getQuestionAnswer());
            if (questionQuiz.getQuestionAnswer().equals(questionQuiz.getQuestion().getAnswer())) {
                mResult.setCorrect(true);
            } else {
                mResult.setCorrect(false);
            }
            results.add(mResult);
        });
        return results;
    }
}
